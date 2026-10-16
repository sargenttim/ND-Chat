// SPDX-License-Identifier: AGPL-3.0-or-later

import * as ColorUtils from '@app/features/theme/utils/ColorUtils';
import {ColorPickerField} from '@app/features/ui/components/form/ColorPickerField';
import myProfileTabStyles from '@app/features/user/components/modals/tabs/MyProfileTab.module.css';
import styles from '@app/features/user/components/modals/tabs/my_profile_tab/AccentColorPicker.module.css';
import {msg} from '@lingui/core/macro';
import {Trans, useLingui} from '@lingui/react/macro';
import {observer} from 'mobx-react-lite';

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
		errorMessage,
	}: AccentColorPickerProps) => {
		const {i18n} = useLingui();

		const effectivePrimary = primaryColor !== undefined ? primaryColor : (value ?? null);
		const effectiveAccent = accentColor !== undefined ? accentColor : (value ?? null);

		const handlePrimaryChange = (val: number | null) => {
			if (onPrimaryChange) {
				onPrimaryChange(val);
			} else if (onChange) {
				onChange(val);
			}
		};

		const handleAccentChange = (val: number | null) => {
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
					<div className={styles.headerTitle}>{i18n._(PROFILE_THEMES_TITLE_DESCRIPTOR)}</div>
					<div className={styles.headerDescription}>
						{i18n._(PROFILE_THEMES_DESCRIPTION_DESCRIPTOR)}
					</div>
				</div>

				<div className={styles.pickersGrid}>
					<ColorPickerField
						label={i18n._(PRIMARY_COLOR_DESCRIPTOR)}
						description={i18n._(PRIMARY_COLOR_FOOTER_DESCRIPTOR)}
						descriptionClassName={myProfileTabStyles.inputFooter}
						value={effectivePrimary ?? DEFAULT_PROFILE_PRIMARY_COLOR}
						onChange={(val: number) => handlePrimaryChange(val)}
						defaultValue={DEFAULT_PROFILE_PRIMARY_COLOR}
						isDefaultValue={effectivePrimary === null}
						onReset={() => handlePrimaryChange(null)}
						disabled={disabled}
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
						disabled={disabled}
						data-flx="user.my-profile-tab.accent-color-picker.accent.change"
					/>
				</div>

				<div
					className={styles.gradientPreview}
					style={{background: gradient, borderColor: accentHex}}
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
