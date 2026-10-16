// SPDX-License-Identifier: AGPL-3.0-or-later

import styles from '@app/features/user/components/profile/AvatarDecorationOverlay.module.css';
import React from 'react';

interface AvatarDecorationOverlayProps {
	decoration?: string | null;
	size?: number;
	className?: string;
}

export const AvatarDecorationOverlay: React.FC<AvatarDecorationOverlayProps> = ({
	decoration,
	className,
}) => {
	if (!decoration || decoration === 'none') return null;

	return (
		<div className={`${styles.overlay} ${className || ''}`.trim()} aria-hidden="true">
			<svg
				viewBox="0 0 100 100"
				className={styles.svgRoot}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{renderDecorationContent(decoration)}
			</svg>
		</div>
	);
};

function renderDecorationContent(id: string): React.ReactNode {
	switch (id) {
		case 'cat_ears':
			return (
				<g id="dec-cat-ears">
					<defs>
						<linearGradient id="catEarGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#ff7eb6" />
							<stop offset="100%" stopColor="#ff4d94" />
						</linearGradient>
						<linearGradient id="catInnerGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#fff0f5" />
							<stop offset="100%" stopColor="#ffb3d1" />
						</linearGradient>
					</defs>
					{/* Left Ear */}
					<path
						d="M 23 29 C 19 14, 26 5, 38 17 C 33 23, 29 26, 23 29 Z"
						fill="url(#catEarGrad)"
						stroke="#d6336c"
						strokeWidth="1.2"
						strokeLinejoin="round"
					/>
					<path
						d="M 26 26 C 24 16, 29 11, 35 18 C 32 22, 29 24, 26 26 Z"
						fill="url(#catInnerGrad)"
					/>
					{/* Right Ear */}
					<path
						d="M 77 29 C 81 14, 74 5, 62 17 C 67 23, 71 26, 77 29 Z"
						fill="url(#catEarGrad)"
						stroke="#d6336c"
						strokeWidth="1.2"
						strokeLinejoin="round"
					/>
					<path
						d="M 74 26 C 76 16, 71 11, 65 18 C 68 22, 71 24, 74 26 Z"
						fill="url(#catInnerGrad)"
					/>
					{/* Left Whiskers */}
					<line x1="7" y1="48" x2="16" y2="50" stroke="#ff7eb6" strokeWidth="1.4" strokeLinecap="round" />
					<line x1="8" y1="55" x2="16" y2="54" stroke="#ff7eb6" strokeWidth="1.4" strokeLinecap="round" />
					{/* Right Whiskers */}
					<line x1="93" y1="48" x2="84" y2="50" stroke="#ff7eb6" strokeWidth="1.4" strokeLinecap="round" />
					<line x1="92" y1="55" x2="84" y2="54" stroke="#ff7eb6" strokeWidth="1.4" strokeLinecap="round" />
					{/* Left Paw Accent */}
					<g transform="translate(18, 76)">
						<circle cx="0" cy="0" r="4.5" fill="#fff0f5" stroke="#ff7eb6" strokeWidth="1.2" />
						<circle cx="-3" cy="-4" r="1.5" fill="#ff7eb6" />
						<circle cx="0" cy="-5" r="1.6" fill="#ff7eb6" />
						<circle cx="3" cy="-4" r="1.5" fill="#ff7eb6" />
					</g>
				</g>
			);

		case 'sakura':
			return (
				<g id="dec-sakura">
					<defs>
						<linearGradient id="sakuraPink" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#fff0f6" />
							<stop offset="100%" stopColor="#ff85c0" />
						</linearGradient>
					</defs>
					{/* Flowing vine branch */}
					<path
						d="M 16 36 C 14 22, 28 12, 42 13 C 58 14, 76 12, 84 24"
						stroke="#d48806"
						strokeWidth="1.5"
						strokeLinecap="round"
						fill="none"
					/>
					{/* Flower Top Left */}
					<g transform="translate(26, 18)" className={styles.animatedPetal}>
						<circle cx="0" cy="-4" r="3" fill="url(#sakuraPink)" />
						<circle cx="4" cy="-1" r="3" fill="url(#sakuraPink)" />
						<circle cx="2" cy="4" r="3" fill="url(#sakuraPink)" />
						<circle cx="-3" cy="3" r="3" fill="url(#sakuraPink)" />
						<circle cx="-4" cy="-2" r="3" fill="url(#sakuraPink)" />
						<circle cx="0" cy="0" r="1.8" fill="#ffd666" />
					</g>
					{/* Flower Top Right */}
					<g transform="translate(76, 20)" className={styles.animatedPetal}>
						<circle cx="0" cy="-4" r="3" fill="url(#sakuraPink)" />
						<circle cx="4" cy="-1" r="3" fill="url(#sakuraPink)" />
						<circle cx="2" cy="4" r="3" fill="url(#sakuraPink)" />
						<circle cx="-3" cy="3" r="3" fill="url(#sakuraPink)" />
						<circle cx="-4" cy="-2" r="3" fill="url(#sakuraPink)" />
						<circle cx="0" cy="0" r="1.8" fill="#ffd666" />
					</g>
					{/* Floating Petals */}
					<path d="M 12 46 C 9 44, 10 39, 14 41 C 18 43, 16 48, 12 46 Z" fill="#ffadd2" className={styles.animatedPetal} />
					<path d="M 88 52 C 85 50, 86 45, 90 47 C 94 49, 92 54, 88 52 Z" fill="#ffadd2" className={styles.animatedPetal} />
					<path d="M 32 86 C 29 84, 30 79, 34 81 C 38 83, 36 88, 32 86 Z" fill="#ffadd2" className={styles.animatedPetal} />
					<path d="M 68 85 C 65 83, 66 78, 70 80 C 74 82, 72 87, 68 85 Z" fill="#ffadd2" className={styles.animatedPetal} />
				</g>
			);

		case 'cyberpunk_neon':
			return (
				<g id="dec-cyberpunk" className={styles.animatedCyber}>
					<defs>
						<linearGradient id="cyberCyan" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#00f0ff" />
							<stop offset="100%" stopColor="#0077ff" />
						</linearGradient>
						<linearGradient id="cyberPink" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#ff007f" />
							<stop offset="100%" stopColor="#b000ff" />
						</linearGradient>
					</defs>
					{/* Outer dashed HUD ring */}
					<circle
						cx="50"
						cy="50"
						r="43"
						stroke="url(#cyberCyan)"
						strokeWidth="1.5"
						strokeDasharray="14 8 4 8"
						fill="none"
					/>
					<circle
						cx="50"
						cy="50"
						r="46"
						stroke="url(#cyberPink)"
						strokeWidth="0.8"
						strokeDasharray="4 20"
						fill="none"
					/>
					{/* Top Left Bracket */}
					<path d="M 12 24 L 12 12 L 24 12" stroke="#00f0ff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
					<rect x="15" y="15" width="2" height="2" fill="#ff007f" />
					{/* Top Right Bracket */}
					<path d="M 88 24 L 88 12 L 76 12" stroke="#00f0ff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
					<rect x="83" y="15" width="2" height="2" fill="#ff007f" />
					{/* Bottom Left Bracket */}
					<path d="M 12 76 L 12 88 L 24 88" stroke="#ff007f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
					<rect x="15" y="83" width="2" height="2" fill="#00f0ff" />
					{/* Bottom Right Bracket */}
					<path d="M 88 76 L 88 88 L 76 88" stroke="#ff007f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
					<rect x="83" y="83" width="2" height="2" fill="#00f0ff" />
					{/* HUD Status Text / Ticks */}
					<line x1="50" y1="6" x2="50" y2="9" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
					<line x1="50" y1="91" x2="50" y2="94" stroke="#ff007f" strokeWidth="2" strokeLinecap="round" />
				</g>
			);

		case 'fire_aura':
			return (
				<g id="dec-fire" className={styles.animatedFlame}>
					<defs>
						<linearGradient id="fireBase" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#e03131" />
							<stop offset="50%" stopColor="#ff922b" />
							<stop offset="100%" stopColor="#ffd43b" />
						</linearGradient>
						<linearGradient id="fireTip" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#ff6b6b" />
							<stop offset="100%" stopColor="#fff9db" />
						</linearGradient>
					</defs>
					{/* Flame crowns on sides & bottom */}
					<path
						d="M 16 68 C 10 54, 11 40, 16 32 C 18 42, 21 44, 21 48 C 21 34, 27 22, 34 16 C 33 26, 36 29, 39 30 C 43 18, 50 10, 50 8 C 50 10, 57 18, 61 30 C 64 29, 67 26, 66 16 C 73 22, 79 34, 79 48 C 79 44, 82 42, 84 32 C 89 40, 90 54, 84 68 C 86 64, 89 60, 91 50 C 93 64, 88 80, 78 88 C 68 96, 32 96, 22 88 C 12 80, 7 64, 9 50 C 11 60, 14 64, 16 68 Z"
						fill="url(#fireBase)"
						opacity="0.9"
					/>
					{/* Inner bright core flames */}
					<path
						d="M 24 64 C 20 54, 22 45, 26 38 C 28 44, 30 46, 32 46 C 34 36, 40 26, 46 22 C 45 28, 48 30, 50 30 C 52 30, 55 28, 54 22 C 60 26, 66 36, 68 46 C 70 46, 72 44, 74 38 C 78 45, 80 54, 76 64 C 74 61, 76 56, 78 52 C 78 68, 70 82, 50 84 C 30 82, 22 68, 22 52 C 24 56, 26 61, 24 64 Z"
						fill="url(#fireTip)"
						opacity="0.85"
					/>
				</g>
			);

		case 'starry_halo':
			return (
				<g id="dec-halo">
					<defs>
						<linearGradient id="haloGold" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="#ffe066" />
							<stop offset="50%" stopColor="#fff9db" />
							<stop offset="100%" stopColor="#fcc419" />
						</linearGradient>
					</defs>
					{/* Floating Angel Halo */}
					<g className={styles.animatedHalo}>
						<ellipse
							cx="50"
							cy="15"
							rx="28"
							ry="7"
							stroke="url(#haloGold)"
							strokeWidth="3.2"
							fill="none"
							strokeLinecap="round"
						/>
						<ellipse
							cx="50"
							cy="15"
							rx="26"
							ry="5.5"
							stroke="#fff"
							strokeWidth="1"
							fill="none"
							opacity="0.75"
						/>
					</g>
					{/* 4-point twinkle stars */}
					<g transform="translate(18, 22)" className={styles.animatedStar}>
						<path d="M 0 -4 Q 0 0 4 0 Q 0 0 0 4 Q 0 0 -4 0 Q 0 0 0 -4 Z" fill="#ffd43b" />
					</g>
					<g transform="translate(82, 20)" className={styles.animatedStarAlt}>
						<path d="M 0 -5 Q 0 0 5 0 Q 0 0 0 5 Q 0 0 -5 0 Q 0 0 0 -5 Z" fill="#ffd43b" />
					</g>
					<g transform="translate(12, 46)" className={styles.animatedStarAlt}>
						<path d="M 0 -3 Q 0 0 3 0 Q 0 0 0 3 Q 0 0 -3 0 Q 0 0 0 -3 Z" fill="#fff9db" />
					</g>
					<g transform="translate(88, 48)" className={styles.animatedStar}>
						<path d="M 0 -3.5 Q 0 0 3.5 0 Q 0 0 0 3.5 Q 0 0 -3.5 0 Q 0 0 0 -3.5 Z" fill="#fff9db" />
					</g>
				</g>
			);

		case 'royal_crown':
			return (
				<g id="dec-crown">
					<defs>
						<linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#ffe066" />
							<stop offset="100%" stopColor="#e67700" />
						</linearGradient>
					</defs>
					{/* 5-Peak Imperial Crown */}
					<g transform="translate(0, 2)">
						{/* Crown body */}
						<path
							d="M 26 26 L 22 12 L 36 19 L 50 8 L 64 19 L 78 12 L 74 26 C 66 28, 34 28, 26 26 Z"
							fill="url(#crownGold)"
							stroke="#d9480f"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
						{/* Crown Arch Band */}
						<path
							d="M 26 26 C 34 29, 66 29, 74 26 L 75 29 C 66 32, 34 32, 25 29 Z"
							fill="#d9480f"
						/>
						{/* Crown Peak Pearls */}
						<circle cx="22" cy="11" r="2.2" fill="#fff" stroke="#fcc419" strokeWidth="0.8" />
						<circle cx="36" cy="18" r="2" fill="#fff" stroke="#fcc419" strokeWidth="0.8" />
						<circle cx="50" cy="7" r="2.8" fill="#fff" stroke="#fcc419" strokeWidth="0.8" />
						<circle cx="64" cy="18" r="2" fill="#fff" stroke="#fcc419" strokeWidth="0.8" />
						<circle cx="78" cy="11" r="2.2" fill="#fff" stroke="#fcc419" strokeWidth="0.8" />
						{/* Jewels embedded on band */}
						<circle cx="34" cy="24" r="1.8" fill="#1864ab" />
						<circle cx="50" cy="24" r="2.2" fill="#c92a2a" />
						<circle cx="66" cy="24" r="1.8" fill="#2b8a3e" />
					</g>
				</g>
			);

		case 'pixel_quest':
			return (
				<g id="dec-pixel">
					{/* 8-bit stepped brackets */}
					{/* Top Left */}
					<rect x="10" y="10" width="12" height="4" fill="#51cf66" />
					<rect x="10" y="14" width="4" height="12" fill="#51cf66" />
					<rect x="14" y="14" width="4" height="4" fill="#2f9e44" />
					{/* Top Right */}
					<rect x="78" y="10" width="12" height="4" fill="#51cf66" />
					<rect x="86" y="14" width="4" height="12" fill="#51cf66" />
					<rect x="82" y="14" width="4" height="4" fill="#2f9e44" />
					{/* Bottom Left */}
					<rect x="10" y="86" width="12" height="4" fill="#22b8cf" />
					<rect x="10" y="74" width="4" height="12" fill="#22b8cf" />
					<rect x="14" y="82" width="4" height="4" fill="#1098ad" />
					{/* Bottom Right */}
					<rect x="78" y="86" width="12" height="4" fill="#22b8cf" />
					<rect x="86" y="74" width="4" height="12" fill="#22b8cf" />
					<rect x="82" y="82" width="4" height="4" fill="#1098ad" />
					{/* Pixel Heart at bottom center */}
					<g transform="translate(44, 84)">
						<rect x="2" y="0" width="3" height="3" fill="#ff4d4f" />
						<rect x="7" y="0" width="3" height="3" fill="#ff4d4f" />
						<rect x="0" y="3" width="12" height="3" fill="#ff4d4f" />
						<rect x="2" y="6" width="8" height="3" fill="#ff4d4f" />
						<rect x="4" y="9" width="4" height="3" fill="#ff4d4f" />
					</g>
				</g>
			);

		case 'spectral_fog':
			return (
				<g id="dec-spectral" className={styles.animatedSpectral}>
					<defs>
						<linearGradient id="spectralGrad" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#7048e8" />
							<stop offset="60%" stopColor="#b197fc" />
							<stop offset="100%" stopColor="#74c0fc" />
						</linearGradient>
					</defs>
					<path
						d="M 14 74 C 8 60, 10 42, 16 34 C 18 42, 22 46, 22 52 C 22 36, 30 24, 38 18 C 36 28, 40 32, 44 32 C 48 18, 56 12, 54 8 C 58 14, 64 22, 66 32 C 70 30, 72 26, 70 18 C 78 24, 84 36, 84 52 C 84 46, 88 42, 90 34 C 94 42, 96 60, 90 74 C 84 86, 72 92, 50 92 C 28 92, 18 86, 14 74 Z"
						fill="url(#spectralGrad)"
						opacity="0.75"
					/>
					<circle cx="20" cy="30" r="2.5" fill="#e5dbff" opacity="0.8" />
					<circle cx="80" cy="28" r="2.5" fill="#e5dbff" opacity="0.8" />
					<circle cx="50" cy="10" r="2" fill="#d0ebff" opacity="0.9" />
				</g>
			);

		case 'autumn_leaves':
			return (
				<g id="dec-autumn">
					<defs>
						<linearGradient id="autumnLeaf1" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#ff922b" />
							<stop offset="100%" stopColor="#c92a2a" />
						</linearGradient>
						<linearGradient id="autumnLeaf2" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#ffd43b" />
							<stop offset="100%" stopColor="#f76707" />
						</linearGradient>
					</defs>
					{/* Swirling Wind Line */}
					<path
						d="M 12 60 C 8 40, 22 18, 44 14 C 70 10, 92 26, 88 52 C 86 68, 72 88, 50 88"
						stroke="#ffa94d"
						strokeWidth="1.2"
						strokeDasharray="6 4"
						fill="none"
					/>
					{/* Leaves */}
					<g transform="translate(24, 18) rotate(-20)" className={styles.animatedPetal}>
						<path d="M 0 -7 C 5 -4, 5 4, 0 7 C -5 4, -5 -4, 0 -7 Z" fill="url(#autumnLeaf1)" />
						<line x1="0" y1="-5" x2="0" y2="6" stroke="#fff" strokeWidth="0.6" opacity="0.6" />
					</g>
					<g transform="translate(74, 18) rotate(30)" className={styles.animatedPetal}>
						<path d="M 0 -8 C 6 -5, 6 5, 0 8 C -6 5, -6 -5, 0 -8 Z" fill="url(#autumnLeaf2)" />
						<line x1="0" y1="-6" x2="0" y2="7" stroke="#fff" strokeWidth="0.6" opacity="0.6" />
					</g>
					<g transform="translate(88, 56) rotate(60)" className={styles.animatedPetal}>
						<path d="M 0 -6 C 4 -3, 4 3, 0 6 C -4 3, -4 -3, 0 -6 Z" fill="url(#autumnLeaf1)" />
					</g>
					<g transform="translate(14, 52) rotate(-45)" className={styles.animatedPetal}>
						<path d="M 0 -6 C 4 -3, 4 3, 0 6 C -4 3, -4 -3, 0 -6 Z" fill="url(#autumnLeaf2)" />
					</g>
				</g>
			);

		case 'bubble_tea':
			return (
				<g id="dec-boba">
					<defs>
						<linearGradient id="bobaStraw" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#fcc419" />
							<stop offset="100%" stopColor="#e599f7" />
						</linearGradient>
					</defs>
					{/* Diagonal Straw Top Right */}
					<rect
						x="72"
						y="6"
						width="5.5"
						height="28"
						rx="2.5"
						transform="rotate(30 72 6)"
						fill="url(#bobaStraw)"
						stroke="#be4bdb"
						strokeWidth="0.8"
					/>
					{/* Boba pearls lined around bottom */}
					<g transform="translate(26, 82)">
						<circle cx="0" cy="0" r="4.2" fill="#212529" stroke="#495057" strokeWidth="0.8" />
						<circle cx="-1.2" cy="-1.2" r="1.2" fill="#868e96" />
					</g>
					<g transform="translate(38, 86)">
						<circle cx="0" cy="0" r="4.5" fill="#212529" stroke="#495057" strokeWidth="0.8" />
						<circle cx="-1.2" cy="-1.2" r="1.3" fill="#868e96" />
					</g>
					<g transform="translate(50, 88)">
						<circle cx="0" cy="0" r="4.8" fill="#212529" stroke="#495057" strokeWidth="0.8" />
						<circle cx="-1.4" cy="-1.4" r="1.4" fill="#868e96" />
					</g>
					<g transform="translate(62, 86)">
						<circle cx="0" cy="0" r="4.5" fill="#212529" stroke="#495057" strokeWidth="0.8" />
						<circle cx="-1.2" cy="-1.2" r="1.3" fill="#868e96" />
					</g>
					<g transform="translate(74, 82)">
						<circle cx="0" cy="0" r="4.2" fill="#212529" stroke="#495057" strokeWidth="0.8" />
						<circle cx="-1.2" cy="-1.2" r="1.2" fill="#868e96" />
					</g>
					{/* Cute Sparkles */}
					<circle cx="20" cy="24" r="2" fill="#fcc419" />
					<circle cx="24" cy="20" r="1.2" fill="#fcc419" />
				</g>
			);

		case 'magic_portal':
			return (
				<g id="dec-portal">
					<defs>
						<linearGradient id="portalOuter" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#7950f2" />
							<stop offset="50%" stopColor="#20c997" />
							<stop offset="100%" stopColor="#be4bdb" />
						</linearGradient>
					</defs>
					<g className={styles.animatedPortalOuter}>
						<circle
							cx="50"
							cy="50"
							r="44"
							stroke="url(#portalOuter)"
							strokeWidth="2.5"
							strokeDasharray="20 12 8 12"
							fill="none"
						/>
					</g>
					<g className={styles.animatedPortalInner}>
						<circle
							cx="50"
							cy="50"
							r="46.5"
							stroke="#20c997"
							strokeWidth="1.2"
							strokeDasharray="6 18"
							fill="none"
							opacity="0.8"
						/>
					</g>
					<circle cx="14" cy="50" r="2.5" fill="#20c997" />
					<circle cx="86" cy="50" r="2.5" fill="#20c997" />
					<circle cx="50" cy="14" r="2.5" fill="#7950f2" />
					<circle cx="50" cy="86" r="2.5" fill="#7950f2" />
				</g>
			);

		case 'frozen_frost':
			return (
				<g id="dec-frost">
					<defs>
						<linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#e7f5ff" />
							<stop offset="100%" stopColor="#74c0fc" />
						</linearGradient>
					</defs>
					{/* Hanging icicles from top */}
					<polygon points="26,16 29,26 32,16" fill="url(#iceGrad)" />
					<polygon points="34,14 38,30 42,14" fill="url(#iceGrad)" />
					<polygon points="46,12 50,32 54,12" fill="url(#iceGrad)" />
					<polygon points="58,14 62,30 66,14" fill="url(#iceGrad)" />
					<polygon points="68,16 71,26 74,16" fill="url(#iceGrad)" />
					{/* Crystal snowflakes */}
					<g transform="translate(18, 50) scale(0.8)">
						<line x1="-6" y1="0" x2="6" y2="0" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="0" y1="-6" x2="0" y2="6" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="-4" y1="-4" x2="4" y2="4" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="-4" y1="4" x2="4" y2="-4" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
					</g>
					<g transform="translate(82, 50) scale(0.8)">
						<line x1="-6" y1="0" x2="6" y2="0" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="0" y1="-6" x2="0" y2="6" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="-4" y1="-4" x2="4" y2="4" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
						<line x1="-4" y1="4" x2="4" y2="-4" stroke="#d0ebff" strokeWidth="1.5" strokeLinecap="round" />
					</g>
				</g>
			);

		default:
			return null;
	}
}
