// SPDX-License-Identifier: AGPL-3.0-or-later

import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import {observer} from 'mobx-react-lite';
import type React from 'react';

export const SecurityPage: React.FC = observer(() => {
	return (
		<PublicPageLayout title="Security & Vulnerability Reporting" dataFlx="app.public-pages.security">
			<div className={styles.header}>
				<div className={styles.badge}>Security Policy</div>
				<h1 className={styles.title}>ND Chat Security & Vulnerability Reporting</h1>
				<p className={styles.subtitle}>
					Nexoria Development is committed to the security, privacy, and integrity of ND Chat. We value the contributions of security researchers and community members who help protect our users.
				</p>
				<div className={styles.meta}>
					<span>Program: Responsible Vulnerability Disclosure</span>
					<span>Scope: ND Chat Infrastructure & Applications</span>
				</div>
			</div>

			<div className={styles.tocCard}>
				<div className={styles.tocTitle}>Security Sections</div>
				<ul className={styles.tocList}>
					<li><a href="#reporting" className={styles.tocLink}>1. Reporting a Vulnerability</a></li>
					<li><a href="#scope" className={styles.tocLink}>2. Program Scope</a></li>
					<li><a href="#safe-harbor" className={styles.tocLink}>3. Safe Harbor Commitment</a></li>
					<li><a href="#testing-rules" className={styles.tocLink}>4. Safe Testing Rules</a></li>
					<li><a href="#process" className={styles.tocLink}>5. What to Expect After Reporting</a></li>
				</ul>
			</div>

			<section id="reporting" className={styles.section}>
				<h2 className={styles.sectionTitle}>1. Reporting a Vulnerability</h2>
				<p className={styles.paragraph}>
					If you have identified a security vulnerability, flaw, or potential exploit affecting ND Chat, please disclose it to us responsibly before sharing it publicly.
				</p>
				<div className={styles.callout}>
					<strong>Direct Security Contact:</strong> Send vulnerability reports directly to{' '}
					<a href="mailto:security@nexoriadevelopment.com" className={styles.tocLink}>security@nexoriadevelopment.com</a>.
				</div>
				<p className={styles.paragraph}>Please include in your report:</p>
				<ul className={styles.list}>
					<li>A clear description of the vulnerability and its potential impact.</li>
					<li>Step-by-step reproduction instructions or a minimal proof of concept (PoC).</li>
					<li>Affected endpoints, components, or client versions.</li>
					<li>Any remediation suggestions or patches if available.</li>
				</ul>
			</section>

			<section id="scope" className={styles.section}>
				<h2 className={styles.sectionTitle}>2. Program Scope</h2>
				<h3 className={styles.subTitle}>In-Scope Targets</h3>
				<ul className={styles.list}>
					<li>ND Chat Web Application: <code style={{color: '#9aa5ff'}}>chat.nexoriadevelopment.com</code></li>
					<li>ND Chat Official REST APIs, WebSocket Gateways, and App Proxy services</li>
					<li>Official ND Chat Desktop Client binaries (Windows, macOS, Linux)</li>
					<li>Core backend authentication and session management</li>
				</ul>

				<h3 className={styles.subTitle}>Out-of-Scope Activities</h3>
				<ul className={styles.list}>
					<li>Volumetric Denial-of-Service (DoS/DDoS) attacks against our servers or network.</li>
					<li>Social engineering, phishing, or physical attacks against Nexoria Development staff or users.</li>
					<li>Spamming contact forms or automated mass email flooding.</li>
					<li>Self-exploitation or attacks that require physical access to an unlocked device.</li>
				</ul>
			</section>

			<section id="safe-harbor" className={styles.section}>
				<h2 className={styles.sectionTitle}>3. Safe Harbor Commitment</h2>
				<p className={styles.paragraph}>
					We consider security research conducted in accordance with this policy to be authorized. If you discover a vulnerability and make a good-faith effort to report it without compromising user data or disrupting systems:
				</p>
				<ul className={styles.list}>
					<li>We will not pursue civil or criminal legal action against you.</li>
					<li>We will collaborate with you in good faith to understand and validate the report.</li>
					<li>We will keep you updated as the issue is resolved.</li>
				</ul>
			</section>

			<section id="testing-rules" className={styles.section}>
				<h2 className={styles.sectionTitle}>4. Safe Testing Guidelines</h2>
				<p className={styles.paragraph}>When testing for vulnerabilities, you must:</p>
				<ul className={styles.list}>
					<li>Only use your own test accounts or accounts created specifically for research.</li>
					<li>Never view, modify, extract, or delete data belonging to other users.</li>
					<li>Stop testing immediately if you discover sensitive user data and report it to us without further extraction.</li>
					<li>Avoid intentional disruption of service or degradation of user experience.</li>
				</ul>
			</section>

			<section id="process" className={styles.section}>
				<h2 className={styles.sectionTitle}>5. What to Expect After Reporting</h2>
				<p className={styles.paragraph}>
					Upon receiving your report, our security team will:
				</p>
				<ul className={styles.list}>
					<li>Acknowledge receipt within 48 hours.</li>
					<li>Assess and validate the findings and determine priority severity.</li>
					<li>Deploy a patch to production and invite you to verify the fix.</li>
					<li>Publicly credit your contribution in release notes (if you wish to be credited).</li>
				</ul>
			</section>
		</PublicPageLayout>
	);
});
