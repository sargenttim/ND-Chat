// SPDX-License-Identifier: AGPL-3.0-or-later

import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import {observer} from 'mobx-react-lite';
import type React from 'react';

export const TermsPage: React.FC = observer(() => {
	return (
		<PublicPageLayout title="Terms of Service" dataFlx="app.public-pages.terms">
			<div className={styles.header}>
				<div className={styles.badge}>Legal & Agreement</div>
				<h1 className={styles.title}>ND Chat Terms of Service</h1>
				<p className={styles.subtitle}>
					Please read these terms carefully before accessing or using ND Chat. By using our service, you agree to be bound by this agreement.
				</p>
				<div className={styles.meta}>
					<span>Effective Date: October 15, 2026</span>
					<span>Provider: Nexoria Development</span>
				</div>
			</div>

			<div className={styles.tocCard}>
				<div className={styles.tocTitle}>Table of Contents</div>
				<ul className={styles.tocList}>
					<li><a href="#eligibility" className={styles.tocLink}>1. Eligibility & Accounts</a></li>
					<li><a href="#acceptable-use" className={styles.tocLink}>2. Acceptable Use & Conduct</a></li>
					<li><a href="#content-ownership" className={styles.tocLink}>3. Your Content & Licenses</a></li>
					<li><a href="#moderation" className={styles.tocLink}>4. Moderation & Termination</a></li>
					<li><a href="#availability" className={styles.tocLink}>5. Availability & Changes</a></li>
					<li><a href="#liability" className={styles.tocLink}>6. Disclaimers & Liability</a></li>
					<li><a href="#contact" className={styles.tocLink}>7. Contact & Support</a></li>
				</ul>
			</div>

			<section id="eligibility" className={styles.section}>
				<h2 className={styles.sectionTitle}>1. Agreement and Eligibility</h2>
				<p className={styles.paragraph}>
					These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of ND Chat, including our web client, desktop applications, APIs, and associated services operated by Nexoria Development (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
				</p>
				<p className={styles.paragraph}>
					By creating an account, downloading our software, or accessing the ND Chat platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Community Guidelines.
				</p>
				<div className={styles.callout}>
					<strong>Age Requirement:</strong> You must be at least 13 years old (or the minimum legal age required in your jurisdiction) to create an account or use ND Chat. If you are under the age of majority in your jurisdiction, you must have the consent of a parent or legal guardian.
				</div>
			</section>

			<section id="acceptable-use" className={styles.section}>
				<h2 className={styles.sectionTitle}>2. Your Account and Acceptable Use</h2>
				<p className={styles.paragraph}>
					When registering for an ND Chat account, you agree to provide accurate and complete information. You are solely responsible for safeguarding your login credentials and for all activities that occur under your account.
				</p>
				<h3 className={styles.subTitle}>Prohibited Activities</h3>
				<p className={styles.paragraph}>You agree not to engage in any of the following activities on ND Chat:</p>
				<ul className={styles.list}>
					<li>Violating any applicable local, national, or international laws or regulations.</li>
					<li>Distributing malicious software, viruses, token grabbers, spyware, or phishing links.</li>
					<li>Attempting unauthorized access to servers, user accounts, databases, or infrastructure.</li>
					<li>Sending automated spam, unsolicited commercial advertisements, or bulk bot messages.</li>
					<li>Interfering with, disrupting, or launching denial-of-service (DoS/DDoS) attacks against the platform.</li>
					<li>Harassing, threatening, stalking, or doxxing any user or staff member.</li>
				</ul>
			</section>

			<section id="content-ownership" className={styles.section}>
				<h2 className={styles.sectionTitle}>3. Your Content and Licenses</h2>
				<p className={styles.paragraph}>
					You retain ownership of all messages, text, media, files, audio, and images that you upload or transmit through ND Chat (&ldquo;User Content&rdquo;). We do not claim ownership of your content.
				</p>
				<p className={styles.paragraph}>
					By posting or submitting content on ND Chat, you grant Nexoria Development a non-exclusive, worldwide, royalty-free license to store, transmit, format, cache, and display your content solely for the purpose of operating, developing, and providing the ND Chat communication service to you and other users you choose to communicate with.
				</p>
				<div className={styles.callout}>
					You represent and warrant that you own or have obtained all necessary rights, licenses, and consents for any content you transmit on ND Chat, and that such content does not infringe on the intellectual property or privacy rights of any third party.
				</div>
			</section>

			<section id="moderation" className={styles.section}>
				<h2 className={styles.sectionTitle}>4. Moderation, Enforcement, and Termination</h2>
				<p className={styles.paragraph}>
					To maintain a safe and welcoming environment, Nexoria Development and designated community moderators reserve the right, but not the obligation, to monitor, review, remove, or restrict access to any content or server that violates these Terms or our Community Guidelines.
				</p>
				<p className={styles.paragraph}>
					We may issue warnings, temporarily suspend accounts, permanently ban accounts, or terminate servers without prior notice in instances of severe violations, illegal conduct, or repeated non-compliance.
				</p>
				<p className={styles.paragraph}>
					You may delete your ND Chat account at any time through your User Account Settings. Upon deletion, your personal account details will be removed in accordance with our Privacy Policy.
				</p>
			</section>

			<section id="availability" className={styles.section}>
				<h2 className={styles.sectionTitle}>5. Availability and Service Changes</h2>
				<p className={styles.paragraph}>
					We strive to keep ND Chat fast, reliable, and continuously available. However, we cannot guarantee uninterrupted service. The platform may experience periodic downtime for maintenance, system updates, or technical failures beyond our reasonable control.
				</p>
				<p className={styles.paragraph}>
					We reserve the right to modify, update, enhance, or discontinue any features or parts of ND Chat at any time with or without notice.
				</p>
			</section>

			<section id="liability" className={styles.section}>
				<h2 className={styles.sectionTitle}>6. Disclaimers and Limitation of Liability</h2>
				<div className={styles.calloutWarning}>
					ND Chat and all related services are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.
				</div>
				<p className={styles.paragraph}>
					To the maximum extent permitted by applicable law, Nexoria Development, its owners, developers, contributors, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, goodwill, or communications resulting from your use of or inability to use the service.
				</p>
			</section>

			<section id="contact" className={styles.section}>
				<h2 className={styles.sectionTitle}>7. Contact and Inquiries</h2>
				<p className={styles.paragraph}>
					If you have questions regarding these Terms of Service or wish to report a violation, please contact us through:
				</p>
				<ul className={styles.list}>
					<li>Email: <a href="mailto:support@nexoriadevelopment.com" className={styles.tocLink}>support@nexoriadevelopment.com</a></li>
					<li>Our official Nexoria Development Discord or in-app support channels.</li>
				</ul>
			</section>
		</PublicPageLayout>
	);
});
