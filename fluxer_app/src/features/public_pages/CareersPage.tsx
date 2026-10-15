// SPDX-License-Identifier: AGPL-3.0-or-later

import {PublicPageLayout} from '@app/features/public_pages/PublicPageLayout';
import styles from '@app/features/public_pages/PublicPageStyles.module.css';
import {observer} from 'mobx-react-lite';
import type React from 'react';

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
			<div className={styles.header}>
				<div className={`${styles.badge} ${styles.badgeSuccess}`}>Now Recruiting</div>
				<h1 className={styles.title}>Join the Nexoria Development Team</h1>
				<p className={styles.subtitle}>
					We are passionate about building modern, fast, and community-centered communication software. Explore our open roles and help shape the future of ND Chat!
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
		</PublicPageLayout>
	);
});
