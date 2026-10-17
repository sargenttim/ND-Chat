// SPDX-License-Identifier: AGPL-3.0-or-later

use crate::{
    acl, admin_flags,
    api::types::{AdminUser, LimitConfigResponse, ListBadgesResponse, ListUserChangeLogResponse},
    config::AdminConfig,
    templates::components::{
        badge::{BadgeVariant, badge},
        form::{
            FORM_INPUT_CLASS, FORM_LABEL_CLASS, FORM_SELECT_CLASS, checkbox, csrf_input,
            form_actions, submit_button,
        },
        page_container::{card_with_header, detail_row},
    },
    utils::{
        bigint::format_discriminator,
        timestamps::{format_admin_timestamp, snowflake_creation_date},
        user_tag::user_tag,
    },
};
use maud::{Markup, PreEscaped, html};

pub fn overview_tab(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
    change_log: Option<&ListUserChangeLogResponse>,
) -> Markup {
    render_overview_tab(
        config, user, admin_acls, csrf_token, change_log, None, None, false, false,
    )
}

#[allow(clippy::too_many_arguments)]
pub fn overview_tab_with_limit_config(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
    change_log: Option<&ListUserChangeLogResponse>,
    limit_config: Option<&LimitConfigResponse>,
    username_sign_in: bool,
    badges: Option<&ListBadgesResponse>,
) -> Markup {
    render_overview_tab(
        config,
        user,
        admin_acls,
        csrf_token,
        change_log,
        limit_config,
        badges,
        true,
        username_sign_in,
    )
}

#[allow(clippy::too_many_arguments)]
fn render_overview_tab(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
    change_log: Option<&ListUserChangeLogResponse>,
    limit_config: Option<&LimitConfigResponse>,
    badges: Option<&ListBadgesResponse>,
    show_traits: bool,
    username_sign_in: bool,
) -> Markup {
    html! {
        div class="space-y-6" {
            @if let Some(until) = &user.temp_banned_until {
                div class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-900" {
                    "Temporarily banned until " (format_admin_timestamp(until))
                }
            }
            @if user.temp_banned_until.is_none() {
                @if let Some(pending) = &user.pending_deletion_at {
                    div class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900" {
                        div class="font-medium" { "Scheduled for deletion: " (format_admin_timestamp(pending)) }
                        @if let Some(code) = user.deletion_reason_code {
                            div class="mt-1" { "Reason code: " (code) }
                        }
                        @if let Some(reason) = &user.deletion_public_reason {
                            div class="mt-1" { "Public reason: " (reason) }
                        }
                        @if let Some(reason) = &user.deletion_audit_log_reason {
                            div class="mt-1" { "Private reason: " (reason) }
                        }
                        div class="mt-1" {
                            "Scheduled by "
                            @match user.deletion_scheduled_by.as_deref() {
                                Some(id) if id == user.id => { "the user" }
                                Some(id) => {
                                    a href={(config.base_path) "/users/" (id)} class="underline" { (id) }
                                }
                                None => { "an unrecorded source" }
                            }
                            @if let Some(at) = user.deletion_scheduled_at.as_deref() {
                                " on " (format_admin_timestamp(at))
                            }
                        }
                    }
                }
            }
            @if let Some(pending) = &user.pending_bulk_message_deletion_at {
                div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4" {
                    div class="font-medium text-neutral-700 text-sm" {
                        "Bulk message deletion scheduled for " (format_admin_timestamp(pending))
                    }
                    @if acl::has_permission(admin_acls, acl::USER_CANCEL_BULK_MESSAGE_DELETION) {
                        form method="post"
                            action={(config.base_path) "/users/" (user.id) "?action=cancel_bulk_message_deletion&tab=overview"} {
                            (csrf_input(csrf_token))
                            button type="submit"
                                class="mt-3 rounded bg-neutral-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800" {
                                "Cancel Bulk Message Deletion"
                            }
                        }
                    }
                }
            }
            (card_with_header("Account Information", html! {
                dl class="divide-y divide-neutral-100" {
                    (detail_row("User ID", html! {
                        span class="font-mono text-xs" { (user.id) }
                    }))
                    (detail_row("Created", html! {
                        (snowflake_creation_date(&user.id))
                    }))
                    (detail_row("Username", html! {
                        (user_tag(&user.username, &format_discriminator(&user.discriminator), user.bot))
                    }))
                    (detail_row("Display Name", html! {
                        @if let Some(ref name) = user.global_name {
                            (name)
                        } @else {
                            span class="text-neutral-400" { "Not set" }
                        }
                    }))
                    @if acl::has_permission(admin_acls, acl::USER_VIEW_EMAIL) && !username_sign_in {
                        (detail_row("Email", html! {
                            @if let Some(ref email) = user.email {
                                (email)
                                @if user.email_verified { span class="ml-1 text-green-600" { "verified" } }
                                @else { span class="ml-1 text-red-600" { "unverified" } }
                                @if user.email_bounced { span class="ml-1 text-orange-600" { "(bounced)" } }
                            } @else {
                                span class="text-neutral-400" { "Not set" }
                            }
                        }))
                    }
                    @if acl::has_permission(admin_acls, acl::USER_VIEW_DOB) {
                        (detail_row("Date of Birth", html! {
                            (user.date_of_birth.as_deref().unwrap_or("Not set"))
                        }))
                    }
                    (detail_row("Locale", html! {
                        (user.locale.as_deref().unwrap_or("Not set"))
                    }))
                    @if let Some(ref bio) = user.bio {
                        (detail_row("Bio", html! { (bio) }))
                    }
                    @if let Some(ref pronouns) = user.pronouns {
                        (detail_row("Pronouns", html! { (pronouns) }))
                    }
                    @if user.bot {
                        (detail_row("Type", html! { (badge("Bot", BadgeVariant::Info)) }))
                    }
                    @if user.system {
                        (detail_row("Type", html! { (badge("System", BadgeVariant::Warning)) }))
                    }
                    (detail_row("Authenticators", html! {
                        @if user.authenticator_types.is_empty() {
                            span class="text-neutral-400" { "None" }
                        } @else {
                            (user.authenticator_types.iter().map(|t| match t {
                                0 => "TOTP",
                                2 => "WebAuthn",
                                _ => "Unknown",
                            }).collect::<Vec<_>>().join(", "))
                        }
                    }))
                    (detail_row("Premium", html! {
                        @match user.premium_type {
                            Some(1) => {
                                "Subscription"
                                @if let Some(ref value) = user.premium_since {
                                    span class="ml-1 text-neutral-500" { " since " (value) }
                                }
                                @if let Some(ref value) = user.premium_until {
                                    span class="ml-1 text-neutral-500" { " until " (value) }
                                }
                            }
                            Some(2) => {
                                "Lifetime"
                                @if let Some(value) = user.premium_lifetime_sequence {
                                    span class="ml-1 text-neutral-500" { " #" (value) }
                                }
                            }
                            _ => { span class="text-neutral-400" { "None" } }
                        }
                    }))
                    @if let Some(ref value) = user.premium_grace_ends_at {
                        (detail_row("Grace Period Ends", html! { (format_admin_timestamp(value)) }))
                    }
                    (detail_row("Last Active", html! {
                        (user.last_active_at.as_deref().map_or_else(|| "Never".to_string(), format_admin_timestamp))
                    }))
                    @if acl::has_permission(admin_acls, acl::USER_VIEW_IP) {
                        (detail_row("Last IP", html! {
                            @if let Some(ip) = &user.last_active_ip {
                                span class="font-mono text-xs" { (ip) }
                                a href={(config.base_path) "/users?ip=" (urlencoding::encode(ip))}
                                    class="ml-2 text-xs text-blue-600 hover:underline" {
                                    "Find related"
                                }
                                @if let Some(reverse) = &user.last_active_ip_reverse {
                                    span class="ml-2 text-neutral-500" { "(" (reverse) ")" }
                                }
                            } @else {
                                span class="text-neutral-400" { "Not recorded" }
                            }
                        }))
                        (detail_row("Location", html! {
                            (user.last_active_location.as_deref().unwrap_or("Unknown"))
                        }))
                    }
                }
            }))
            (nd_plus_management_card(config, user, admin_acls, csrf_token))
            (flags_card(config, user, admin_acls, csrf_token))
            @if let Some(badges) = badges {
                (badges_card(config, user, badges, admin_acls, csrf_token))
            }
            (acls_card(config, user, admin_acls, csrf_token))
            @if show_traits {
                (traits_card(config, user, admin_acls, csrf_token, limit_config))
            }
            @if acl::has_permission(admin_acls, acl::USER_VIEW_CONTACT_LOG) {
                (card_with_header("Contact Change Log", html! {
                    @if let Some(log) = change_log {
                        @if log.entries.is_empty() {
                            p class="text-sm text-neutral-500" { "No contact changes recorded." }
                        } @else {
                            dl class="divide-y divide-neutral-100" {
                                @for entry in &log.entries {
                                    div class="py-3 text-sm" {
                                        dt class="font-medium text-neutral-900" {
                                            (entry.field)
                                            span class="ml-2 font-normal text-xs text-neutral-500" { (format_admin_timestamp(&entry.event_at)) }
                                        }
                                        dd class="mt-1 font-mono text-xs text-neutral-700" {
                                            (entry.old_value.as_deref().unwrap_or("null"))
                                            " \u{2192} "
                                            (entry.new_value.as_deref().unwrap_or("null"))
                                        }
                                        @if let Some(ref reason) = entry.reason {
                                            dd class="text-xs text-neutral-500" { (reason) }
                                        }
                                    }
                                }
                            }
                        }
                    } @else {
                        p class="text-sm text-red-700" { "Failed to load change log." }
                    }
                }))
            }
        }
    }
}

fn flags_card(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
) -> Markup {
    let can_update_flags = acl::has_permission(admin_acls, acl::USER_UPDATE_FLAGS);
    html! {
        div class="space-y-6" {
            (u64_flag_form(
                config,
                &user.id,
                "User Flags",
                "update_flags",
                "flags[]",
                user.flags,
                admin_flags::USER_FLAGS,
                csrf_token,
                can_update_flags,
                Some(acl::USER_UPDATE_FLAGS),
            ))
            (i32_flag_form(
                config,
                &user.id,
                "Premium Flags",
                "update_premium_flags",
                "flags[]",
                user.premium_flags,
                admin_flags::PREMIUM_FLAGS,
                csrf_token,
                can_update_flags,
                Some(acl::USER_UPDATE_FLAGS),
            ))
        }
    }
}

#[allow(clippy::too_many_arguments)]
fn u64_flag_form(
    config: &AdminConfig,
    user_id: &str,
    title: &str,
    action: &str,
    input_name: &str,
    value: u64,
    flags: &[admin_flags::U64Flag],
    csrf_token: &str,
    can_edit: bool,
    required_acl: Option<&str>,
) -> Markup {
    flag_form_shell(
        config,
        user_id,
        title,
        action,
        value.to_string(),
        csrf_token,
        can_edit,
        required_acl,
        html! {
            @for flag in flags {
                (flag_checkbox(
                    input_name,
                    flag.value.to_string(),
                    flag.name,
                    value & flag.value != 0,
                    can_edit,
                ))
            }
        },
    )
}

#[allow(clippy::too_many_arguments)]
fn i32_flag_form(
    config: &AdminConfig,
    user_id: &str,
    title: &str,
    action: &str,
    input_name: &str,
    value: i32,
    flags: &[admin_flags::I32Flag],
    csrf_token: &str,
    can_edit: bool,
    required_acl: Option<&str>,
) -> Markup {
    flag_form_shell(
        config,
        user_id,
        title,
        action,
        value.to_string(),
        csrf_token,
        can_edit,
        required_acl,
        html! {
            @for flag in flags {
                (flag_checkbox(
                    input_name,
                    flag.value.to_string(),
                    flag.name,
                    value & flag.value != 0,
                    can_edit,
                ))
            }
        },
    )
}

#[allow(clippy::too_many_arguments)]
fn flag_form_shell(
    config: &AdminConfig,
    user_id: &str,
    title: &str,
    action: &str,
    _raw_value: String,
    csrf_token: &str,
    can_edit: bool,
    required_acl: Option<&str>,
    checkboxes: Markup,
) -> Markup {
    card_with_header(
        title,
        html! {
            form method="post" action={(config.base_path) "/users/" (user_id) "?action=" (action) "&tab=overview"} class="space-y-4" {
                (csrf_input(csrf_token))
                div class="grid grid-cols-1 gap-2 sm:grid-cols-2" {
                    (checkboxes)
                }
                @if can_edit {
                    (form_actions(html! {
                        (submit_button("Save"))
                    }))
                } @else {
                    @if let Some(required) = required_acl {
                        p class="text-xs text-neutral-500" {
                            "Read-only \u{2014} " (required) " permission required."
                        }
                    }
                }
            }
        },
    )
}

fn badges_card(
    config: &AdminConfig,
    user: &AdminUser,
    badges: &ListBadgesResponse,
    admin_acls: &[String],
    csrf_token: &str,
) -> Markup {
    let can_edit = acl::has_permission(admin_acls, acl::USER_UPDATE_BADGES);
    let mut user_badges: Vec<_> = badges
        .badges
        .iter()
        .filter(|badge| badge.badge_type == "user")
        .collect();
    user_badges.sort_by_key(|badge| badge.position);
    flag_form_shell(
        config,
        &user.id,
        "Badges",
        "update_badges",
        String::new(),
        csrf_token,
        can_edit,
        Some(acl::USER_UPDATE_BADGES),
        html! {
            @if user_badges.is_empty() {
                p class="text-sm text-neutral-500" { "No user badges defined." }
            }
            @for badge in user_badges {
                (flag_checkbox(
                    "badge_ids[]",
                    badge.id.clone(),
                    &badge.name,
                    user.badge_ids.contains(&badge.id),
                    can_edit,
                ))
            }
        },
    )
}

fn flag_checkbox(
    input_name: &str,
    value: String,
    label: &str,
    checked: bool,
    can_edit: bool,
) -> Markup {
    checkbox(input_name, &value, label, checked, can_edit)
}

fn acls_card(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
) -> Markup {
    let can_edit = acl::has_permission(admin_acls, acl::ACL_SET_USER);
    card_with_header(
        "ACLs",
        html! {
            @if can_edit {
                form method="post" action={(config.base_path) "/users/" (user.id) "?action=update_acls&tab=overview"} {
                    (csrf_input(csrf_token))
                    div class="space-y-4" {
                        div class="grid grid-cols-1 gap-2 sm:grid-cols-2" {
                            @for item in acl::ALL_ACLS {
                                @let checked = user.acls.iter().any(|value| value == item);
                                (flag_checkbox("acls[]", item.to_string(), item, checked, true))
                            }
                        }
                        @for item in &user.acls {
                            @if !acl::ALL_ACLS.iter().any(|known| known == &item.as_str()) {
                                input type="hidden" name="acls[]" value=(item);
                            }
                        }
                        (form_actions(html! {
                            (submit_button("Save ACLs"))
                        }))
                    }
                }
            } @else {
                @if user.acls.is_empty() {
                    p class="text-sm text-neutral-500" { "No ACLs assigned." }
                } @else {
                    div class="flex flex-wrap gap-2" {
                        @for item in &user.acls {
                            (badge(item, BadgeVariant::Default))
                        }
                    }
                }
                p class="mt-4 text-xs text-neutral-500" {
                    "Read-only \u{2014} acl:set:user permission required."
                }
            }
        },
    )
}

fn traits_card(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
    limit_config: Option<&LimitConfigResponse>,
) -> Markup {
    let trait_definitions = parse_trait_definitions(limit_config);
    let custom_traits = custom_traits(user, &trait_definitions);
    let can_edit = acl::has_permission(admin_acls, acl::USER_UPDATE_TRAITS);
    card_with_header(
        "Traits",
        html! {
            div class="space-y-4" {
                @if limit_config.is_some() {
                    @if can_edit {
                        (traits_form(config, user, csrf_token, &trait_definitions, &custom_traits))
                    } @else {
                        (assigned_traits(&user.traits))
                        p class="mt-2 text-xs text-neutral-500" { "Read-only \u{2014} trait update permission required." }
                    }
                } @else {
                    (assigned_traits(&user.traits))
                    p class="text-sm text-red-700" { "Failed to load limit configuration." }
                }
                @if trait_definitions.is_empty() {
                    p class="text-neutral-500 text-xs" {
                        "No trait definitions declared. "
                        a href={(config.base_path) "/instance-config"} class="text-blue-600 underline" {
                            "Open Instance Configuration"
                        }
                    }
                }
            }
        },
    )
}

fn assigned_traits(traits: &[String]) -> Markup {
    html! {
        @if traits.is_empty() {
            p class="text-neutral-500 text-sm" { "No traits assigned." }
        } @else {
            div class="flex flex-wrap gap-2" {
                @for trait_name in traits {
                    (badge(trait_name, BadgeVariant::Default))
                }
            }
        }
    }
}

fn traits_form(
    config: &AdminConfig,
    user: &AdminUser,
    csrf_token: &str,
    trait_definitions: &[&str],
    custom_traits: &[&str],
) -> Markup {
    html! {
        form method="post" action={(config.base_path) "/users/" (user.id) "?action=update_traits&tab=overview"} {
            (csrf_input(csrf_token))
            div class="space-y-4" {
                @if !trait_definitions.is_empty() {
                    div class="grid grid-cols-1 gap-2 sm:grid-cols-2" {
                        @for definition in trait_definitions {
                            (flag_checkbox(
                                "traits[]",
                                definition.to_string(),
                                definition,
                                user.traits.iter().any(|t| t == definition),
                                true,
                            ))
                        }
                    }
                }
                div class="flex flex-col gap-1" {
                    label for="custom-traits" class="text-neutral-500 text-xs" {
                        "Custom traits (comma or newline separated)"
                    }
                    textarea id="custom-traits" name="traits" rows="2"
                        placeholder="beta-tester, experimental"
                        class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" {
                        (custom_traits.join("\n"))
                    }
                    p class="text-neutral-500 text-xs" {
                        "The premium trait follows each member's subscription or gift and cannot be \
                         assigned here."
                    }
                }
                (form_actions(html! {
                    (submit_button("Save Traits"))
                }))
            }
        }
    }
}

const DERIVED_TRAITS: [&str; 1] = ["premium"];

fn parse_trait_definitions(limit_config: Option<&LimitConfigResponse>) -> Vec<&str> {
    limit_config
        .map(|response| {
            response
                .limit_config
                .trait_definitions
                .iter()
                .map(|value| value.trim())
                .filter(|value| !value.is_empty())
                .filter(|value| !DERIVED_TRAITS.contains(value))
                .collect()
        })
        .unwrap_or_default()
}

fn custom_traits<'a>(user: &'a AdminUser, trait_definitions: &[&str]) -> Vec<&'a str> {
    user.traits
        .iter()
        .map(String::as_str)
        .filter(|trait_name| !trait_definitions.contains(trait_name))
        .filter(|trait_name| !DERIVED_TRAITS.contains(trait_name))
        .collect()
}

fn to_datetime_local_value(s: Option<&str>) -> String {
    if let Some(val) = s {
        let trimmed = val.trim();
        if trimmed.len() >= 16 {
            let part = &trimmed[..16];
            return part.replace(' ', "T");
        }
    }
    String::new()
}

fn nd_plus_management_card(
    config: &AdminConfig,
    user: &AdminUser,
    admin_acls: &[String],
    csrf_token: &str,
) -> Markup {
    let can_manage_premium = acl::has_permission(admin_acls, acl::USER_MANAGE_PREMIUM);
    let current_type = user.premium_type.unwrap_or(0);
    let until_val = to_datetime_local_value(user.premium_until.as_deref());
    let since_val = to_datetime_local_value(user.premium_since.as_deref());

    card_with_header(
        "ND+ Subscription Management",
        html! {
            div class="space-y-6" {
                div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4" {
                    div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" {
                        div class="space-y-1" {
                            div class="text-xs font-semibold uppercase tracking-wide text-neutral-500" { "Current Status" }
                            div class="flex items-center gap-2" {
                                @match current_type {
                                    1 => {
                                        span class="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800" {
                                            "ND+ Subscription"
                                        }
                                        @if let Some(ref until) = user.premium_until {
                                            span class="text-xs text-neutral-600" {
                                                "Expires: " (format_admin_timestamp(until))
                                            }
                                        }
                                    }
                                    2 => {
                                        span class="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800" {
                                            "ND+ Lifetime"
                                        }
                                        @if let Some(seq) = user.premium_lifetime_sequence {
                                            span class="text-xs text-neutral-600" {
                                                " #" (seq)
                                            }
                                        }
                                    }
                                    _ => {
                                        span class="inline-flex items-center rounded-md bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700" {
                                            "Free / Inactive"
                                        }
                                    }
                                }
                            }
                        }
                        @if let Some(ref since) = user.premium_since {
                            div class="text-xs text-neutral-500 sm:text-right" {
                                "Subscriber since: " (format_admin_timestamp(since))
                            }
                        }
                    }
                    @if let Some(ref grace) = user.premium_grace_ends_at {
                        div class="mt-2 border-t border-neutral-200 pt-2 text-xs text-amber-700" {
                            "Grace period ends: " (format_admin_timestamp(grace))
                        }
                    }
                }

                @if can_manage_premium {
                    form method="post"
                        action={(config.base_path) "/users/" (user.id) "?action=set_premium&tab=overview"}
                        class="space-y-4" {
                        (csrf_input(csrf_token))

                        div class="grid grid-cols-1 gap-4 sm:grid-cols-2" {
                            div class="space-y-1.5" {
                                label for="premium_type" class=(FORM_LABEL_CLASS) {
                                    "ND+ Tier"
                                }
                                select name="premium_type" id="nd_premium_type" class=(FORM_SELECT_CLASS) {
                                    option value="0" selected[current_type == 0] { "None (Free / Revoked)" }
                                    option value="1" selected[current_type == 1] { "Subscription (Tier 1)" }
                                    option value="2" selected[current_type == 2] { "Lifetime (Tier 2)" }
                                }
                                p class="text-xs text-neutral-500" {
                                    "Setting tier to 'None' will revoke ND+ and remove premium perks."
                                }
                            }

                            div class="space-y-1.5" {
                                label for="premium_until" class=(FORM_LABEL_CLASS) {
                                    "Expiration Date (Subscription)"
                                }
                                input type="datetime-local"
                                    name="premium_until"
                                    id="nd_premium_until"
                                    value=(until_val)
                                    class=(FORM_INPUT_CLASS);
                                div class="flex flex-wrap gap-1.5 pt-1" {
                                    button type="button"
                                        onclick="addDaysToPremiumUntil(30)"
                                        class="rounded bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 transition-colors" {
                                        "+30 Days"
                                    }
                                    button type="button"
                                        onclick="addDaysToPremiumUntil(90)"
                                        class="rounded bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 transition-colors" {
                                        "+90 Days"
                                    }
                                    button type="button"
                                        onclick="addDaysToPremiumUntil(365)"
                                        class="rounded bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 transition-colors" {
                                        "+1 Year"
                                    }
                                    button type="button"
                                        onclick="clearPremiumUntil()"
                                        class="rounded bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-500 transition-colors" {
                                        "Clear"
                                    }
                                }
                            }

                            div class="space-y-1.5" {
                                label for="premium_since" class=(FORM_LABEL_CLASS) {
                                    "Member Since Date"
                                }
                                input type="datetime-local"
                                    name="premium_since"
                                    id="nd_premium_since"
                                    value=(since_val)
                                    class=(FORM_INPUT_CLASS);
                                p class="text-xs text-neutral-500" {
                                    "Leave blank to preserve current or default to now."
                                }
                            }

                            div class="space-y-1.5" {
                                label for="audit_log_reason" class=(FORM_LABEL_CLASS) {
                                    "Audit Log Reason"
                                }
                                input type="text"
                                    name="audit_log_reason"
                                    id="nd_audit_log_reason"
                                    placeholder="e.g. Granted promo / extended by admin"
                                    class=(FORM_INPUT_CLASS);
                                p class="text-xs text-neutral-500" {
                                    "Recorded in admin audit logs for accountability."
                                }
                            }
                        }

                        div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100" {
                            (submit_button("Save ND+ Changes"))

                            @if current_type != 0 {
                                button type="button"
                                    onclick="confirmRevokePremium()"
                                    class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" {
                                    "Revoke ND+"
                                }
                            }
                        }
                    }

                    form id="revoke-premium-form"
                        method="post"
                        action={(config.base_path) "/users/" (user.id) "?action=revoke_premium&tab=overview"}
                        class="hidden" {
                        (csrf_input(csrf_token))
                        input type="hidden" name="audit_log_reason" id="revoke_audit_log_reason" value="";
                    }

                    script {
                        (PreEscaped(r#"
                            function addDaysToPremiumUntil(days) {
                                const input = document.getElementById('nd_premium_until');
                                if (!input) return;
                                let base = input.value ? new Date(input.value) : new Date();
                                if (isNaN(base.getTime()) || base.getTime() < Date.now()) {
                                    base = new Date();
                                }
                                base.setDate(base.getDate() + days);
                                const pad = (n) => String(n).padStart(2, '0');
                                const formatted = `${base.getFullYear()}-${pad(base.getMonth() + 1)}-${pad(base.getDate())}T${pad(base.getHours())}:${pad(base.getMinutes())}`;
                                input.value = formatted;
                                const tierSelect = document.getElementById('nd_premium_type');
                                if (tierSelect && tierSelect.value !== '1') {
                                    tierSelect.value = '1';
                                }
                            }
                            function clearPremiumUntil() {
                                const input = document.getElementById('nd_premium_until');
                                if (input) input.value = '';
                            }
                            function confirmRevokePremium() {
                                if (!confirm('Are you sure you want to revoke ND+ from this user? This will remove all ND+ perks immediately.')) {
                                    return;
                                }
                                const reason = prompt('Optional audit log reason for revoking ND+:', 'Revoked by admin');
                                if (reason === null) return;
                                const reasonInput = document.getElementById('revoke_audit_log_reason');
                                if (reasonInput) reasonInput.value = reason;
                                document.getElementById('revoke-premium-form').submit();
                            }
                        "#))
                    }
                } @else {
                    p class="text-xs text-neutral-500" {
                        "Read-only \u{2014} " (acl::USER_MANAGE_PREMIUM) " permission required to manage ND+ subscriptions."
                    }
                }
            }
        },
    )
}
