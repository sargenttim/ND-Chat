// SPDX-License-Identifier: AGPL-3.0-or-later

import fs from 'node:fs';
import path from 'node:path';
import {DESKTOP_APP_LANDING_URL, DESKTOP_APP_URL, STABLE_APP_URL} from '@electron/common/Constants';
import {createChildLogger} from '@electron/common/Logger';
import {isRestorableDesktopRoutePath} from '@fluxer/desktop_ipc/src/LastRouteContract';

const logger = createChildLogger('DesktopLastRoute');
const LAST_ROUTE_FILE_NAME = 'last-route.json';
const LEGACY_SESSION_TOKEN_KEY = 'token';
const LEGACY_SESSION_USER_ID_KEY = 'userId';
const LEGACY_LOCATION_STORE_KEY = 'Location';

export function desktopLastRouteFilePath(userDataPath: string): string {
	return path.join(userDataPath, LAST_ROUTE_FILE_NAME);
}

export function recordDesktopLastRoute(userDataPath: string, routePath: unknown): void {
	if (!isRestorableDesktopRoutePath(routePath)) {
		return;
	}
	try {
		fs.writeFileSync(desktopLastRouteFilePath(userDataPath), JSON.stringify({path: routePath}), 'utf8');
	} catch (error) {
		logger.warn('Failed to persist the last route', error);
	}
}

function legacyLastLocation(rawLocationStore: string | undefined): unknown {
	if (rawLocationStore === undefined) {
		return null;
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(rawLocationStore);
	} catch {
		return null;
	}
	if (parsed == null || typeof parsed !== 'object') {
		return null;
	}
	return (parsed as {lastLocation?: unknown}).lastLocation;
}

export function seedDesktopLastRouteFromLegacyStorage(
	userDataPath: string,
	legacyLocalStorage: Readonly<Record<string, string>>,
): void {
	if (fs.existsSync(desktopLastRouteFilePath(userDataPath))) {
		return;
	}
	if (!legacyLocalStorage[LEGACY_SESSION_TOKEN_KEY] || !legacyLocalStorage[LEGACY_SESSION_USER_ID_KEY]) {
		return;
	}
	recordDesktopLastRoute(userDataPath, legacyLastLocation(legacyLocalStorage[LEGACY_LOCATION_STORE_KEY]));
}

function readStoredRoutePath(userDataPath: string): string | null {
	let raw: string;
	try {
		raw = fs.readFileSync(desktopLastRouteFilePath(userDataPath), 'utf8');
	} catch {
		return null;
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	if (parsed == null || typeof parsed !== 'object') {
		return null;
	}
	const candidate = (parsed as {path?: unknown}).path;
	return isRestorableDesktopRoutePath(candidate) ? candidate : null;
}

export function resolveDesktopLandingUrl(userDataPath: string): string {
	if (
		process.env.FLUXER_DESKTOP_PACKAGE_ORIGIN === 'http://127.0.0.1:9' ||
		process.argv.includes('--use-bundled-renderer')
	) {
		return DESKTOP_APP_LANDING_URL;
	}
	const liveLandingUrl = `${STABLE_APP_URL}/channels/@me`;
	const storedPath = readStoredRoutePath(userDataPath);
	if (storedPath == null) {
		return liveLandingUrl;
	}
	let resolved: URL;
	try {
		resolved = new URL(storedPath.replace(/^\/+/u, ''), `${STABLE_APP_URL}/`);
	} catch {
		return liveLandingUrl;
	}
	if (!resolved.href.startsWith(`${STABLE_APP_URL}/`)) {
		return liveLandingUrl;
	}
	return resolved.href;
}
