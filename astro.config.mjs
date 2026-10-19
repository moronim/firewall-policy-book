// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served by GitHub Pages on the custom domain in public/CNAME; the DNS records
// live in the Route 53 hosted zone for firewallpolicybook.com.
const SITE = 'https://firewallpolicybook.com';
const BASE = '/';

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
						{ label: 'Self-assessment', slug: 'self-assessment' },
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
