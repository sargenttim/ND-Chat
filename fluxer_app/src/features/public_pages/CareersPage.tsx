// SPDX-License-Identifier: AGPL-3.0-or-later

import Authentication from '@app/features/auth/state/Authentication';
import DeveloperMode from '@app/features/devtools/state/DeveloperMode';
import RuntimeConfig from '@app/features/app/state/RuntimeConfig';
import {useLocation} from '@app/features/platform/components/router/RouterReact';
import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import Users from '@app/features/user/state/Users';
import {observer} from 'mobx-react-lite';
import type React from 'react';
import {useEffect, useState} from 'react';

interface JobOpening {
	id: string;
	title: string;
	department: string;
	type: string;
	tagClass: string;
	description: string;
	requirements: string[];
}

export const CareersPage: React.FC = observer(() => {
	const location = useLocation();
	const currentUser = Users.currentUser;
	const isStaffOrAdmin = Boolean(
		Authentication.isAuthenticated && (currentUser?.isStaff?.() || DeveloperMode.isDeveloper)
	);

	const snapshot = RuntimeConfig.getSnapshotOrNull();
	const historyUrl = (snapshot?.appPublic?.branding?.status_page_incident_history_url ?? '').toLowerCase().trim();
	const guidelinesUrl = (snapshot?.appPublic?.legal?.guidelines_url ?? '').toLowerCase().trim();
	const termsUrl = (snapshot?.appPublic?.legal?.terms_url ?? '').toLowerCase().trim();

	// Check if admin has enabled hiring globally via Admin Panel (/admin/instance-config)
	const isHiringGlobally =
		historyUrl === 'open' ||
		historyUrl === 'hiring' ||
		historyUrl === 'true' ||
		historyUrl.includes('hiring=true') ||
		historyUrl.includes('careers=open') ||
		guidelinesUrl.includes('hiring=true') ||
		guidelinesUrl.includes('careers=open') ||
		guidelinesUrl.includes('#hiring') ||
		termsUrl.includes('hiring=true') ||
		termsUrl.includes('careers=open');

	// Local preview override for staff to test open/closed appearance
	const [previewOverride, setPreviewOverride] = useState<boolean | null>(() => {
		const param = location.searchParams.get('hiring');
		if (param === 'true') return true;
		if (param === 'false') return false;
		return null;
	});

	// Support ?hiring=true or ?hiring=false in URL to quickly toggle/preview
	useEffect(() => {
		const param = location.searchParams.get('hiring');
		if (param === 'false') {
			setPreviewOverride(false);
		} else if (param === 'true') {
			setPreviewOverride(true);
		}
	}, [location.searchParams]);

	const isHiring = previewOverride !== null ? previewOverride : isHiringGlobally;

	const openings: JobOpening[] = [
		{
			id: 'community-manager',
			title: 'Community Manager',
			department: 'Community Operations',
			type: 'Staff Role',
			tagClass: styles.roleTagStaff,
			description: 'Lead engagement across our official ND Chat servers, coordinate community game nights, run events, and listen to feedback from our active members.',
			requirements: [
				'Experience managing active gaming or tech Discord/ND Chat servers',
				'Strong communication skills and welcoming, positive attitude',
				'Ability to organize events, tournaments, and announcements',
			],
		},
		{
			id: 'platform-moderator',
			title: 'Community Moderator',
			department: 'Trust & Safety',
			type: 'Staff Role',
			tagClass: styles.roleTagStaff,
			description: 'Help keep ND Chat spaces friendly and safe by reviewing in-app reports, moderating voice and text channels, and assisting new users.',
			requirements: [
				'Familiarity with ND Chat Community Guidelines and Terms',
				'Calm, impartial judgment during disputes or conflicts',
				'Active presence during peak community hours',
			],
		},
		{
			id: 'frontend-engineer',
			title: 'Frontend / UI Developer',
			department: 'Engineering',
			type: 'Contributor / Dev',
			tagClass: styles.roleTagDev,
			description: 'Contribute to ND Chat’s React, TypeScript, and CSS desktop and web client interfaces, implementing sleek animations, dark themes, and chat features.',
			requirements: [
				'Proficiency with modern React, TypeScript, and CSS Modules',
				'Eye for clean UI/UX details, typography, and responsive layouts',
				'Experience with Git and collaborative GitHub workflows',
			],
		},
		{
			id: 'backend-engineer',
			title: 'Backend / Infrastructure Engineer',
			department: 'Engineering',
			type: 'Contributor / Dev',
			tagClass: styles.roleTagDev,
			description: 'Scale our microservices, WebSocket gateway servers, media proxies, and Docker stack to handle growing real-time traffic seamlessly.',
			requirements: [
				'Experience with Elixir, Rust, or Node.js backend services',
				'Familiarity with PostgreSQL, Redis, and Docker / Docker Compose',
				'Understanding of real-time communication protocols (WebSocket, WebRTC)',
			],
		},
		{
			id: 'bot-developer',
			title: 'Bot & Integrations Specialist',
			department: 'Developer Ecosystem',
			type: 'Contributor / Dev',
			tagClass: styles.roleTagDev,
			description: 'Design official bots, interactive server integrations, Discord bridging tools, and webhook utilities for communities on ND Chat.',
			requirements: [
				'Experience building chat bots with modern APIs and webhooks',
				'Familiarity with slash commands and event-driven architecture',
				'Creativity for fun community tools, minigames, and integrations',
			],
		},
	];

	return (
		<PublicPageLayout title="Careers & Staff Openings" dataFlx="app.public-pages.careers">
			{/* Admin control bar visible only when logged into a verified staff/admin account */}
			{isStaffOrAdmin && (
				<div className={styles.adminBar}>
					<div className={styles.adminBarLeft}>
						<span className={styles.adminBadge}>Admin Mode</span>
						<span>
							Live Public Status: <strong>{isHiringGlobally ? '🟢 Actively Hiring' : '🔴 Applications Closed'}</strong>
							{previewOverride !== null && (
								<span style={{marginLeft: '0.6rem', opacity: 0.8, fontSize: '0.8rem'}}>
									(Previewing: {previewOverride ? 'Open' : 'Closed'})
								</span>
							)}
						</span>
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap'}}>
						<button
							type="button"
							onClick={() => setPreviewOverride((prev) => (prev === null ? !isHiringGlobally : null))}
							className={styles.adminToggleBtn}
						>
							{previewOverride !== null
								? 'Exit Preview'
								: isHiringGlobally
									? 'Preview Closed View'
									: 'Preview Open View'}
						</button>
						<a
							href="/admin/instance-config"
							className={styles.adminToggleBtn}
							style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center'}}
						>
							⚙️ Manage in Admin Panel
						</a>
					</div>
				</div>
			)}

			<div className={styles.header}>
				<div className={`${styles.badge} ${isHiring ? styles.badgeSuccess : styles.badgeClosed}`}>
					{isHiring ? 'Now Recruiting' : 'Applications Closed'}
				</div>
				<h1 className={styles.title}>Join the Nexoria Development Team</h1>
				<p className={styles.subtitle}>
					{isHiring
						? 'We are passionate about building modern, fast, and community-centered communication software. Explore our open roles and help shape the future of ND Chat!'
						: 'We are not currently hiring for open positions. Any future roles will be announced here, so please check back later!'}
				</p>
				<div className={styles.meta}>
					<span>Location: Remote / Global</span>
					<span>Organization: Nexoria Development</span>
				</div>
			</div>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>Why Join Us?</h2>
				<p className={styles.paragraph}>
					Nexoria Development is a dedicated team of builders, creators, and gamers passionate about bringing independence and innovation back to community chat. Whether you are helping moderate servers or writing code that thousands of daily users interact with, you will make an immediate, tangible impact.
				</p>
				<div className={styles.callout}>
					<strong>Perks & Culture:</strong> Collaborative environment, direct influence on product roadmaps, custom staff badges on ND Chat, and opportunities to build real-world open-source software.
				</div>
			</section>

			{isHiring ? (
				<>
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>Open Positions</h2>
						<p className={styles.paragraph}>
							Select an open role below to view details. We are actively accepting applications for all listed positions:
						</p>

						<div className={styles.cardGrid}>
							{openings.map((role) => (
								<div key={role.id} className={styles.card}>
									<div className={styles.cardHeader}>
										<h3 className={styles.cardTitle}>{role.title}</h3>
										<span className={`${styles.roleTag} ${role.tagClass}`}>{role.type}</span>
									</div>
									<p className={styles.cardDesc}>{role.description}</p>
									<div>
										<strong style={{fontSize: '0.825rem', color: '#fff', display: 'block', marginBottom: '0.35rem'}}>Key Requirements:</strong>
										<ul className={styles.list} style={{fontSize: '0.85rem', marginBottom: '0.75rem'}}>
											{role.requirements.map((req, idx) => (
												<li key={idx}>{req}</li>
											))}
										</ul>
									</div>
									<a
										href="https://discord.gg/nexoria"
										target="_blank"
										rel="noopener noreferrer"
										className={styles.applyButton}
									>
										Apply for this Role &rarr;
									</a>
								</div>
							))}
						</div>
					</section>

					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>How to Apply</h2>
						<p className={styles.paragraph}>
							Applying is quick and straightforward:
						</p>
						<ol className={styles.list}>
							<li>
								<strong>Via Discord:</strong> Join our official <a href="https://discord.gg/nexoria" target="_blank" rel="noopener noreferrer" className={styles.tocLink}>Nexoria Discord</a> and open a ticket in the <code>#apply-staff</code> or <code>#support</code> channel stating the role you are applying for.
							</li>
							<li>
								<strong>Via Email:</strong> Email your introduction, experience, and GitHub / portfolio link to{' '}
								<a href="mailto:careers@nexoriadevelopment.com" className={styles.tocLink}>careers@nexoriadevelopment.com</a>.
							</li>
							<li>
								<strong>Via ND Chat:</strong> Reach out directly to any Nexoria Development team member in our official ND Chat lounge.
							</li>
						</ol>
					</section>
				</>
			) : (
				<div className={styles.closedBox}>
					<h3 className={styles.closedTitle}>Applications Are Currently Closed</h3>
					<p className={styles.closedDesc}>
						Our staff and developer teams are currently at full capacity. We regularly open recruitment as ND Chat grows, so keep an eye on our announcements!
					</p>
					<a
						href="https://discord.gg/nexoria"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.applyButton}
					>
						Join Our Community Discord for Updates &rarr;
					</a>
				</div>
			)}
		</PublicPageLayout>
	);
});
