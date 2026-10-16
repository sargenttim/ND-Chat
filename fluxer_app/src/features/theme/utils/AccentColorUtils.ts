// SPDX-License-Identifier: AGPL-3.0-or-later

import * as ColorUtils from '@app/features/theme/utils/ColorUtils';
import type {User} from '@app/features/user/models/User';
import {getDefaultAvatarPrimaryColor, getSystemUserBrandingColor} from '@app/features/user/utils/AvatarUtils';
import {DEFAULT_ACCENT_COLOR} from '@fluxer/constants/src/AppConstants';

type RawAccentColor = number | null | undefined;

function getAccentColorHex(rawAccentColor?: RawAccentColor): string | null {
	if (rawAccentColor == null) {
		return null;
	}
	return ColorUtils.int2hex(rawAccentColor);
}

export function getUserAccentColor(
	user: User | null | undefined,
	profileAccentColor?: RawAccentColor,
	fallback = DEFAULT_ACCENT_COLOR,
): string {
	const systemColor = user ? getSystemUserBrandingColor(user.id) : null;
	if (systemColor) {
		return systemColor;
	}
	const profileColor = getAccentColorHex(profileAccentColor);
	if (profileColor) {
		return profileColor;
	}
	if (user && typeof user.avatarColor === 'number') {
		return ColorUtils.int2hex(user.avatarColor);
	}
	if (user && !user.avatar) {
		return ColorUtils.int2hex(getDefaultAvatarPrimaryColor(user.id));
	}
	return fallback;
}

export interface ProfileThemeColors {
	primaryColor: string;
	accentColor: string;
	hasCustomTheme: boolean;
	gradient: string;
}

export function getUserThemeColors(
	user: User | null | undefined,
	profileData?: {
		accent_color?: RawAccentColor;
		banner_color?: RawAccentColor;
		theme_colors?: [number, number] | null;
	} | null,
	fallback = DEFAULT_ACCENT_COLOR,
): ProfileThemeColors {
	const rawTheme = profileData?.theme_colors;
	const rawPrimary =
		rawTheme && rawTheme[0] != null
			? rawTheme[0]
			: (profileData?.banner_color ?? (user ? user.bannerColor : null));
	const rawAccent =
		rawTheme && rawTheme[1] != null
			? rawTheme[1]
			: (profileData?.accent_color ?? (user ? user.accentColor : null));

	const hasCustomTheme = rawPrimary != null || rawAccent != null;
	const accentHex = getUserAccentColor(user, rawAccent, fallback);
	const primaryHex = rawPrimary != null ? ColorUtils.int2hex(rawPrimary) : accentHex;

	const gradient = `linear-gradient(135deg, ${primaryHex} 0%, ${accentHex} 100%)`;

	return {
		primaryColor: primaryHex,
		accentColor: accentHex,
		hasCustomTheme,
		gradient,
	};
}
