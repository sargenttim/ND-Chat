import type {ProfileThemeColors} from '@app/features/theme/utils/AccentColorUtils';
import styles from '@app/features/user/components/profile/profile_card/ProfileCardLayout.module.css';
import {Trans} from '@lingui/react/macro';
import {clsx} from 'clsx';
import {observer} from 'mobx-react-lite';
import type React from 'react';
import {useMemo} from 'react';

interface ProfileCardLayoutProps {
	borderColor?: string;
	themeColors?: ProfileThemeColors;
	showPreviewLabel?: boolean;
	hoverRef?: (instance: HTMLDivElement | null) => void;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export const ProfileCardLayout: React.FC<ProfileCardLayoutProps> = observer(
	({borderColor, themeColors, showPreviewLabel = false, hoverRef, className, style, children}) => {
		const effectiveBorderColor = borderColor ?? themeColors?.accentColor;
		const cardStyle = useMemo<React.CSSProperties>(() => {
			const res: React.CSSProperties = {
				...style,
				borderColor: effectiveBorderColor,
			};
			if (themeColors?.hasCustomTheme) {
				res.background = themeColors.gradient;
			}
			return res;
		}, [effectiveBorderColor, themeColors, style]);
		return (
			<div data-flx="user.profile.profile-card.profile-card-layout.div">
				{showPreviewLabel && (
					<div className={styles.previewLabel} data-flx="user.profile.profile-card.profile-card-layout.preview-label">
						<Trans>Profile preview</Trans>
					</div>
				)}
				<div
					ref={hoverRef}
					className={clsx(
						styles.profileCard,
						themeColors?.hasCustomTheme && styles.profileCardThemed,
						className,
					)}
					style={cardStyle}
					data-flx="user.profile.profile-card.profile-card-layout.profile-card"
				>
					{children}
				</div>
			</div>
		);
	},
);
