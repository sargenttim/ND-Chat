// SPDX-License-Identifier: AGPL-3.0-or-later

import {Routes} from '@app/app/Routes';
import Authentication from '@app/features/auth/state/Authentication';
import {Link} from '@app/features/platform/components/router/RouterReact';
import styles from '@app/features/public_pages/DownloadPage.module.css';
import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import {observer} from 'mobx-react-lite';
import type React from 'react';

// Default direct download URL hosted on the instance, with GitHub release fallback
const WINDOWS_DIRECT_DOWNLOAD_URL = '/downloads/NDChat-Setup.exe';
const GITHUB_RELEASES_URL = 'https://github.com/nexiorachat/ndchat/releases';

export const DownloadPage: React.FC = observer(() => {
	const isAuthenticated = Authentication.isAuthenticated;

	return (
		<PublicPageLayout title="Download Nexiora Chat" wide>
			{/* Hero Section */}
			<section className={styles.hero}>
				<div className={styles.heroGlow} />
				<div className={styles.badge}>
					<span>⚡</span> Official Desktop &amp; Mobile Clients
				</div>
				<h1 className={styles.heroTitle}>
					Experience ND Chat <br />
					<span className={styles.heroGradientText}>On Every Screen You Use</span>
				</h1>
				<p className={styles.heroSubtitle}>
					Enjoy native high-fidelity Opus voice, hardware-accelerated screen capture,
					system tray notifications, and buttery-smooth messaging with our standalone desktop app.
				</p>

				{/* Featured Windows Card */}
				<div className={styles.featuredCard}>
					<div className={styles.featuredHeader}>
						<div className={styles.platformIconBig}>🪟</div>
						<h2 className={styles.featuredTitle}>Nexiora Chat for Windows</h2>
						<span className={styles.featuredMeta}>Windows 10 &amp; 11 (64-bit) &bull; Standalone Installer</span>
					</div>

					<div className={styles.featuredActions}>
						<a
							href={WINDOWS_DIRECT_DOWNLOAD_URL}
							download="NDChat-Setup.exe"
							className={styles.btnDownloadBig}
						>
							Download for Windows (.exe) &darr;
						</a>
						<span className={styles.btnSubtext}>
							Digitally signed by Nexoria Development &bull; Free code signing provided by{' '}
							<a href="https://signpath.io" target="_blank" rel="noopener noreferrer" style={{color: '#a5b4fc', textDecoration: 'underline'}}>SignPath.io</a>, certificate by{' '}
							<a href="https://signpath.org" target="_blank" rel="noopener noreferrer" style={{color: '#a5b4fc', textDecoration: 'underline'}}>SignPath Foundation</a>
						</span>
					</div>

					<div className={styles.featuredPerks}>
						<div className={styles.perkItem}>
							<span className={styles.perkCheck}>✓</span> Ultra-low latency Opus voice engine
						</div>
						<div className={styles.perkItem}>
							<span className={styles.perkCheck}>✓</span> 60 FPS system screen share &amp; audio
						</div>
						<div className={styles.perkItem}>
							<span className={styles.perkCheck}>✓</span> Background system tray &amp; push alerts
						</div>
						<div className={styles.perkItem}>
							<span className={styles.perkCheck}>✓</span> Lightweight memory &amp; CPU footprint
						</div>
					</div>
				</div>
			</section>

			{/* Other Platforms Section */}
			<section>
				<div className={styles.sectionHeader}>
					<div className={styles.sectionPretitle}>Platforms</div>
					<h2 className={styles.sectionTitle}>Available Across Your Ecosystem</h2>
				</div>

				<div className={styles.platformsGrid}>
					{/* Web App */}
					<div className={styles.platformCard}>
						<div className={styles.platformIcon}>🌐</div>
						<h3 className={styles.platformName}>Web App</h3>
						<p className={styles.platformDesc}>
							No install needed. Run ND Chat instantly in Chrome, Firefox, Edge, or Safari with full voice and chat support.
						</p>
						<Link
							to={isAuthenticated ? Routes.ME : Routes.LOGIN}
							className={styles.btnSecondary}
						>
							Open Web App &rarr;
						</Link>
					</div>

					{/* macOS */}
					<div className={styles.platformCard}>
						<div className={styles.platformIcon}>🍎</div>
						<h3 className={styles.platformName}>macOS</h3>
						<p className={styles.platformDesc}>
							Native Apple Silicon (M1/M2/M3/M4) &amp; Intel builds for macOS Monterey, Ventura, Sonoma, and Sequoia.
						</p>
						<span className={styles.badgeComingSoon}>In Development / Coming Soon</span>
					</div>

					{/* Linux */}
					<div className={styles.platformCard}>
						<div className={styles.platformIcon}>🐧</div>
						<h3 className={styles.platformName}>Linux</h3>
						<p className={styles.platformDesc}>
							Native Linux desktop packages with PipeWire &amp; PulseAudio capture (.deb, .rpm, .AppImage).
						</p>
						<span className={styles.badgeComingSoon}>In Development / Coming Soon</span>
					</div>

					{/* Mobile PWA */}
					<div className={styles.platformCard}>
						<div className={styles.platformIcon}>📱</div>
						<h3 className={styles.platformName}>Mobile (iOS &amp; Android)</h3>
						<p className={styles.platformDesc}>
							Install our progressive mobile web app with push notifications directly to your phone&apos;s home screen.
						</p>
						<Link to={Routes.HOME} className={styles.btnSecondary}>
							Install Mobile PWA
						</Link>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className={styles.faqSection}>
				<h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
				<div className={styles.faqGrid}>
					<div className={styles.faqItem}>
						<span className={styles.faqQuestion}>How do I install the Windows desktop app?</span>
						<span className={styles.faqAnswer}>
							Click the &quot;Download for Windows&quot; button above. Once the installer finishes downloading, run <code>NDChat-Setup.exe</code> and follow the quick one-click setup.
						</span>
					</div>
					<div className={styles.faqItem}>
						<span className={styles.faqQuestion}>Do I need an account to download?</span>
						<span className={styles.faqAnswer}>
							No! You can download the desktop app first and create your free Nexoria Chat account directly within the app or on the web.
						</span>
					</div>
					<div className={styles.faqItem}>
						<span className={styles.faqQuestion}>How do app updates work?</span>
						<span className={styles.faqAnswer}>
							The desktop app automatically checks for official releases in the background and prompts you to restart seamlessly whenever a new update is ready.
						</span>
					</div>
					<div className={styles.faqItem}>
						<span className={styles.faqQuestion}>How is the installer verified and signed?</span>
						<span className={styles.faqAnswer}>
							Windows binaries are digitally signed to protect integrity. Free code signing is provided by{' '}
							<a href="https://signpath.io" target="_blank" rel="noopener noreferrer" style={{color: '#818cf8', textDecoration: 'underline'}}>SignPath.io</a>, and the trusted certificate is issued by the{' '}
							<a href="https://signpath.org" target="_blank" rel="noopener noreferrer" style={{color: '#818cf8', textDecoration: 'underline'}}>SignPath Foundation</a>.
						</span>
					</div>
					<div className={styles.faqItem}>
						<span className={styles.faqQuestion}>Where can I find older releases or source code?</span>
						<span className={styles.faqAnswer}>
							All open-source builds, release notes, and commit history are publicly verifiable on our{' '}
							<a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" style={{color: '#818cf8', textDecoration: 'underline'}}>
								GitHub Releases page
							</a>.
						</span>
					</div>
				</div>
			</section>
		</PublicPageLayout>
	);
});
