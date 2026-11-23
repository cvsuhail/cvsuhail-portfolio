// Builds public/Muhammed-Suhail-CV.pdf from the same data the site renders
// (src/data/resume.ts and src/data/projects.ts).
//
//   npm run cv
//
// The CV is laid out for applicant tracking systems: one column, standard
// section headings, real selectable text, no tables, icons or images, and
// every link printed as visible text. Printing uses headless Chrome; set
// CHROME_PATH if Chrome is not in the default macOS location.

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { profile, experiences, skillCategories, education, CV_PDF_PATH } from "../src/data/resume.ts";
import { allProjects, type Project } from "../src/data/projects.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "public", CV_PDF_PATH.replace(/^\//, ""));
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Visible link text: no protocol, no trailing slash (e.g. festfloww.com).
const shortUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const link = (url: string) => `<a href="${esc(url)}">${esc(shortUrl(url))}</a>`;

const projectGroups: { title: string; category: Project["category"] }[] = [
  { title: "SaaS Platforms & Mobile Apps", category: "saas" },
  { title: "Client Websites", category: "website" },
  { title: "Personal Projects & Experiments", category: "hobby" },
];

const statusText: Record<Project["status"], string> = {
  live: "Live",
  building: "In active development",
  internal: "Internal platform",
};

const projectHtml = (p: Project) => {
  const role = p.specs?.find((s) => s.label === "Role")?.value;
  const stack = p.specs?.find((s) => s.label === "Stack")?.value;
  const meta = [p.year, statusText[p.status], role].filter(Boolean).join(" | ");
  return `
    <div class="item">
      <div class="row"><strong>${esc(p.name)}</strong> — ${esc(p.kicker)}</div>
      <div class="meta">${esc(meta)}${p.url ? ` | ${link(p.url)}` : ""}</div>
      <div>${esc(p.body)}</div>
      ${stack ? `<div class="meta">Tech: ${esc(stack.replace(/ · /g, ", "))}</div>` : ""}
    </div>`;
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} — CV</title>
<meta name="author" content="${esc(profile.name)}">
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.38; color: #111; margin: 0; }
  a { color: #111; text-decoration: none; }
  h1 { font-size: 20pt; margin: 0 0 2pt; letter-spacing: 0.2pt; }
  .headline { font-size: 11pt; font-weight: bold; margin-bottom: 4pt; }
  .contact { font-size: 9.5pt; }
  h2 { font-size: 11pt; text-transform: uppercase; letter-spacing: 0.6pt; border-bottom: 1px solid #111;
       padding-bottom: 2pt; margin: 12pt 0 5pt; break-after: avoid; }
  h3 { font-size: 10pt; margin: 8pt 0 3pt; break-after: avoid; }
  .item { margin: 0 0 6pt; break-inside: avoid; }
  .row { display: block; }
  .meta { color: #333; font-size: 9.5pt; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 0 0 2pt; }
  p { margin: 0; }
</style>
</head>
<body>
  <h1>${esc(profile.name)}</h1>
  <div class="headline">${esc(profile.title)}</div>
  <div class="contact">
    ${esc(profile.location)}<br>
    Email: <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a> |
    Phone: ${esc(profile.phone)} |
    Website: ${link(profile.website)}<br>
    LinkedIn: ${link(profile.linkedin)} |
    GitHub: ${link(profile.github)}
  </div>

  <h2>Summary</h2>
  <p>${esc(profile.summary)}</p>

  <h2>Experience</h2>
  ${experiences
    .map(
      (e) => `
    <div class="item">
      <div class="row"><strong>${esc(e.role)}</strong>, ${esc(e.company)}</div>
      <div class="meta">${esc(e.duration)} | ${esc(e.location)}</div>
      <ul><li>${esc(e.note)}</li></ul>
    </div>`,
    )
    .join("")}

  <h2>Skills</h2>
  <ul>
    ${skillCategories.map((c) => `<li><strong>${esc(c.title)}:</strong> ${esc(c.skills)}</li>`).join("")}
  </ul>

  <h2>Projects</h2>
  ${projectGroups
    .map(({ title, category }) => {
      const items = allProjects.filter((p) => p.category === category);
      return items.length ? `<h3>${esc(title)}</h3>${items.map(projectHtml).join("")}` : "";
    })
    .join("")}

  <h2>Education</h2>
  <div class="item">
    <div class="row"><strong>${esc(education.degree)}</strong>, ${esc(education.school)}</div>
    <div class="meta">${esc(education.duration)} | ${esc(education.affiliation)}</div>
  </div>
</body>
</html>`;

const dir = mkdtempSync(join(tmpdir(), "cv-"));
const htmlFile = join(dir, "cv.html");
writeFileSync(htmlFile, html);
try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outFile}`,
      pathToFileURL(htmlFile).href,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log(`Wrote ${outFile} (${Math.round(statSync(outFile).size / 1024)} KB)`);
