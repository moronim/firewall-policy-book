// Copies the reader-facing appendices and the companion template from the book
// manuscript into the site, so the site never drifts from the book.
//
// Usage: npm run sync -- "/path/to/Firewall Book"
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const book = process.argv[2];
if (!book) {
	console.error('Usage: npm run sync -- "/path/to/Firewall Book"');
	process.exit(1);
}

const pages = [
	{
		from: 'book/20-appendix-c-resources.md',
		to: 'src/content/docs/resources.md',
		title: 'Resources',
		appendix: 'Appendix C',
		description: 'Standards, books, organizations, and sources cited in the book, grouped by chapter.',
	},
	{
		from: 'book/21-appendix-d-checklists.md',
		to: 'src/content/docs/checklists.md',
		title: 'Checklists',
		appendix: 'Appendix D',
		description: 'Pre-change validation and rule decommissioning checklists from Appendix D.',
	},
	{
		from: 'book/22-appendix-e-templates.md',
		to: 'src/content/docs/templates.md',
		title: 'Templates',
		appendix: 'Appendix E',
		description: 'Zone-based policy structure, rule documentation form, and firewall change request template from Appendix E.',
	},
];

for (const page of pages) {
	// The book's H1 becomes the page title, so drop it from the body.
	const body = readFileSync(join(book, page.from), 'utf8').replace(/^# .*\n+/, '');
	const front = `---\ntitle: ${page.title}\ndescription: ${page.description}\n---\n\n`;
	const note = `<!-- Generated from the book's ${page.appendix} by scripts/sync-from-book.mjs. Edit the manuscript, not this file. -->\n\n`;
	writeFileSync(page.to, front + note + body);
	console.log(`${page.from} -> ${page.to}`);
}

mkdirSync('public/downloads', { recursive: true });
copyFileSync(
	join(book, 'companion/change-management-policy-template.md'),
	'public/downloads/change-management-policy-template.md',
);
console.log('companion/change-management-policy-template.md -> public/downloads/');
