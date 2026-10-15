// SPDX-License-Identifier: AGPL-3.0-or-later

import {Routes} from '@app/app/Routes';
import {rootRoute} from '@app/app/router/routes/RootRoutes';
import {createNamedLoadableComponent} from '@app/features/platform/components/loadable/LoadableComponent';
import {createRoute} from '@app/features/platform/components/router/RouterBuilder';
import {Redirect} from '@app/features/platform/components/router/RouterTypes';

type PublicRouteComponentProps = Record<string, unknown>;

const TermsPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'TermsPage',
	load: async () => (await import('@app/features/public_pages/TermsPage')).TermsPage,
});

const PrivacyPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'PrivacyPage',
	load: async () => (await import('@app/features/public_pages/PrivacyPage')).PrivacyPage,
});

const GuidelinesPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'GuidelinesPage',
	load: async () => (await import('@app/features/public_pages/GuidelinesPage')).GuidelinesPage,
});

const SecurityPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'SecurityPage',
	load: async () => (await import('@app/features/public_pages/SecurityPage')).SecurityPage,
});

const CareersPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'CareersPage',
	load: async () => (await import('@app/features/public_pages/CareersPage')).CareersPage,
});

const DownloadPage = createNamedLoadableComponent<PublicRouteComponentProps>({
	displayName: 'DownloadPage',
	load: async () => (await import('@app/features/public_pages/DownloadPage')).DownloadPage,
});

export const termsRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'terms',
	path: Routes.TERMS,
	component: () => <TermsPage data-flx="app.public-routes.terms" />,
});

export const privacyRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'privacy',
	path: Routes.PRIVACY,
	component: () => <PrivacyPage data-flx="app.public-routes.privacy" />,
});

export const guidelinesRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'guidelines',
	path: Routes.GUIDELINES,
	component: () => <GuidelinesPage data-flx="app.public-routes.guidelines" />,
});

export const rulesRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'rules',
	path: Routes.RULES,
	onEnter: () => new Redirect(Routes.GUIDELINES),
});

export const securityRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'security',
	path: Routes.SECURITY,
	component: () => <SecurityPage data-flx="app.public-routes.security" />,
});

export const careersRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'careers',
	path: Routes.CAREERS,
	component: () => <CareersPage data-flx="app.public-routes.careers" />,
});

export const downloadRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'download',
	path: Routes.DOWNLOAD,
	component: () => <DownloadPage data-flx="app.public-routes.download" />,
});

export const publicRoutes = [
	termsRoute,
	privacyRoute,
	guidelinesRoute,
	rulesRoute,
	securityRoute,
	careersRoute,
	downloadRoute,
];
