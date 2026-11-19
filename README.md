# CPTS Notes

My notes from the HackTheBox Academy **Certified Penetration Testing Specialist (CPTS)** / Pentester Path, published as a static website with [Quartz](https://quartz.jzhao.xyz).

🌐 **Live site:** https://gil01karougbe.github.io/cpts-notes/

The notes themselves are authored in Obsidian. This repo is the **publishing layer**: a sync script copies the notes out of the vault, pulls in only the images they reference, and Quartz turns them into the site. **The Obsidian vault is never modified.**

## How it works

```
Obsidian vault  ──(sync-notes.mjs)──►  content/  ──(quartz build)──►  public/  ──(GitHub Actions)──►  GitHub Pages
```

- `sync-notes.mjs` — copies the CPTS note folders into `content/` and collects the ~1,385 referenced images from the vault root. Excludes `h-extra modules` and `i-aen`.
- `quartz.config.ts` / `quartz.layout.ts` — site configuration (title, theme, explorer, footer). The explorer pins **g-procedures** to the top for quick access.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`.

## Updating the site after editing notes in Obsidian

```sh
node sync-notes.mjs      # copy latest notes + referenced images into content/
git add -A
git commit -m "Update notes"
git push                 # GitHub Actions rebuilds and redeploys automatically
```

If your vault is somewhere else, override the path:

```sh
VAULT_ROOT="D:/path/to/Obsidian Vault" node sync-notes.mjs
```

## Previewing locally

```sh
npm install
npx quartz build --serve
# open http://localhost:8080
```

> Requires Node 20+. (Pinned to Quartz v4.4.1, which supports Node 20; newer Quartz needs Node 22.)

## One-time GitHub setup

In the repo on GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions.**
After that, every push to `main` publishes automatically.
