// SPDX-License-Identifier: AGPL-3.0-or-later

import {BUILD_CHANNEL, type BuildChannel} from '@electron/common/BuildChannel';

const DESKTOP_APP_NAMES: Record<BuildChannel, string> = {
	stable: 'ND Chat',
	canary: 'ND Chat Canary',
	development: 'ND Chat Development',
};
const DESKTOP_ARTIFACT_PRODUCT_NAMES: Record<BuildChannel, string> = {
	stable: 'ND-Chat',
	canary: 'ND-Chat-Canary',
	development: 'ND-Chat-Development',
};
const MACOS_BUNDLE_IDS: Record<BuildChannel, string> = {
	stable: 'app.ndchat',
	canary: 'app.ndchat.canary',
	development: 'app.ndchat.development',
};
const LINUX_DESKTOP_ENTRY_IDS: Record<BuildChannel, string> = {
	stable: 'app.ndchat.NDChatDesktop',
	canary: 'app.ndchat.NDChatDesktopCanary',
	development: 'app.ndchat.NDChatDesktopDevelopment',
};
const LEGACY_LINUX_DESKTOP_ENTRY_IDS: Record<BuildChannel, string> = {
	stable: 'ndchat',
	canary: 'ndchat-canary',
	development: 'ndchat-development',
};
const LINUX_PORTAL_SESSION_TOKENS: Record<BuildChannel, string> = {
	stable: 'ndchat_global_shortcuts',
	canary: 'ndchat_canary_global_shortcuts',
	development: 'ndchat_development_global_shortcuts',
};
const WINDOWS_VELOPACK_IDS: Record<BuildChannel, string> = {
	stable: 'ndchat_desktop',
	canary: 'ndchat_desktop_canary',
	development: 'ndchat_desktop_development',
};
const WINDOWS_APP_USER_MODEL_IDS: Record<BuildChannel, string> = {
	stable: 'Nexoria.NDChat',
	canary: 'Nexoria.NDChat.Canary',
	development: 'Nexoria.NDChat.Development',
};
const WINDOWS_TOAST_ACTIVATOR_CLSIDS: Record<BuildChannel, string> = {
	stable: '{48EEF21B-F3AE-431E-8CF2-386FFB2143F2}',
	canary: '{9CEDB5C0-3552-43B0-A279-2232E0CDF74C}',
	development: '{B277AB5D-371C-4098-A76D-1DAE00AC0863}',
};

export const DESKTOP_APP_NAME = DESKTOP_APP_NAMES[BUILD_CHANNEL];
export const DESKTOP_ARTIFACT_PRODUCT_NAME = DESKTOP_ARTIFACT_PRODUCT_NAMES[BUILD_CHANNEL];
export const MACOS_BUNDLE_ID = MACOS_BUNDLE_IDS[BUILD_CHANNEL];
export const LINUX_DESKTOP_ENTRY_ID = LINUX_DESKTOP_ENTRY_IDS[BUILD_CHANNEL];
export const LINUX_PORTAL_SESSION_TOKEN = LINUX_PORTAL_SESSION_TOKENS[BUILD_CHANNEL];
export const LEGACY_LINUX_DESKTOP_ENTRY_ID = LEGACY_LINUX_DESKTOP_ENTRY_IDS[BUILD_CHANNEL];
export const LINUX_ICON_NAME = LEGACY_LINUX_DESKTOP_ENTRY_IDS[BUILD_CHANNEL];
export const WINDOWS_SHORTCUT_AUTHOR = 'Nexoria Development';
export const WINDOWS_VELOPACK_ID = WINDOWS_VELOPACK_IDS[BUILD_CHANNEL];
export const WINDOWS_LEGACY_SQUIRREL_ID = 'ndchat_app';
export const WINDOWS_APP_USER_MODEL_ID = WINDOWS_APP_USER_MODEL_IDS[BUILD_CHANNEL];
export const WINDOWS_LEGACY_APP_USER_MODEL_IDS = [`velopack.${WINDOWS_VELOPACK_ID}`];
export const WINDOWS_TOAST_ACTIVATOR_CLSID = WINDOWS_TOAST_ACTIVATOR_CLSIDS[BUILD_CHANNEL];
