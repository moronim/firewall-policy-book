// Copies the reader-facing appendices, the downloadable templates, and the
// self-assessment from the book manuscript into the site, so the site never
// drifts from the book. Needs pandoc and python3 for the Word files.
//
// Usage: npm run sync -- "/path/to/Firewall Book"
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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

// Downloadable templates: each one as Markdown (for Git and wikis) and Word
// (for people who edit and circulate policy documents), plus the zone matrix as CSV.
const DL = 'public/downloads';
mkdirSync(DL, { recursive: true });
const ATTRIBUTION =
	'*From Firewall Policy Management in Modern Security Operations by Maurizio Moroni. ' +
	'Latest version: https://firewallpolicybook.com/downloads/*';

// Splits an appendix into its `## ` sections, keyed by heading.
const sectionsOf = (md) =>
	Object.fromEntries(
		md
			.split(/^## /m)
			.slice(1)
			.map((chunk) => {
				const [heading, ...rest] = chunk.split('\n');
				return [heading.trim(), rest.join('\n').trim()];
			}),
	);

// The book prints each form as a blockquote of "Label: [placeholder]" lines with
// ALL-CAPS group headings. As a download it works better as fill-in tables.
const formToTables = (section) => {
	const all = section.split('\n');
	const first = all.findIndex((l) => l.startsWith('>'));
	const last = all.findLastIndex((l) => l.startsWith('>'));
	const intro = all.slice(0, first).join('\n');
	const outro = all.slice(last + 1).join('\n').trim();
	const lines = all
		.slice(first, last + 1)
		.map((l) => l.replace(/^>\s?/, '').trim())
		.filter(Boolean)
		.map((l) => l.replace(/\\([[\]])/g, '$1'));
	const out = [intro.trim()];
	let rows = [];
	const flush = () => {
		if (rows.length) out.push('| Field | Entry |\n|----------|----------------------|\n' + rows.join('\n'));
		rows = [];
	};
	for (const line of lines.slice(1)) {
		// line 0 is the form's own title, which becomes the document title
		const group = line.match(/^([A-Z][A-Z ()/&-]+):$/);
		if (group) {
			flush();
			out.push('## ' + group[1].charAt(0) + group[1].slice(1).toLowerCase());
			continue;
		}
		// "Requested by: [Name], Date: [Date]" holds two fields; give each its own row.
		for (const field of line.split(/(?<=\]), (?=[A-Z][\w ()/-]*: \[)/)) {
			const i = field.indexOf(': ');
			rows.push(`| ${field.slice(0, i)} | ${field.slice(i + 2)} |`);
		}
	}
	flush();
	if (outro) out.push(outro);
	return out.join('\n\n');
};

const download = (name, title, body) => {
	const md = `# ${title}\n\n${ATTRIBUTION}\n\n${body.trim()}\n`;
	writeFileSync(join(DL, `${name}.md`), md);
	// --columns forces pandoc to size table columns by their dash widths, so the
	// entry column of a form gets most of the page.
	execFileSync('pandoc', [
		join(DL, `${name}.md`),
		'--from=markdown',
		'--columns=20',
		'--reference-doc=scripts/reference.docx',
		'--output',
		join(DL, `${name}.docx`),
	]);
	execFileSync('python3', ['scripts/docx-table-borders.py', join(DL, `${name}.docx`)]);
	console.log(`-> ${DL}/${name}.md, .docx`);
};

const appE = sectionsOf(readFileSync(join(book, 'book/22-appendix-e-templates.md'), 'utf8'));
const appD = readFileSync(join(book, 'book/21-appendix-d-checklists.md'), 'utf8');
for (const key of ['Zone-Based Policy Structure', 'Rule Documentation Form', 'Firewall Change Request Template']) {
	if (!appE[key]) {
		console.error(`Appendix E no longer has a "${key}" section; check the sync script.`);
		process.exit(1);
	}
}

const policy = readFileSync(join(book, 'companion/change-management-policy-template.md'), 'utf8');
download(
	'change-management-policy-template',
	policy.match(/^# (.*)$/m)[1],
	policy.replace(/^# .*\n+/, ''),
);
download('firewall-change-request', 'Firewall Change Request Template', formToTables(appE['Firewall Change Request Template']));
download('rule-documentation-form', 'Rule Documentation Form', formToTables(appE['Rule Documentation Form']));
download('zone-based-policy-structure', 'Zone-Based Policy Structure', appE['Zone-Based Policy Structure']);
download('checklists', 'Quick Reference Checklists', appD.replace(/^# .*\n+/, ''));

// The zone matrix is the one template people extend in a spreadsheet.
const csvCell = (c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c);
const zoneRows = appE['Zone-Based Policy Structure']
	.split('\n')
	.filter((l) => l.startsWith('|') && !/^\|[-\s|]+\|$/.test(l))
	.map((l) => l.slice(1, -1).split('|').map((c) => csvCell(c.trim())).join(','));
writeFileSync(join(DL, 'zone-based-policy-structure.csv'), zoneRows.join('\r\n') + '\r\n');
console.log(`-> ${DL}/zone-based-policy-structure.csv`);

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
