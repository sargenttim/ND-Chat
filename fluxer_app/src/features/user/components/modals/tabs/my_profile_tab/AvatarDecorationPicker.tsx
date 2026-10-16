// SPDX-License-Identifier: AGPL-3.0-or-later

import {AvatarDecorationOverlay} from '@app/features/user/components/profile/AvatarDecorationOverlay';
import {
	AVATAR_DECORATIONS,
	getAvatarDecoration,
} from '@app/features/user/constants/AvatarDecorations';
import styles from '@app/features/user/components/modals/tabs/my_profile_tab/AvatarDecorationPicker.module.css';
import {msg} from '@lingui/core/macro';
import {useLingui} from '@lingui/react/macro';
import {CheckIcon, ProhibitIcon} from '@phosphor-icons/react';
import {observer} from 'mobx-react-lite';
import React from 'react';

const AVATAR_DECORATION_TITLE_DESCRIPTOR = msg({
	message: 'Avatar Decoration',
	comment: 'Section header for choosing an avatar decoration frame.',
});

const AVATAR_DECORATION_DESCRIPTION_DESCRIPTOR = msg({
	message: 'Choose an animated decoration frame to surround your avatar profile.',
	comment: 'Description explaining what avatar decorations are.',
});

const REMOVE_DECORATION_DESCRIPTOR = msg({
	message: 'Remove decoration',
	comment: 'Button to remove active avatar decoration.',
});

const NONE_DESCRIPTOR = msg({
	message: 'None',
	comment: 'Option to clear decoration.',
});

export interface AvatarDecorationPickerProps {
	value?: string | null;
	onChange: (value: string | null) => void;
	disabled?: boolean;
	errorMessage?: string;
}

export const AvatarDecorationPicker: React.FC<AvatarDecorationPickerProps> = observer(
	({value, onChange, disabled = false, errorMessage}) => {
		const {i18n} = useLingui();
		const activeDecoration = getAvatarDecoration(value);
		const hasActiveDecoration = Boolean(activeDecoration);

		const handleSelect = (id: string | null) => {
			if (disabled) return;
			onChange(id);
		};

		return (
			<div className={styles.container} data-flx="user.my-profile-tab.avatar-decoration-picker">
				<div className={styles.headerRow}>
					<div>
						<div className={styles.title}>{i18n._(AVATAR_DECORATION_TITLE_DESCRIPTOR)}</div>
						<div className={styles.description}>
							{i18n._(AVATAR_DECORATION_DESCRIPTION_DESCRIPTOR)}
						</div>
					</div>
					{hasActiveDecoration && (
						<button
							type="button"
							className={styles.removeButton}
							onClick={() => handleSelect(null)}
							disabled={disabled}
							data-flx="user.my-profile-tab.avatar-decoration-picker.remove-button"
						>
							{i18n._(REMOVE_DECORATION_DESCRIPTOR)}
						</button>
					)}
				</div>

				<div className={styles.grid}>
					{/* None Option */}
					<button
						type="button"
						className={`${styles.card} ${!value ? styles.cardSelected : ''}`}
						onClick={() => handleSelect(null)}
						disabled={disabled}
						aria-pressed={!value}
						data-flx="user.my-profile-tab.avatar-decoration-picker.card-none"
					>
						<div className={styles.previewCircle}>
							<ProhibitIcon className={styles.noneIcon} weight="bold" />
						</div>
						<span className={styles.cardLabel}>{i18n._(NONE_DESCRIPTOR)}</span>
						{!value && (
							<div className={styles.selectedBadge}>
								<CheckIcon weight="bold" size={10} />
							</div>
						)}
					</button>

					{/* All Catalog Decorations */}
					{AVATAR_DECORATIONS.map((item) => {
						const isSelected = value === item.id;
						return (
							<button
								key={item.id}
								type="button"
								className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
								onClick={() => handleSelect(item.id)}
								disabled={disabled}
								aria-pressed={isSelected}
								title={item.description}
								data-flx={`user.my-profile-tab.avatar-decoration-picker.card-${item.id}`}
							>
								<div className={styles.previewCircle}>
									<div className={styles.innerAvatarMock} />
									<AvatarDecorationOverlay decoration={item.id} size={50} />
								</div>
								<span className={styles.cardLabel}>{item.name}</span>
								{isSelected && (
									<div className={styles.selectedBadge}>
										<CheckIcon weight="bold" size={10} />
									</div>
								)}
							</button>
						);
					})}
				</div>

				{errorMessage && (
					<div className="form-error-message" style={{color: 'var(--text-danger)', fontSize: '12px'}}>
						{errorMessage}
					</div>
				)}
			</div>
		);
	},
);
