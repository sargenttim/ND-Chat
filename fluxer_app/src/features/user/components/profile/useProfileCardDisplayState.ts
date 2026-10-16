// SPDX-License-Identifier: AGPL-3.0-or-later

import type {GuildMember} from '@app/features/member/models/GuildMember';
import {getUserThemeColors, type ProfileThemeColors} from '@app/features/theme/utils/AccentColorUtils';
import type {Profile} from '@app/features/user/models/Profile';
import type {User} from '@app/features/user/models/User';
import * as ProfileDisplayUtils from '@app/features/user/utils/ProfileDisplayUtils';
import {MEDIA_PROXY_PROFILE_BANNER_SIZE_POPOUT} from '@fluxer/constants/src/MediaProxyAssetSizes';
import type {MediaProxyImageSize} from '@fluxer/constants/src/MediaProxyImageSizes';
import type {UserProfile} from '@fluxer/schema/src/domains/user/UserResponseSchemas';
import {useMemo} from 'react';

export interface ProfileCardDisplayStateParams {
	user: User;
	profile: Profile | null;
	guildId?: string | null;
	guildMember?: GuildMember | null;
	guildMemberProfile?: UserProfile | null;
	previewOverrides?: ProfileDisplayUtils.ProfilePreviewOverrides;
	accentUser?: User;
	bannerSize?: MediaProxyImageSize;
}

export interface ProfileCardDisplayState {
	profileContext: ProfileDisplayUtils.ProfileDisplayContext;
	avatarUrl: string | null;
	hoverAvatarUrl: string | null;
	bannerUrl: string | null;
	hoverBannerUrl: string | null;
	accentColor: string;
	primaryColor: string;
	themeColors: ProfileThemeColors;
	profileData: Readonly<UserProfile> | null;
}

export function useProfileCardDisplayState({
	user,
	profile,
	guildId,
	guildMember,
	guildMemberProfile,
	previewOverrides,
	accentUser,
	bannerSize,
}: ProfileCardDisplayStateParams): ProfileCardDisplayState {
	const profileContext = useMemo<ProfileDisplayUtils.ProfileDisplayContext>(
		() => ({
			user,
			profile,
			guildId,
			guildMember,
			guildMemberProfile,
		}),
		[user, profile, guildId, guildMember, guildMemberProfile],
	);
	const avatarUrls = useMemo(
		() => ProfileDisplayUtils.getProfileAvatarUrls(profileContext, previewOverrides),
		[profileContext, previewOverrides],
	);
	const resolvedBannerSize: MediaProxyImageSize = bannerSize ?? MEDIA_PROXY_PROFILE_BANNER_SIZE_POPOUT;
	const bannerUrls = useMemo(
		() => ProfileDisplayUtils.getProfileBannerUrls(profileContext, previewOverrides, resolvedBannerSize),
		[profileContext, previewOverrides, resolvedBannerSize],
	);
	const profileData = useMemo(() => profile?.getEffectiveProfile() ?? null, [profile]);
	const themeColors = useMemo(
		() => getUserThemeColors(accentUser ?? user, profileData),
		[accentUser ?? user, profileData],
	);
	const accentColor = themeColors.accentColor;
	const primaryColor = themeColors.primaryColor;
	return {
		profileContext,
		avatarUrl: avatarUrls.avatarUrl,
		hoverAvatarUrl: avatarUrls.hoverAvatarUrl,
		bannerUrl: bannerUrls.bannerUrl,
		hoverBannerUrl: bannerUrls.hoverBannerUrl,
		accentColor,
		primaryColor,
		themeColors,
		profileData,
	};
}
