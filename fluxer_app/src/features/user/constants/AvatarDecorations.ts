// SPDX-License-Identifier: AGPL-3.0-or-later

export interface AvatarDecorationItem {
	id: string;
	name: string;
	description: string;
	category: string;
	primaryColor: string;
	secondaryColor: string;
}

export const AVATAR_DECORATIONS: ReadonlyArray<AvatarDecorationItem> = [
	{
		id: 'sakura',
		name: 'Cherry Blossom',
		description: 'Delicate pink sakura blossoms and gently drifting petals',
		category: 'Nature',
		primaryColor: '#ff9ebb',
		secondaryColor: '#f783ac',
	},
	{
		id: 'cat_ears',
		name: 'Neko Ears',
		description: 'Playful kitty ears with sweet blush and whiskers',
		category: 'Cute',
		primaryColor: '#ff7eb6',
		secondaryColor: '#ffb3d1',
	},
	{
		id: 'cyberpunk_neon',
		name: 'Cyber Neon',
		description: 'High-tech glowing cyan & magenta HUD reticle',
		category: 'Sci-Fi',
		primaryColor: '#00f0ff',
		secondaryColor: '#ff007f',
	},
	{
		id: 'fire_aura',
		name: 'Inferno Flame',
		description: 'Blazing flame corona surging with radiant heat',
		category: 'Fantasy',
		primaryColor: '#ff6600',
		secondaryColor: '#ffcc00',
	},
	{
		id: 'starry_halo',
		name: 'Celestial Halo',
		description: 'Luminous golden angel halo with twinkling stars',
		category: 'Fantasy',
		primaryColor: '#ffe066',
		secondaryColor: '#fff9db',
	},
	{
		id: 'royal_crown',
		name: 'Imperial Crown',
		description: 'Majestic golden crown studded with royal gems',
		category: 'Royalty',
		primaryColor: '#fcc419',
		secondaryColor: '#e03131',
	},
	{
		id: 'pixel_quest',
		name: 'Retro 8-Bit',
		description: 'Arcade pixel frame with 8-bit retro gaming accents',
		category: 'Retro',
		primaryColor: '#51cf66',
		secondaryColor: '#22b8cf',
	},
	{
		id: 'spectral_fog',
		name: 'Phantom Flame',
		description: 'Mystical ultraviolet spectral wisps drifting in the dark',
		category: 'Spooky',
		primaryColor: '#b197fc',
		secondaryColor: '#74c0fc',
	},
	{
		id: 'autumn_leaves',
		name: 'Autumn Breeze',
		description: 'Warm golden and crimson foliage caught in a gentle gust',
		category: 'Nature',
		primaryColor: '#f76707',
		secondaryColor: '#f59f00',
	},
	{
		id: 'bubble_tea',
		name: 'Sweet Boba',
		description: 'Pastel boba pearls with sweet straw and sparkles',
		category: 'Cute',
		primaryColor: '#e599f7',
		secondaryColor: '#ffe066',
	},
	{
		id: 'magic_portal',
		name: 'Arcane Rift',
		description: 'Swirling purple and teal vortex of raw mystic energy',
		category: 'Fantasy',
		primaryColor: '#9775fa',
		secondaryColor: '#20c997',
	},
	{
		id: 'frozen_frost',
		name: 'Winter Frost',
		description: 'Crystalline icicles and shimmering diamond snowflakes',
		category: 'Nature',
		primaryColor: '#74c0fc',
		secondaryColor: '#e7f5ff',
	},
];

export const AVATAR_DECORATION_MAP = new Map<string, AvatarDecorationItem>(
	AVATAR_DECORATIONS.map((item) => [item.id, item]),
);

export function getAvatarDecoration(id: string | null | undefined): AvatarDecorationItem | null {
	if (!id) return null;
	return AVATAR_DECORATION_MAP.get(id) ?? null;
}
