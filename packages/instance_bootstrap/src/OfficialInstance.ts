// SPDX-License-Identifier: AGPL-3.0-or-later

import {
	type CanonicalNetworkEndpointRule,
	HTTP_NETWORK_PROTOCOLS,
	normalizeCanonicalNetworkEndpoint,
} from '@fluxer/instance_bootstrap/src/NetworkOrigin';

export const OFFICIAL_INSTANCE_NAME = 'ND Chat';

export const OFFICIAL_INSTANCE_DISPLAY_HOST = 'chat.nexoriadevelopment.com';

export const OFFICIAL_STABLE_MARKETING_ORIGIN = `https://${OFFICIAL_INSTANCE_DISPLAY_HOST}`;

export const OFFICIAL_CLIENT_API_ENDPOINTS = Object.freeze({
	stable: 'https://chat.nexoriadevelopment.com/api',
	canary: 'https://chat.nexoriadevelopment.com/api',
} as const);

export type OfficialReleaseChannel = keyof typeof OFFICIAL_CLIENT_API_ENDPOINTS;

export const OFFICIAL_MARKETING_ORIGINS = Object.freeze({
	stable: OFFICIAL_STABLE_MARKETING_ORIGIN,
	canary: OFFICIAL_STABLE_MARKETING_ORIGIN,
} as const) satisfies Record<OfficialReleaseChannel, string>;

export function officialMarketingOrigin(releaseChannel: string | null | undefined): string {
	return releaseChannel === 'stable' ? OFFICIAL_MARKETING_ORIGINS.stable : OFFICIAL_MARKETING_ORIGINS.canary;
}

const OFFICIAL_MIGRATED_WEB_APP_HOSTS = Object.freeze({
	stable: 'chat.nexoriadevelopment.com',
	canary: 'chat.nexoriadevelopment.com',
} as const) satisfies Record<OfficialReleaseChannel, string>;

const OFFICIAL_CLIENT_API_PATH = '/api';

const OFFICIAL_RELEASE_CHANNELS: ReadonlyArray<OfficialReleaseChannel> = Object.freeze(['stable', 'canary']);

const OFFICIAL_CLIENT_API_HOST_CHANNELS: ReadonlyMap<string, OfficialReleaseChannel> = new Map(
	OFFICIAL_RELEASE_CHANNELS.flatMap(
		(channel): Array<[string, OfficialReleaseChannel]> => [
			[new URL(OFFICIAL_CLIENT_API_ENDPOINTS[channel]).host, channel],
			[OFFICIAL_MIGRATED_WEB_APP_HOSTS[channel], channel],
		],
	),
);

export function officialClientApiEndpointForAlias(apiEndpoint: string): string | null {
	let url: URL;
	try {
		url = new URL(apiEndpoint.trim());
	} catch {
		return null;
	}
	if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
		return null;
	}
	if (url.pathname.replace(/\/+$/u, '') !== OFFICIAL_CLIENT_API_PATH) {
		return null;
	}
	const channel = OFFICIAL_CLIENT_API_HOST_CHANNELS.get(url.host);
	return channel === undefined ? null : OFFICIAL_CLIENT_API_ENDPOINTS[channel];
}

export const OFFICIAL_INSTANCE_HOSTS: ReadonlyArray<string> = Object.freeze([
	OFFICIAL_INSTANCE_DISPLAY_HOST,
	'chat.nexoriadevelopment.com',
	'web.fluxer.app',
	'api.fluxer.app',
	'canary.fluxer.app',
	'web.canary.fluxer.app',
	'api.canary.fluxer.app',
	'fluxer.com',
	'canary.fluxer.com',
]);

const OFFICIAL_HOST_LOOKUP_RULE: CanonicalNetworkEndpointRule = Object.freeze({
	protocols: HTTP_NETWORK_PROTOCOLS,
	allowPath: true,
	allowRelative: false,
});

export function isOfficialInstanceHost(value: string): boolean {
	const endpoint = normalizeCanonicalNetworkEndpoint(value, OFFICIAL_HOST_LOOKUP_RULE);
	if (endpoint == null) {
		return false;
	}
	const authority = endpoint.slice(endpoint.indexOf('//') + 2);
	const pathStart = authority.indexOf('/');
	const host = (pathStart === -1 ? authority : authority.slice(0, pathStart)).toLowerCase();
	return OFFICIAL_INSTANCE_HOSTS.some((officialHost) => officialHost === host);
}
