// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages project site: https://moronim.github.io/firewall-policy-book/
// When a custom domain is added, set SITE to it and BASE to '/'.
const SITE = 'https://moronim.github.io';
const BASE = '/firewall-policy-book';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	integrations: [
		starlight({
			title: 'Firewall Policy Management',
			description:
				'Companion site for Firewall Policy Management in Modern Security Operations by Maurizio Moroni: templates, checklists, resources, and errata.',
			social: [
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mauriziom/' },
			],
			sidebar: [
				{
					label: 'Use the book',
					items: [
						{ label: 'Downloads', slug: 'downloads' },
						{ label: 'Checklists', slug: 'checklists' },
						{ label: 'Templates', slug: 'templates' },
						{ label: 'Resources', slug: 'resources' },
					],
				},
				{
					label: 'About',
					items: [
						{ label: 'Errata', slug: 'errata' },
						{ label: 'About the author', slug: 'about' },
					],
				},
			],
		}),
	],
});
