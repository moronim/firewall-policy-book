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

// The Chapter 15 self-assessment drives the interactive page, so extract its
// sections, statements, and stage bands rather than copying them by hand.
const chapter = readFileSync(join(book, 'book/15-assessment-roadmap.md'), 'utf8');
const assessment = chapter.split('## Identifying Quick Wins')[0];
const sections = [];
for (const line of assessment.split('\n')) {
	if (line.startsWith('### ')) sections.push({ title: line.slice(4).trim(), items: [] });
	else if (line.startsWith('> ') && sections.length) sections.at(-1).items.push(line.slice(2).trim());
}
const stages = [...assessment.matchAll(/(\d+)-(\d+) \(Stage (\d)\)/g)].map((m) => ({
	min: Number(m[1]),
	max: Number(m[2]),
	stage: Number(m[3]),
}));
const scale = assessment.match(/Score each item (\d+)-(\d+)/);
if (sections.length !== 3 || sections.some((s) => s.items.length !== 5) || stages.length !== 4 || !scale) {
	console.error('Chapter 15 self-assessment no longer has the expected shape; check the parser.');
	process.exit(1);
}
mkdirSync('src/data', { recursive: true });
writeFileSync(
	'src/data/assessment.json',
	JSON.stringify({ min: Number(scale[1]), max: Number(scale[2]), sections, stages }, null, '\t') + '\n',
);
console.log('book/15-assessment-roadmap.md -> src/data/assessment.json');
