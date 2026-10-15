// SPDX-License-Identifier: AGPL-3.0-or-later

import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import {observer} from 'mobx-react-lite';
import type React from 'react';

export const PrivacyPage: React.FC = observer(() => {
	return (
		<PublicPageLayout title="Privacy Policy" dataFlx="app.public-pages.privacy">
			<div className={styles.header}>
				<div className={styles.badge}>Privacy & Security</div>
				<h1 className={styles.title}>ND Chat Privacy Policy</h1>
				<p className={styles.subtitle}>
					Your privacy is fundamental to our platform. This policy explains what information we collect, how it is stored, and how your data is protected on ND Chat.
				</p>
				<div className={styles.meta}>
					<span>Last Updated: October 15, 2026</span>
					<span>Provider: Nexoria Development</span>
				</div>
			</div>

			<div className={styles.tocCard}>
				<div className={styles.tocTitle}>Table of Contents</div>
				<ul className={styles.tocList}>
					<li><a href="#info-we-collect" className={styles.tocLink}>1. Information We Collect</a></li>
					<li><a href="#how-we-use-info" className={styles.tocLink}>2. How We Use Information</a></li>
					<li><a href="#data-security" className={styles.tocLink}>3. Data Security & Storage</a></li>
					<li><a href="#sharing" className={styles.tocLink}>4. Information Sharing & Third Parties</a></li>
					<li><a href="#controls" className={styles.tocLink}>5. Your Controls & Data Deletion</a></li>
					<li><a href="#minors" className={styles.tocLink}>6. Children and Minors</a></li>
					<li><a href="#contact" className={styles.tocLink}>7. Contacting Us</a></li>
				</ul>
			</div>

			<section id="info-we-collect" className={styles.section}>
				<h2 className={styles.sectionTitle}>1. Information We Collect</h2>
				<p className={styles.paragraph}>
					We only collect data necessary to provide you with a high-performance, secure messaging and voice chat experience:
				</p>
				<h3 className={styles.subTitle}>Account Information</h3>
				<ul className={styles.list}>
					<li><strong>Account Identifiers:</strong> Username, display name, user ID (snowflake), and optional profile biography or pronouns.</li>
					<li><strong>Email Address:</strong> Used for account verification, password resets, and critical account security notices.</li>
					<li><strong>Credentials:</strong> Passwords are cryptographically salted and hashed using modern memory-hard hashing algorithms (such as Argon2id). We never store or transmit your plaintext password.</li>
				</ul>

				<h3 className={styles.subTitle}>Content and Communications</h3>
				<ul className={styles.list}>
					<li><strong>Messages and Media:</strong> Text messages, reactions, voice recordings, attachments, and files you transmit through channels and direct messages.</li>
					<li><strong>Guild & Relationship Data:</strong> Servers you own or join, channel permissions, roles, and friend lists.</li>
				</ul>

				<h3 className={styles.subTitle}>Technical and Diagnostic Data</h3>
				<ul className={styles.list}>
					<li><strong>Connection Data:</strong> IP addresses (collected temporarily for DDoS defense, rate-limiting, and geolocation restriction checks).</li>
					<li><strong>Session Information:</strong> Device type, browser user-agent, operating system version, and session authorization tokens.</li>
				</ul>
			</section>

			<section id="how-we-use-info" className={styles.section}>
				<h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
				<p className={styles.paragraph}>We use the collected information solely for the following purposes:</p>
				<ul className={styles.list}>
					<li>To operate, route, and deliver instant messages, media attachments, and real-time voice and video streams.</li>
					<li>To authenticate your identity, secure your account, and prevent unauthorized takeovers.</li>
					<li>To enforce our Community Guidelines and Terms of Service, mitigate spam, and investigate reports of illegal behavior.</li>
					<li>To analyze platform uptime, diagnose server crashes, and optimize streaming latency.</li>
				</ul>
				<div className={styles.callout}>
					<strong>We do not sell your data.</strong> Nexoria Development does not sell, rent, monetize, or broker personal user data, chat transcripts, or contact lists to advertising agencies or data aggregators.
				</div>
			</section>

			<section id="data-security" className={styles.section}>
				<h2 className={styles.sectionTitle}>3. Data Security & Storage</h2>
				<p className={styles.paragraph}>
					We employ rigorous technical and organizational safeguards to protect your personal information:
				</p>
				<ul className={styles.list}>
					<li><strong>Encryption in Transit:</strong> All communications between your client (web or desktop) and our servers are encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS / WSS).</li>
					<li><strong>Media Proxying:</strong> External media links, embeds, and unfurls are routed through our secure media proxy to prevent third-party websites from logging your IP address when viewing images.</li>
					<li><strong>Access Controls:</strong> Server databases and production environments are protected by strict role-based access, multi-factor authentication, and firewalls.</li>
				</ul>
			</section>

			<section id="sharing" className={styles.section}>
				<h2 className={styles.sectionTitle}>4. Information Sharing & Third Parties</h2>
				<p className={styles.paragraph}>
					Your information is shared only under the following limited circumstances:
				</p>
				<ul className={styles.list}>
					<li><strong>Other Users:</strong> When you send a message, join a voice channel, or participate in a server, your display profile and content are accessible to members with permission to view that channel.</li>
					<li><strong>Infrastructure Providers:</strong> Trusted hosting, database, and content delivery network (CDN) providers acting strictly as data processors under our direction.</li>
					<li><strong>Legal Obligations:</strong> When legally compelled by enforceable court orders, subpoenas, or to prevent imminent physical harm or severe child exploitation.</li>
				</ul>
			</section>

			<section id="controls" className={styles.section}>
				<h2 className={styles.sectionTitle}>5. Your Controls & Data Deletion</h2>
				<p className={styles.paragraph}>
					You have full control over your personal data on ND Chat:
				</p>
				<ul className={styles.list}>
					<li><strong>Message Deletion:</strong> You can edit or delete your messages at any time. When deleted, messages are removed from live channel views and cleared from cache.</li>
					<li><strong>Account Deletion:</strong> You may permanently delete your account through User Settings &rarr; My Account. Once initiated, your profile data, email, and authentication tokens are irrevocably purged.</li>
					<li><strong>Data Portability:</strong> You can request a copy of your personal account data by submitting a request to our privacy team.</li>
				</ul>
			</section>

			<section id="minors" className={styles.section}>
				<h2 className={styles.sectionTitle}>6. Children and Minors</h2>
				<p className={styles.paragraph}>
					ND Chat is not directed toward children under 13 years of age. We do not knowingly collect personal information from individuals under 13 (or under the applicable age of digital consent in your jurisdiction). If we learn that an account belongs to a user under the minimum age, we will terminate the account and delete the associated data.
				</p>
			</section>

			<section id="contact" className={styles.section}>
				<h2 className={styles.sectionTitle}>7. Contacting Us</h2>
				<p className={styles.paragraph}>
					If you have questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our Data Protection lead:
				</p>
				<ul className={styles.list}>
					<li>Email: <a href="mailto:privacy@nexoriadevelopment.com" className={styles.tocLink}>privacy@nexoriadevelopment.com</a></li>
					<li>General Support: <a href="mailto:support@nexoriadevelopment.com" className={styles.tocLink}>support@nexoriadevelopment.com</a></li>
				</ul>
			</section>
		</PublicPageLayout>
	);
});
