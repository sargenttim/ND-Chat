// SPDX-License-Identifier: AGPL-3.0-or-later

#![recursion_limit = "256"]

use axum::{
    Json, Router,
    body::{Body, to_bytes},
    http::{HeaderMap, Method, Request, StatusCode, Uri, header},
    response::{IntoResponse, Response},
    routing,
};
use fluxer_admin::{
    build_router,
    config::{AdminConfig, ProxyConfig},
    session,
};
use serde_json::{Value, json};
use std::sync::{Arc, Mutex};
use tokio::net::TcpListener;
use tower::ServiceExt;

const SECRET_KEY: &str = "htmx-acceptance-test-secret";

struct TestApp {
    router: Router,
    session_cookie: String,
}

#[tokio::test]
async fn report_legal_hold_form_places_and_clears_the_hold() {
    let received = Arc::new(Mutex::new(Vec::<Value>::new()));
    let sink = received.clone();
    let api = Router::new()
        .route(
            "/admin/reports/1800000000000000001/legal-hold",
            routing::post(move |Json(body): Json<Value>| {
                let sink = sink.clone();
                async move {
                    sink.lock().unwrap().push(body.clone());
                    if body["legal_hold_reason"] == "rejected" {
                        return (
                            StatusCode::BAD_REQUEST,
                            Json(json!({"code": "INVALID_FORM_BODY", "message": "Invalid"})),
                        )
                            .into_response();
                    }
                    json_response(json!({
                        "report_id": "1800000000000000001",
                        "legal_hold_until": body["legal_hold_until"],
                        "legal_hold_reason": body["legal_hold_reason"]
                    }))
                }
            }),
        )
        .fallback(mock_api);
    let app = setup_with_api(api).await;
    let (headers, page) = get_with_headers(&app, "/reports/1800000000000000001", &[]).await;
    let csrf_token = csrf_cookie(&headers)
        .unwrap_or_else(|| panic!("report page did not set csrf_token cookie\n{page}"));
    assert_form_has_csrf(
        &page,
        "/reports/1800000000000000001/legal-hold",
        &csrf_token,
    );
    let cookie = format!("{}; csrf_token={}", app.session_cookie, csrf_token);
    let post = |body: String| {
        let app = &app;
        let cookie = cookie.clone();
        async move {
            let (status, headers, text) = post_form_with_headers(
                app,
                "/reports/1800000000000000001/legal-hold",
                &[
                    ("HX-Request", "true"),
                    ("HX-Target", "flash-container"),
                    ("Cookie", &cookie),
                ],
                &body,
            )
            .await;
            assert_eq!(status, StatusCode::NO_CONTENT, "{text}");
            headers
                .get("X-Fluxer-Admin-Toast")
                .and_then(|value| value.to_str().ok())
                .unwrap_or_else(|| panic!("missing toast header\n{text}"))
                .to_owned()
        }
    };

    let toast = post(format!(
        "_csrf={csrf_token}&legal_hold_until=2027-01-31&legal_hold_reason=Court+order+42"
    ))
    .await;
    assert!(toast.contains("success"), "{toast}");
    assert!(
        toast.contains("Legal hold placed until Jan 31, 2027, 11:59 PM UTC"),
        "{toast}"
    );
    let toast = post(format!(
        "_csrf={csrf_token}&clear=1&legal_hold_reason=ignored"
    ))
    .await;
    assert!(toast.contains("Legal hold cleared"), "{toast}");
    let toast = post(format!(
        "_csrf={csrf_token}&legal_hold_until=2027-01-31&legal_hold_reason=rejected"
    ))
    .await;
    assert!(toast.contains("error"), "{toast}");
    assert!(toast.contains("The hold must end in the future"), "{toast}");
    assert!(!toast.contains("needs a reason"), "{toast}");
    let toast = post(format!(
        "_csrf={csrf_token}&legal_hold_until=2020-01-01&legal_hold_reason=Past+date"
    ))
    .await;
    assert!(toast.contains("error"), "{toast}");
    assert!(toast.contains("The hold must end in the future"), "{toast}");
    {
        let received = received.lock().unwrap();
        assert_eq!(
            *received,
            vec![
                json!({"legal_hold_until": "2027-01-31T23:59:59.999Z", "legal_hold_reason": "Court order 42"}),
                json!({"legal_hold_until": null, "legal_hold_reason": null}),
                json!({"legal_hold_until": "2027-01-31T23:59:59.999Z", "legal_hold_reason": "rejected"}),
            ]
        );
    }

    let toast = post(format!(
        "_csrf={csrf_token}&legal_hold_until=2027-01-31&legal_hold_reason=+"
    ))
    .await;
    assert!(toast.contains("Give a reason for the hold"), "{toast}");
    let toast = post(format!(
        "_csrf={csrf_token}&legal_hold_until=soon&legal_hold_reason=x"
    ))
    .await;
    assert!(toast.contains("Choose the date the hold ends"), "{toast}");
    assert_eq!(received.lock().unwrap().len(), 3);
}

#[tokio::test]
async fn report_delete_form_confirms_sends_the_reason_and_toasts_a_held_report() {
    let received = Arc::new(Mutex::new(Vec::<Option<String>>::new()));
    let sink = received.clone();
    let api = Router::new()
        .route(
            "/admin/reports/1800000000000000001",
            routing::delete(move |headers: HeaderMap| {
                let sink = sink.clone();
                async move {
                    let reason = headers
                        .get("X-Audit-Log-Reason")
                        .and_then(|value| value.to_str().ok())
                        .map(str::to_owned);
                    sink.lock().unwrap().push(reason.clone());
                    if reason.as_deref() == Some("held") {
                        return (
                            StatusCode::CONFLICT,
                            Json(json!({
                                "code": "REPORT_UNDER_LEGAL_HOLD",
                                "message": "This report is under a legal hold and can't be deleted."
                            })),
                        )
                            .into_response();
                    }
                    StatusCode::NO_CONTENT.into_response()
                }
            })
            .get(|| async { json_response(searched_report()) }),
        )
        .fallback(mock_api);
    let app = setup_with_api(api).await;
    let (headers, page) = get_with_headers(&app, "/reports/1800000000000000001", &[]).await;
    let csrf_token = csrf_cookie(&headers)
        .unwrap_or_else(|| panic!("report page did not set csrf_token cookie\n{page}"));
    assert_form_has_csrf(&page, "/reports/1800000000000000001/delete", &csrf_token);
    let cookie = format!("{}; csrf_token={}", app.session_cookie, csrf_token);
    let post = |body: String| {
        let app = &app;
        let cookie = cookie.clone();
        async move {
            post_form_with_headers(
                app,
                "/reports/1800000000000000001/delete",
                &[
                    ("HX-Request", "true"),
                    ("HX-Target", "flash-container"),
                    ("Cookie", &cookie),
                ],
                &body,
            )
            .await
        }
    };
    let toast = |headers: &HeaderMap| {
        headers
            .get("X-Fluxer-Admin-Toast")
            .and_then(|value| value.to_str().ok())
            .unwrap_or_else(|| panic!("missing toast header {headers:?}"))
            .to_owned()
    };

    let (status, headers, text) = post(format!(
        "_csrf={csrf_token}&audit_log_reason=Erasure+request"
    ))
    .await;
    assert_eq!(status, StatusCode::NO_CONTENT, "{text}");
    let message = toast(&headers);
    assert!(message.contains("error"), "{message}");
    assert!(
        message.contains("Confirm that the report should be deleted"),
        "{message}"
    );
    assert!(headers.get("HX-Redirect").is_none(), "{headers:?}");

    let (status, headers, text) = post(format!(
        "_csrf={csrf_token}&confirm=true&audit_log_reason=Erasure+request"
    ))
    .await;
    assert_eq!(status, StatusCode::NO_CONTENT, "{text}");
    assert_eq!(
        headers.get("HX-Redirect").and_then(|v| v.to_str().ok()),
        Some("/reports"),
        "{headers:?}"
    );
    let message = toast(&headers);
    assert!(message.contains("success"), "{message}");
    assert!(message.contains("Report deleted"), "{message}");
    assert!(
        headers
            .get_all(header::SET_COOKIE)
            .iter()
            .any(|value| value.to_str().is_ok_and(|v| v.starts_with("flash="))),
        "{headers:?}"
    );

    let (status, headers, text) = post(format!(
        "_csrf={csrf_token}&confirm=true&audit_log_reason=held"
    ))
    .await;
    assert_eq!(status, StatusCode::NO_CONTENT, "{text}");
    assert!(headers.get("HX-Redirect").is_none(), "{headers:?}");
    let message = toast(&headers);
    assert!(message.contains("error"), "{message}");
    assert!(
        message.contains("The report is under a legal hold. Clear the hold before deleting it."),
        "{message}"
    );

    let (status, headers, text) = post_form_with_headers(
        &app,
        "/reports/1800000000000000001/delete",
        &[("Cookie", &cookie)],
        &format!("_csrf={csrf_token}&confirm=true&audit_log_reason=+"),
    )
    .await;
    assert!(status.is_redirection(), "{status} {text}");
    assert_eq!(
        headers.get(header::LOCATION).and_then(|v| v.to_str().ok()),
        Some("/reports"),
        "{headers:?}"
    );

    assert_eq!(
        *received.lock().unwrap(),
        vec![
            Some("Erasure request".to_owned()),
            Some("held".to_owned()),
            None
        ]
    );
}

async fn setup_with_api(api: Router) -> TestApp {
    let api_endpoint = spawn_mock_api(api).await;
    let router = build_router(test_config(api_endpoint));
    let session_value = session::create_session("1500000000000000000", "test-token", SECRET_KEY);
    TestApp {
        router,
        session_cookie: format!("{}={session_value}", session::SESSION_COOKIE_NAME),
    }
}

async fn get_with_headers(
    app: &TestApp,
    uri: &str,
    headers: &[(&str, &str)],
) -> (HeaderMap, String) {
    let mut builder = Request::builder()
        .method(Method::GET)
        .uri(uri)
        .header(header::COOKIE, &app.session_cookie);
    for (name, value) in headers {
        builder = builder.header(*name, *value);
    }
    let response = app
        .router
        .clone()
        .oneshot(builder.body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let headers = response.headers().clone();
    let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
    let text = String::from_utf8(body.to_vec()).unwrap();
    assert_eq!(status, StatusCode::OK, "{text}");
    (headers, text)
}

async fn post_form_with_headers(
    app: &TestApp,
    uri: &str,
    headers: &[(&str, &str)],
    body: &str,
) -> (StatusCode, HeaderMap, String) {
    let has_cookie_header = headers
        .iter()
        .any(|(name, _)| name.eq_ignore_ascii_case("cookie"));
    let mut builder = Request::builder()
        .method(Method::POST)
        .uri(uri)
        .header(header::CONTENT_TYPE, "application/x-www-form-urlencoded");
    if !has_cookie_header {
        builder = builder.header(header::COOKIE, &app.session_cookie);
    }
    for (name, value) in headers {
        builder = builder.header(*name, *value);
    }
    let response = app
        .router
        .clone()
        .oneshot(builder.body(Body::from(body.to_owned())).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let headers = response.headers().clone();
    let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
    let text = String::from_utf8(body.to_vec()).unwrap();
    (status, headers, text)
}

fn csrf_cookie(headers: &HeaderMap) -> Option<String> {
    headers
        .get_all(header::SET_COOKIE)
        .iter()
        .filter_map(|value| value.to_str().ok())
        .find_map(|value| {
            let pair = value.split(';').next()?;
            let token = pair
                .strip_prefix("__Host-csrf_token=")
                .or_else(|| pair.strip_prefix("csrf_token="))?;
            (!token.is_empty()).then(|| token.to_owned())
        })
}

fn assert_form_has_csrf(body: &str, action: &str, csrf_token: &str) {
    let marker = format!(r#"action="{action}""#);
    let Some(action_index) = body.find(&marker) else {
        panic!("missing form action {action:?}\n{body}");
    };
    let csrf_marker = format!(r#"name="_csrf" value="{csrf_token}""#);
    let tail = &body[action_index..];
    let form = tail.find("</form>").map(|end| &tail[..end]).unwrap_or(tail);
    assert!(
        form.contains(&csrf_marker),
        "form {action:?} did not include matching CSRF token {csrf_token:?}\n{body}"
    );
}

async fn spawn_mock_api(api: Router) -> String {
    let listener = TcpListener::bind(("127.0.0.1", 0)).await.unwrap();
    let addr = listener.local_addr().unwrap();
    tokio::spawn(async move {
        axum::serve(listener, api).await.unwrap();
    });
    format!("http://{addr}")
}

async fn mock_api(method: Method, uri: Uri) -> Response {
    match (method, uri.path()) {
        (Method::GET, "/admin/users/@me") => json_response(json!({ "user": admin_user() })),
        (Method::GET, "/admin/report-reasons") => json_response(report_reasons()),
        (Method::GET, "/admin/reports/1800000000000000001") => json_response(searched_report()),
        _ => (StatusCode::NOT_FOUND, Json(json!({ "error": "not found" }))).into_response(),
    }
}

fn json_response(value: Value) -> Response {
    Json(value).into_response()
}

fn admin_user() -> Value {
    let mut user = user("1500000000000000000", "AdminUser");
    user["acls"] = json!(["*"]);
    user
}

fn user(id: &str, username: &str) -> Value {
    json!({
        "id": id,
        "username": username,
        "discriminator": 1,
        "avatar": null,
        "banner": null,
        "email": "admin@example.com",
        "email_verified": true,
        "email_bounced": false,
        "global_name": username,
        "bio": null,
        "pronouns": null,
        "accent_color": null,
        "date_of_birth": null,
        "locale": "en-US",
        "acls": [],
        "traits": [],
        "badge_ids": [],
        "flags": "0",
        "premium_flags": 0,
        "bot": false,
        "system": false,
        "premium_type": null,
        "premium_since": null,
        "premium_until": null,
        "premium_grace_ends_at": null,
        "premium_lifetime_sequence": null,
        "has_totp": false,
        "authenticator_types": [],
        "temp_banned_until": null,
        "pending_deletion_at": null,
        "pending_bulk_message_deletion_at": null,
        "deletion_reason_code": null,
        "deletion_public_reason": null,
        "deletion_audit_log_reason": null,
        "deletion_scheduled_by": null,
        "deletion_scheduled_at": null,
        "last_active_at": null,
        "last_active_ip": null,
        "last_active_ip_reverse": null,
        "last_active_location": null
    })
}


fn searched_guild() -> generated_types::GuildAdminResponse {
    serde_json::from_value(json!({
        "id": "1600000000000000001",
        "name": "Searched Guild",
        "icon": null,
        "banner": null,
        "owner_id": "1500000000000000001",
        "owner_username": "SearchedUser",
        "owner_global_name": "SearchedUser",
        "owner_discriminator": "0001",
        "member_count": 12,
        "features": ["COMMUNITY"],
        "nsfw_level": 0,
        "nsfw": false,
        "content_warning_level": 0,
        "content_warning_text": null
    }))
    .expect("guild search fixture must match the generated response contract")
}

fn searched_guild_detail() -> generated_types::LookupGuildResponseGuild {
    serde_json::from_value(json!({
        "id": "1600000000000000001",
        "owner_id": "1500000000000000001",
        "owner_username": "SearchedUser",
        "owner_global_name": "SearchedUser",
        "owner_discriminator": "0001",
        "name": "Searched Guild",
        "vanity_url_code": null,
        "icon": null,
        "banner": null,
        "splash": null,
        "embed_splash": null,
        "features": ["COMMUNITY"],
        "badge_ids": [],
        "verification_level": 1,
        "mfa_level": 0,
        "nsfw_level": 0,
        "nsfw": false,
        "content_warning_level": 0,
        "content_warning_text": null,
        "explicit_content_filter": 0,
        "default_message_notifications": 0,
        "afk_channel_id": null,
        "afk_timeout": 0,
        "system_channel_id": null,
        "system_channel_flags": 0,
        "rules_channel_id": null,
        "disabled_operations": 0,
        "member_count": 12,
        "channels": [],
        "roles": []
    }))
    .expect("guild detail fixture must match the generated response contract")
}

#[test]
fn guild_fixtures_match_generated_response_contracts() {
    let search = searched_guild();
    assert_eq!(search.name, "Searched Guild");
    assert_eq!(*search.member_count, 12);

    let response: LookupGuildResponse =
        serde_json::from_value(json!({"guild": searched_guild_detail()})).unwrap();
    let detail = response.guild.unwrap();
    assert_eq!(detail.name, "Searched Guild");
    assert_eq!(detail.id, "1600000000000000001");
    assert_eq!(detail.member_count, 12);
}

fn audit_log_entry(
    log_id: &str,
    action: &str,
    access: &str,
) -> generated_types::AdminAuditLogResponseSchema {
    serde_json::from_value(json!({
        "log_id": log_id,
        "admin_user_id": "1500000000000000000",
        "admin_user": null,
        "target_type": "user",
        "target_id": "1500000000000000001",
        "target_user": null,
        "target_guild": null,
        "target_channel": null,
        "related_users": {},
        "related_guilds": {},
        "related_channels": {},
        "action": action,
        "access": access,
        "audit_log_reason": null,
        "metadata": {},
        "created_at": "2026-09-16T12:00:00.000Z"
    }))
    .expect("audit log fixture must match the generated response contract")
}

fn searched_application() -> Value {
    json!({
        "id": "1700000000000000001",
        "name": "Mock Application",
        "owner_user_id": "1500000000000000001",
        "owner_username": "SearchedUser",
        "owner_global_name": "SearchedUser",
        "owner_discriminator": "0001",
        "bot_user_id": null,
        "bot_username": null,
        "bot_global_name": null,
        "bot_discriminator": null,
        "bot_is_public": true,
        "bot_require_code_grant": false,
        "oauth2_redirect_uris": [],
        "has_client_secret": false,
        "has_bot_token": false,
        "bot_token_preview": null,
        "bot_token_created_at": null,
        "client_secret_created_at": null,
        "version": 1
    })
}

fn searched_report() -> Value {
    json!({
        "report_id": "1800000000000000001",
        "reporter_id": "1500000000000000000",
        "reporter_tag": "AdminUser#0001",
        "reported_at": "2026-05-26T12:00:00.000Z",
        "status": 0,
        "report_type": 1,
        "category": "other",
        "additional_info": "Mock report details",
        "reported_user_id": "1500000000000000001",
        "reported_user_tag": "SearchedUser#0001"
    })
}

fn report_reasons() -> Value {
    json!({
        "reasons": [
            {
                "key": "csam",
                "label": "Child sexual abuse material",
                "highest_priority": true,
                "legacy_category_message": "child_safety",
                "legacy_category_user": "child_safety",
                "legacy_category_guild": "child_safety"
            },
            {
                "key": "harassment",
                "label": "Harassment or bullying",
                "highest_priority": false,
                "legacy_category_message": "harassment",
                "legacy_category_user": "harassment",
                "legacy_category_guild": "harassment"
            }
        ]
    })
}

fn test_config(api_endpoint: String) -> AdminConfig {
    AdminConfig {
        host: "127.0.0.1".to_owned(),
        port: 0,
        secret_key_base: SECRET_KEY.to_owned(),
        base_path: String::new(),
        api_endpoint,
        media_endpoint: "https://media.example.test".to_owned(),
        static_cdn_endpoint: "https://static.example.test".to_owned(),
        reports_bucket_origin: "https://reports.example.test".to_owned(),
        admin_endpoint: "https://admin.example.test".to_owned(),
        web_app_endpoint: "https://app.example.test".to_owned(),
        oauth_client_id: "admin-client".to_owned(),
        oauth_client_secret: "admin-secret".to_owned(),
        oauth_redirect_uri: "https://admin.example.test/callback".to_owned(),
        build_version: "test".to_owned(),
        self_hosted: false,
        proxy: ProxyConfig {
            trust_client_ip_header: false,
            client_ip_header_name: "x-forwarded-for".to_owned(),
        },
    }
}
