// SPDX-License-Identifier: AGPL-3.0-or-later

import {Routes} from '@app/app/Routes';
import Authentication from '@app/features/auth/state/Authentication';
import {Link, useLocation} from '@app/features/platform/components/router/RouterReact';
import styles from '@app/features/public_pages/PublicPageLayout.module.css';
import {FluxerIcon} from '@app/features/ui/components/icons/FluxerIcon';
import {useFluxerDocumentTitle} from '@app/features/window/hooks/useFluxerDocumentTitle';
import clsx from 'clsx';
import {observer} from 'mobx-react-lite';
import type React from 'react';
import {type ReactNode, useEffect} from 'react';

export interface PublicPageLayoutProps {
	title: string;
	children: ReactNode;
	dataFlx?: string;
	wide?: boolean;
}

export const PublicPageLayout: React.FC<PublicPageLayoutProps> = observer(({
	title,
	children,
	dataFlx,
	wide,
}) => {
	useFluxerDocumentTitle(`${title} | ND Chat`);
	const location = useLocation();
	const isAuthenticated = Authentication.isAuthenticated;

	useEffect(() => {
		document.documentElement.classList.add('auth-page');
		return () => {
			document.documentElement.classList.remove('auth-page');
		};
	}, []);

	const navItems = [
		{label: 'Terms', path: Routes.TERMS},
		{label: 'Privacy', path: Routes.PRIVACY},
		{label: 'Guidelines', path: Routes.GUIDELINES},
		{label: 'Security', path: Routes.SECURITY},
		{label: 'Careers', path: Routes.CAREERS},
	];

	return (
		<div className={styles.container} data-flx={dataFlx ?? 'app.public-page.layout'}>
			<header className={styles.nav}>
				<div className={styles.navInner}>
					<Link to={Routes.HOME} className={styles.brandLink}>
						<FluxerIcon className={styles.brandIcon} />
						<span className={styles.brandWordmark}>ND Chat</span>
					</Link>

					<nav className={styles.navLinks} aria-label="Policy navigation">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={clsx(
									styles.navItem,
									location.pathname === item.path && styles.navItemActive,
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className={styles.navActions}>
						{isAuthenticated ? (
							<Link to={Routes.ME} className={clsx(styles.actionBtn, styles.actionBtnPrimary)}>
								Open App
							</Link>
						) : (
							<>
								<Link to={Routes.LOGIN} className={clsx(styles.actionBtn, styles.actionBtnSecondary)}>
									Log In
								</Link>
								<Link to={Routes.REGISTER} className={clsx(styles.actionBtn, styles.actionBtnPrimary)}>
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			</header>

			<main className={clsx(styles.main, wide && styles.mainWide)}>{children}</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<div className={styles.footerGrid}>
						<div className={styles.footerBrand}>
							<Link to={Routes.HOME} className={styles.brandLink}>
								<FluxerIcon className={styles.brandIcon} />
								<span className={styles.brandWordmark}>ND Chat</span>
							</Link>
							<p className={styles.footerBrandDesc}>
								Official high-speed voice and text communication platform built for gaming, developers, and communities by Nexoria Development.
							</p>
						</div>

						<div className={styles.footerCol}>
							<span className={styles.footerColTitle}>Policies & Legal</span>
							<Link to={Routes.TERMS} className={styles.footerLink}>Terms of Service</Link>
							<Link to={Routes.PRIVACY} className={styles.footerLink}>Privacy Policy</Link>
							<Link to={Routes.GUIDELINES} className={styles.footerLink}>Community Guidelines</Link>
							<Link to={Routes.SECURITY} className={styles.footerLink}>Security & Vulnerability</Link>
						</div>

						<div className={styles.footerCol}>
							<span className={styles.footerColTitle}>Nexoria</span>
							<Link to={Routes.CAREERS} className={styles.footerLink}>Careers & Staff</Link>
							<a href="https://nexoriadevelopment.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Main Portal</a>
							<a href="https://chat.nexoriadevelopment.com/invite/nexoiradev" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>ND Chat Community</a>
							<a href="https://discord.gg/nexoria" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Discord Server</a>
							<a href="https://github.com/nexiorachat/ndchat" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
						</div>
					</div>

					<div className={styles.footerBottom}>
						<span>&copy; {new Date().getFullYear()} Nexoria Development. All rights reserved.</span>
						<span>Powered by ND Chat Engine</span>
					</div>
				</div>
			</footer>
		</div>
	);
});
