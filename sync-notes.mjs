#!/usr/bin/env node
/**
 * sync-notes.mjs
 * -------------------------------------------------------------
 * Copies the CPTS notes from the Obsidian vault into Quartz's
 * `content/` folder, and collects ONLY the images those notes
 * actually reference (your vault keeps ~11k images at its root;
 * we pull in just the ones the CPTS notes use).
 *
 * The Obsidian vault is treated as read-only — nothing here
 * modifies your original notes. Re-run this whenever you update
 * your notes, then commit & push.
 *
 * Usage:
 *   node sync-notes.mjs
 *
 * Override paths without editing this file:
 *   VAULT_ROOT="D:/path/to/Obsidian Vault" node sync-notes.mjs
 * -------------------------------------------------------------
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Configuration ----------------------------------------------------------

// Root of the Obsidian vault (where the pasted images live).
const VAULT_ROOT =
  process.env.VAULT_ROOT ||
  "C:/Users/essog/Documents/Obsidian Vault";

// The CPTS notes folder inside the vault.
const NOTES_SRC =
  process.env.NOTES_SRC ||
  path.join(VAULT_ROOT, "LEARNING/HackTheBox/Academy/cpts");

// Quartz content folder (this repo).
const CONTENT = path.join(__dirname, "content");

// Where collected images are placed inside content/.
const ATTACH_DIRNAME = "attachments";

// Top-level note folders to EXCLUDE from the published site.
const EXCLUDE_FOLDERS = new Set(["h-extra modules", "i-aen"]);

// File extensions treated as images/assets to collect from the vault.
const ASSET_EXTS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".avif",
]);

// --- Helpers ----------------------------------------------------------------

const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function walkFiles(dir, filterExt) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(p, filterExt));
    else if (!filterExt || filterExt.has(path.extname(entry.name).toLowerCase()))
      out.push(p);
  }
  return out;
}

// --- 1. Sanity checks -------------------------------------------------------

if (!isDir(NOTES_SRC)) {
  console.error(`✖ Notes source not found: ${NOTES_SRC}`);
  console.error(`  Set NOTES_SRC env var to the correct path.`);
  process.exit(1);
}
if (!isDir(VAULT_ROOT)) {
  console.error(`✖ Vault root not found: ${VAULT_ROOT}`);
  process.exit(1);
}

// --- 2. Figure out which note folders to sync -------------------------------

const noteFolders = fs
  .readdirSync(NOTES_SRC, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !EXCLUDE_FOLDERS.has(e.name))
  .map((e) => e.name)
  .sort();

console.log("Syncing note folders:");
noteFolders.forEach((f) => console.log("  •", f));
if (EXCLUDE_FOLDERS.size)
  console.log("Excluding:", [...EXCLUDE_FOLDERS].join(", "));

// --- 3. Wipe previously-synced folders (but keep index.md & custom files) ---

fs.mkdirSync(CONTENT, { recursive: true });
for (const f of noteFolders) rmrf(path.join(CONTENT, f));
rmrf(path.join(CONTENT, ATTACH_DIRNAME));

// --- 4. Copy note folders verbatim ------------------------------------------

for (const f of noteFolders) {
  copyDir(path.join(NOTES_SRC, f), path.join(CONTENT, f));
}

// --- 5. Find every referenced image in the copied notes ---------------------

const mdFiles = walkFiles(CONTENT, new Set([".md"]));
// Matches ![[target]], [[target]], ![](target) and ![](<target>)
const wikiRe = /!?\[\[([^\]|#]+?)(?:[#|][^\]]*)?\]\]/g;
const mdImgRe = /!\[[^\]]*\]\(\s*<?([^)>]+?)>?\s*\)/g;

const referenced = new Set();
function noteRef(raw) {
  const name = decodeURIComponent(raw.trim());
  if (ASSET_EXTS.has(path.extname(name).toLowerCase()))
    referenced.add(path.basename(name));
}
for (const md of mdFiles) {
  const txt = fs.readFileSync(md, "utf8");
  let m;
  while ((m = wikiRe.exec(txt))) noteRef(m[1]);
  while ((m = mdImgRe.exec(txt))) noteRef(m[1]);
}
console.log(`\nReferenced images: ${referenced.size}`);

// --- 6. Index vault images by basename, then copy the referenced ones -------

console.log("Indexing vault images (this scans the vault once)…");
const vaultAssets = walkFiles(VAULT_ROOT, ASSET_EXTS);
const byName = new Map(); // basename -> first full path found
for (const p of vaultAssets) {
  const b = path.basename(p);
  if (!byName.has(b)) byName.set(b, p);
}

const attachDir = path.join(CONTENT, ATTACH_DIRNAME);
fs.mkdirSync(attachDir, { recursive: true });

let copied = 0;
const missing = [];
for (const name of referenced) {
  const src = byName.get(name);
  if (!src) { missing.push(name); continue; }
  fs.copyFileSync(src, path.join(attachDir, name));
  copied++;
}

console.log(`Copied ${copied} images into content/${ATTACH_DIRNAME}/`);
if (missing.length) {
  console.log(`\n⚠ ${missing.length} referenced images not found in vault:`);
  missing.slice(0, 20).forEach((n) => console.log("   -", n));
  if (missing.length > 20) console.log(`   … and ${missing.length - 20} more`);
}

console.log("\n✔ Sync complete.");
