// SPDX-License-Identifier: AGPL-3.0-or-later

use super::file_stream::stream_file;
use axum::{
    extract::Path,
    http::{HeaderMap, HeaderValue, StatusCode, header},
    response::{IntoResponse, Response},
};
use std::path::{Component, Path as FilePath, PathBuf};

const DOWNLOAD_DIRS: &[&str] = &[
    "/srv/app/downloads",
    "./downloads",
    "/downloads",
    "/data/downloads",
];

pub async fn serve_download(
    Path(filename): Path<String>,
    headers: HeaderMap,
) -> Response {
    // Prevent path traversal attacks
    let path_obj = FilePath::new(&filename);
    if path_obj
        .components()
        .any(|c| !matches!(c, Component::Normal(_)))
    {
        return StatusCode::BAD_REQUEST.into_response();
    }

    let mut target_file: Option<PathBuf> = None;
    for dir in DOWNLOAD_DIRS {
        let candidate = PathBuf::from(dir).join(&filename);
        if candidate.is_file() {
            target_file = Some(candidate);
            break;
        }
    }

    let Some(target) = target_file else {
        return (
            StatusCode::NOT_FOUND,
            format!("The requested download '{filename}' is not currently available on the server."),
        )
            .into_response();
    };

    match stream_file(&target, &headers, None).await {
        Ok(mut response) => {
            let disposition = format!("attachment; filename=\"{filename}\"");
            if let Ok(val) = HeaderValue::from_str(&disposition) {
                response.headers_mut().insert(header::CONTENT_DISPOSITION, val);
            }
            if filename.ends_with(".exe") {
                response.headers_mut().insert(
                    header::CONTENT_TYPE,
                    HeaderValue::from_static("application/vnd.microsoft.portable-executable"),
                );
            } else if filename.ends_with(".dmg") {
                response.headers_mut().insert(
                    header::CONTENT_TYPE,
                    HeaderValue::from_static("application/x-apple-diskimage"),
                );
            } else if filename.ends_with(".deb") {
                response.headers_mut().insert(
                    header::CONTENT_TYPE,
                    HeaderValue::from_static("application/vnd.debian.binary-package"),
                );
            } else if filename.ends_with(".AppImage") {
                response.headers_mut().insert(
                    header::CONTENT_TYPE,
                    HeaderValue::from_static("application/x-iso9660-appimage"),
                );
            } else {
                response.headers_mut().insert(
                    header::CONTENT_TYPE,
                    HeaderValue::from_static("application/octet-stream"),
                );
            }
            response
        }
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}
