// SPDX-License-Identifier: AGPL-3.0-or-later

import {Routes} from '@app/app/Routes';
import Authentication from '@app/features/auth/state/Authentication';
import {Link} from '@app/features/platform/components/router/RouterReact';
import styles from '@app/features/public_pages/HomePage.module.css';
import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import {observer} from 'mobx-react-lite';
import type React from 'react';

export const HomePage: React.FC = observer(() => {
	const isAuthenticated = Authentication.isAuthenticated;

	return (
		<PublicPageLayout title="Nexiora Chat | Modern Voice & Community Platform" wide>
			{/* Hero Section */}
			<section className={styles.hero}>
				<div className={styles.heroGlow} />
				<div className={styles.badge}>
					<span>✦</span> Official Platform of Nexoria Development
				</div>
				<h1 className={styles.heroTitle}>
					Connect, Talk, &amp; Hang Out <br />
					<span className={styles.heroGradientText}>Built for Modern Communities</span>
				</h1>
				<p className={styles.heroSubtitle}>
					Nexiora Chat delivers ultra-low latency voice channels, crystal-clear audio,
					and fluid real-time messaging for gaming guilds, developer teams, and friends.
				</p>
				<div className={styles.heroActions}>
					{isAuthenticated ? (
						<Link to={Routes.ME} className={styles.btnPrimary}>
							Open ND Chat &rarr;
						</Link>
					) : (
						<>
							<Link to={Routes.REGISTER} className={styles.btnPrimary}>
								Get Started Free &rarr;
							</Link>
							<Link to={Routes.LOGIN} className={styles.btnSecondary}>
								Log In to Web App
							</Link>
						</>
					)}
					<a
						href="https://chat.nexoriadevelopment.com/invite/nexoiradev"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.btnSecondary}
					>
						Join Official Server ⚡
					</a>
				</div>
			</section>

			{/* Stats / Highlight Strip */}
			<div className={styles.statsBar}>
				<div className={styles.statItem}>
					<span className={styles.statValue}>128kbps Opus</span>
					<span className={styles.statLabel}>High-Fidelity Low-Latency Voice</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>Real-Time</span>
					<span className={styles.statLabel}>WebSocket Message &amp; Voice Engine</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>Privacy First</span>
					<span className={styles.statLabel}>Independent &amp; Secure Architecture</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>Unlimited</span>
					<span className={styles.statLabel}>Custom Channels, Roles, &amp; Perms</span>
				</div>
			</div>

			{/* Features Section */}
			<section>
				<div className={styles.sectionHeader}>
					<div className={styles.sectionPretitle}>Features</div>
					<h2 className={styles.sectionTitle}>Everything You Need to Connect</h2>
					<p className={styles.sectionSubtitle}>
						Built from the ground up for performance, simplicity, and complete digital ownership.
					</p>
				</div>

				<div className={styles.featuresGrid}>
					<div className={styles.featureCard}>
						<div className={styles.featureIcon}>🎙️</div>
						<h3 className={styles.featureTitle}>Crystal-Clear Voice &amp; Video</h3>
						<p className={styles.featureDesc}>
							Jump into channels with seamless screen sharing, background noise suppression,
							and adaptive bitrates powered by modern WebRTC.
						</p>
					</div>

					<div className={styles.featureCard}>
						<div className={styles.featureIcon}>💬</div>
						<h3 className={styles.featureTitle}>Modern Real-Time Messaging</h3>
						<p className={styles.featureDesc}>
							Express yourself with full Markdown formatting, code syntax highlighting, custom emoji,
							animated reactions, spoilers, and media sharing.
						</p>
					</div>

					<div className={styles.featureCard}>
						<div className={styles.featureIcon}>🛡️</div>
						<h3 className={styles.featureTitle}>Granular Server Management</h3>
						<p className={styles.featureDesc}>
							Set up detailed role hierarchies, channel-specific permissions, audit logging,
							and moderation tools to keep your community safe.
						</p>
					</div>

					<div className={styles.featureCard}>
						<div className={styles.featureIcon}>⚡</div>
						<h3 className={styles.featureTitle}>Fast &amp; Resource Efficient</h3>
						<p className={styles.featureDesc}>
							Powered by an edge-optimized Rust proxy and lightweight web shell with zero bloat,
							ensuring instant page loads and minimal memory use.
						</p>
					</div>
				</div>
			</section>

			{/* Community Banner */}
			<section className={styles.communityBanner}>
				<div className={styles.communityInfo}>
					<h2 className={styles.communityTitle}>Join the Nexoria Development Community</h2>
					<p className={styles.communityDesc}>
						Hang out with our developers, test early beta features, submit feedback,
						and connect with other developers and gamers on our official ND Chat server.
					</p>
				</div>
				<a
					href="https://chat.nexoriadevelopment.com/invite/nexoiradev"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.btnPrimary}
				>
					Join Official Server &rarr;
				</a>
			</section>

			{/* Final CTA */}
			<section className={styles.ctaSection}>
				<h2 className={styles.ctaTitle}>Ready to Experience Nexiora Chat?</h2>
				<p className={styles.ctaSubtitle}>
					Join today and experience modern community communication built for you.
				</p>
				<div className={styles.heroActions}>
					{isAuthenticated ? (
						<Link to={Routes.ME} className={styles.btnPrimary}>
							Open App &rarr;
						</Link>
					) : (
						<>
							<Link to={Routes.REGISTER} className={styles.btnPrimary}>
								Create Free Account &rarr;
							</Link>
							<Link to={Routes.LOGIN} className={styles.btnSecondary}>
								Sign In
							</Link>
						</>
					)}
					<Link to={Routes.CAREERS} className={styles.btnSecondary}>
						View Careers
					</Link>
				</div>
			</section>
		</PublicPageLayout>
	);
});
