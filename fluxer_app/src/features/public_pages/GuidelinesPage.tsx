// SPDX-License-Identifier: AGPL-3.0-or-later

import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import {observer} from 'mobx-react-lite';
import type React from 'react';

export const GuidelinesPage: React.FC = observer(() => {
	return (
		<PublicPageLayout title="Community Guidelines & Rules" dataFlx="app.public-pages.guidelines">
			<div className={styles.header}>
				<div className={styles.badge}>Community Standards</div>
				<h1 className={styles.title}>ND Chat Community Guidelines</h1>
				<p className={styles.subtitle}>
					ND Chat is built for communities, gaming squads, and developers to collaborate and connect. These guidelines define the behavior we expect across all public and private spaces on the platform.
				</p>
				<div className={styles.meta}>
					<span>Applies Platform-wide</span>
					<span>Maintained by Nexoria Development Staff</span>
				</div>
			</div>

			<div className={styles.tocCard}>
				<div className={styles.tocTitle}>Guidelines Overview</div>
				<ul className={styles.tocList}>
					<li><a href="#core-rule" className={styles.tocLink}>1. The Golden Rule</a></li>
					<li><a href="#harassment" className={styles.tocLink}>2. Harassment & Doxxing</a></li>
					<li><a href="#hate-speech" className={styles.tocLink}>3. Hate & Discrimination</a></li>
					<li><a href="#child-safety" className={styles.tocLink}>4. Protection of Minors (Zero Tolerance)</a></li>
					<li><a href="#violence" className={styles.tocLink}>5. Violence & Self-Harm</a></li>
					<li><a href="#spam-raiding" className={styles.tocLink}>6. Spam, Scams & Raiding</a></li>
					<li><a href="#enforcement" className={styles.tocLink}>7. Reporting & Enforcement</a></li>
				</ul>
			</div>

			<section id="core-rule" className={styles.section}>
				<h2 className={styles.sectionTitle}>1. The Golden Rule</h2>
				<p className={styles.paragraph}>
					Treat everyone with basic respect and decency. Diverse communities, banter, and lively debate are welcome, but behavior that targets, intimidates, or degrades others crosses the line.
				</p>
				<div className={styles.callout}>
					Whether you are participating in a large community server, a private group chat, or direct messages, these guidelines apply everywhere on ND Chat.
				</div>
			</section>

			<section id="harassment" className={styles.section}>
				<h2 className={styles.sectionTitle}>2. Harassment, Bullying & Doxxing</h2>
				<p className={styles.paragraph}>We do not tolerate abusive or predatory behavior, including:</p>
				<ul className={styles.list}>
					<li><strong>Harassment & Stalking:</strong> Repeatedly contacting someone who has asked you to stop, evading user blocks, or encouraging others to dogpile on a user.</li>
					<li><strong>Doxxing:</strong> Sharing private personal information (real name, phone number, physical address, employer, IP address) without explicit consent.</li>
					<li><strong>Blackmail & Extortion:</strong> Threatening to leak private communications, photos, or personal details.</li>
					<li><strong>Impersonation:</strong> Pretending to be another user, community member, or Nexoria Development staff with fraudulent or malicious intent.</li>
				</ul>
			</section>

			<section id="hate-speech" className={styles.section}>
				<h2 className={styles.sectionTitle}>3. Hate Speech & Discrimination</h2>
				<p className={styles.paragraph}>
					ND Chat is a space for everyone. You may not promote, organize, or incite violence or dehumanizing hatred against individuals or groups based on:
				</p>
				<ul className={styles.list}>
					<li>Race, ethnicity, or national origin.</li>
					<li>Religion or spiritual beliefs.</li>
					<li>Gender, gender identity, or gender expression.</li>
					<li>Sexual orientation.</li>
					<li>Disability, medical condition, or age.</li>
				</ul>
			</section>

			<section id="child-safety" className={styles.section}>
				<h2 className={styles.sectionTitle}>4. Protection of Minors (Zero Tolerance)</h2>
				<div className={styles.calloutWarning}>
					<strong>Absolute Zero Tolerance:</strong> Any form of child sexual abuse material (CSAM), grooming, predatory behavior, or sexualization of minors results in immediate, permanent account termination and referral to law enforcement and reporting authorities (NCMEC).
				</div>
				<p className={styles.paragraph}>
					Users must be at least 13 years old to use ND Chat. Communities that encourage underage participation or host age-restricted (NSFW) content must strictly enforce age gates and proper channel tagging.
				</p>
			</section>

			<section id="violence" className={styles.section}>
				<h2 className={styles.sectionTitle}>5. Violence, Extremism & Self-Harm</h2>
				<p className={styles.paragraph}>
					You may not promote, coordinate, or glorify dangerous activities, including:
				</p>
				<ul className={styles.list}>
					<li>Credible threats of physical violence or murder against any individual or group.</li>
					<li>Encouraging, instructing, or sharing imagery of self-harm or suicide.</li>
					<li>Promoting or organizing terrorist, violent extremist, or hate group operations.</li>
					<li>Distributing instructions for manufacturing weapons, explosives, or illegal substances.</li>
				</ul>
			</section>

			<section id="spam-raiding" className={styles.section}>
				<h2 className={styles.sectionTitle}>6. Spam, Scams, Malware & Raiding</h2>
				<p className={styles.paragraph}>
					Keep communities healthy and authentic. The following disruptive activities are prohibited:
				</p>
				<ul className={styles.list}>
					<li><strong>Raiding:</strong> Coordinated attacks to flood a server with messages, emoji, ping spam, or disruptive media.</li>
					<li><strong>Scams & Phishing:</strong> Distributing malicious links, fake login pages, crypto schemes, or attempting to compromise authentication tokens.</li>
					<li><strong>Automated Spam:</strong> Running unapproved self-bots or automated scripts to mass-DM users or spam invite links.</li>
				</ul>
			</section>

			<section id="enforcement" className={styles.section}>
				<h2 className={styles.sectionTitle}>7. Reporting & Enforcement</h2>
				<p className={styles.paragraph}>
					If you encounter content or conduct that violates these Guidelines:
				</p>
				<ul className={styles.list}>
					<li><strong>In-App Report:</strong> Use the built-in report option on messages, channels, or user profiles.</li>
					<li><strong>Contact Staff:</strong> Reach out to server moderators or contact Nexoria Development staff directly via <a href="mailto:support@nexoriadevelopment.com" className={styles.tocLink}>support@nexoriadevelopment.com</a>.</li>
				</ul>
				<p className={styles.paragraph}>
					Enforcement actions are assessed based on severity and context, ranging from formal warnings and temporary mutes to permanent platform-wide bans and IP restrictions.
				</p>
			</section>
		</PublicPageLayout>
	);
});
