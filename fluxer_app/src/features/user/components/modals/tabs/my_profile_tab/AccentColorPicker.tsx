// SPDX-License-Identifier: AGPL-3.0-or-later

import * as ColorUtils from '@app/features/theme/utils/ColorUtils';
import {ColorPickerField} from '@app/features/ui/components/form/ColorPickerField';
import myProfileTabStyles from '@app/features/user/components/modals/tabs/MyProfileTab.module.css';
import styles from '@app/features/user/components/modals/tabs/my_profile_tab/AccentColorPicker.module.css';
import {CANCEL_DESCRIPTOR, GET_PREMIUM_DESCRIPTOR} from '@app/features/i18n/utils/CommonMessageDescriptors';
import * as PremiumModalCommands from '@app/features/premium/commands/PremiumModalCommands';
import {getPremiumProductName, shouldShowPremiumFeatures} from '@app/features/premium/utils/PremiumUtils';
import {ConfirmModal} from '@app/features/app/components/dialogs/ConfirmModal';
import * as ModalCommands from '@app/features/ui/commands/ModalCommands';
import {modal} from '@app/features/ui/commands/ModalCommands';
import {PlutoniumUpsell} from '@app/features/ui/plutonium_upsell/PlutoniumUpsell';
import {msg} from '@lingui/core/macro';
import {Trans, useLingui} from '@lingui/react/macro';
import {observer} from 'mobx-react-lite';
import {clsx} from 'clsx';
import {useCallback} from 'react';

export const DEFAULT_PROFILE_PRIMARY_COLOR = 0x2b2d31;
export const DEFAULT_PROFILE_ACCENT_COLOR = 0x4641d9;

const PROFILE_THEMES_TITLE_DESCRIPTOR = msg({
	message: 'Profile Themes',
	comment: 'Title for profile themes color customizer.',
});

const PROFILE_THEMES_DESCRIPTION_DESCRIPTOR = msg({
	message: 'Customize the primary and accent colors for your profile card gradient.',
	comment: 'Description for profile themes color customizer.',
});

const PROFILE_THEMES_REQUIRE_DESCRIPTOR = msg({
	message: 'Profile themes require {premiumProductName}',
	comment: 'Modal title when free user clicks profile themes.',
});

const PRIMARY_COLOR_DESCRIPTOR = msg({
	message: 'Primary',
	comment: 'Label for primary theme color.',
});

const PRIMARY_COLOR_FOOTER_DESCRIPTOR = msg({
	message: 'Card body & gradient start',
	comment: 'Footer description for primary color.',
});

const ACCENT_COLOR_DESCRIPTOR = msg({
	message: 'Accent',
	comment: 'Label for accent theme color.',
});

const ACCENT_COLOR_FOOTER_DESCRIPTOR = msg({
	message: 'Borders, highlights & gradient end',
	comment: 'Footer description for accent color.',
});

export interface AccentColorPickerProps {
	value?: number | null;
	onChange?: (value: number | null) => void;
	primaryColor?: number | null;
	accentColor?: number | null;
	onPrimaryChange?: (value: number | null) => void;
	onAccentChange?: (value: number | null) => void;
	disabled?: boolean;
	hasPremium?: boolean;
	errorMessage?: string;
}

export const AccentColorPicker = observer(
	({
		value,
		onChange,
		primaryColor,
		accentColor,
		onPrimaryChange,
		onAccentChange,
		disabled,
		hasPremium = true,
		errorMessage,
	}: AccentColorPickerProps) => {
		const {i18n} = useLingui();
		const PREMIUM_PRODUCT_NAME = getPremiumProductName();

		const showThemesPremiumUpsell = useCallback(() => {
			if (!shouldShowPremiumFeatures()) return;
			ModalCommands.push(
				modal(() => (
					<ConfirmModal
						title={i18n._(PROFILE_THEMES_REQUIRE_DESCRIPTOR, {premiumProductName: getPremiumProductName()})}
						description={
							<Trans>
								Profile themes and dual-color gradients are exclusive to {PREMIUM_PRODUCT_NAME}. Get{' '}
								{PREMIUM_PRODUCT_NAME} to customize your profile card theme and colors.
							</Trans>
						}
						primaryText={i18n._(GET_PREMIUM_DESCRIPTOR, {premiumProductName: getPremiumProductName()})}
						primaryVariant="primary"
						secondaryText={i18n._(CANCEL_DESCRIPTOR)}
						onPrimary={() => {
							window.setTimeout(() => {
								PremiumModalCommands.open();
							}, 0);
						}}
						data-flx="user.my-profile-tab.accent-color-picker.show-themes-premium-upsell.confirm-modal"
					/>
				)),
			);
		}, [PREMIUM_PRODUCT_NAME, i18n]);

		const effectivePrimary = primaryColor !== undefined ? primaryColor : (value ?? null);
		const effectiveAccent = accentColor !== undefined ? accentColor : (value ?? null);

		const handlePrimaryChange = (val: number | null) => {
			if (!hasPremium && val !== null) {
				showThemesPremiumUpsell();
				return;
			}
			if (onPrimaryChange) {
				onPrimaryChange(val);
			} else if (onChange) {
				onChange(val);
			}
		};

		const handleAccentChange = (val: number | null) => {
			if (!hasPremium && val !== null) {
				showThemesPremiumUpsell();
				return;
			}
			if (onAccentChange) {
				onAccentChange(val);
			} else if (onChange) {
				onChange(val);
			}
		};

		const primaryHex = ColorUtils.int2hex(effectivePrimary ?? DEFAULT_PROFILE_PRIMARY_COLOR);
		const accentHex = ColorUtils.int2hex(effectiveAccent ?? DEFAULT_PROFILE_ACCENT_COLOR);
		const gradient = `linear-gradient(135deg, ${primaryHex} 0%, ${accentHex} 100%)`;

		return (
			<div className={styles.container} data-flx="user.my-profile-tab.accent-color-picker.div">
				<div>
					<div className={styles.headerRow}>
						<div className={styles.headerTitle}>{i18n._(PROFILE_THEMES_TITLE_DESCRIPTOR)}</div>
						{!hasPremium && <span className={styles.premiumBadge}>{PREMIUM_PRODUCT_NAME}</span>}
					</div>
					<div className={styles.headerDescription}>
						{i18n._(PROFILE_THEMES_DESCRIPTION_DESCRIPTOR)}
					</div>
				</div>

				{!hasPremium && (
					<PlutoniumUpsell
						onButtonClick={showThemesPremiumUpsell}
						data-flx="user.my-profile-tab.accent-color-picker.plutonium-upsell"
					>
						<Trans>
							Profile themes and dual-color gradients are exclusive to {PREMIUM_PRODUCT_NAME}.
						</Trans>
					</PlutoniumUpsell>
				)}

				<div
					className={clsx(styles.pickersGrid, !hasPremium && styles.lockedGrid)}
					onClick={!hasPremium ? showThemesPremiumUpsell : undefined}
				>
					<ColorPickerField
						label={i18n._(PRIMARY_COLOR_DESCRIPTOR)}
						description={i18n._(PRIMARY_COLOR_FOOTER_DESCRIPTOR)}
						descriptionClassName={myProfileTabStyles.inputFooter}
						value={effectivePrimary ?? DEFAULT_PROFILE_PRIMARY_COLOR}
						onChange={(val: number) => handlePrimaryChange(val)}
						defaultValue={DEFAULT_PROFILE_PRIMARY_COLOR}
						isDefaultValue={effectivePrimary === null}
						onReset={() => handlePrimaryChange(null)}
						disabled={disabled || !hasPremium}
						data-flx="user.my-profile-tab.accent-color-picker.primary.change"
					/>
					<ColorPickerField
						label={i18n._(ACCENT_COLOR_DESCRIPTOR)}
						description={i18n._(ACCENT_COLOR_FOOTER_DESCRIPTOR)}
						descriptionClassName={myProfileTabStyles.inputFooter}
						value={effectiveAccent ?? DEFAULT_PROFILE_ACCENT_COLOR}
						onChange={(val: number) => handleAccentChange(val)}
						defaultValue={DEFAULT_PROFILE_ACCENT_COLOR}
						isDefaultValue={effectiveAccent === null}
						onReset={() => handleAccentChange(null)}
						disabled={disabled || !hasPremium}
						data-flx="user.my-profile-tab.accent-color-picker.accent.change"
					/>
				</div>

				<div
					className={styles.gradientPreview}
					style={{background: gradient, borderColor: accentHex, cursor: !hasPremium ? 'pointer' : undefined}}
					onClick={!hasPremium ? showThemesPremiumUpsell : undefined}
					data-flx="user.my-profile-tab.accent-color-picker.gradient-preview"
				>
					<Trans>Theme Gradient Preview</Trans>
				</div>

				{errorMessage && (
					<p className={styles.errorMessage} data-flx="user.my-profile-tab.accent-color-picker.error-message">
						{errorMessage}
					</p>
				)}
			</div>
		);
	},
);
