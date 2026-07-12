# Syracuse Chamber Orchestra Website

Static Next.js site for the Syracuse Chamber Orchestra. Content lives in `data/` JSON files; the site rebuilds and deploys on push to GitHub.

## Quick start

From the parent project root:

```bash
make install
make dev
```

Open http://localhost:3000

From this directory:

```bash
make install
make dev
```

## Common commands

| Command | Description |
|---------|-------------|
| `make dev` | Local dev server with hot reload |
| `make build` | Production static export → `out/` |
| `make preview` | Build and serve `out/` locally |
| `make lint` | Run ESLint |

## Updating content

Edit JSON files in `data/`:

| File | Contents |
|------|----------|
| `organization.json` | Name, mission, contact, donation URL, advertising copy |
| `roster.json` | Musicians by section (slug, name, role, image key) |
| `concerts.json` | Concerts — future dates show as upcoming automatically |
| `images.json` | Image key → path map (place in `public/`) |
| `media.json` | YouTube channel URL and concert video links |

Example video entry in `media.json`:

```json
{
  "title": "Mostly Mozart",
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "publishedAt": "2021-12-01"
}
```

Thumbnails are pulled automatically from the YouTube link — no local image needed.

Images go in `public/`. Reference them in `images.json` (e.g. `"/photos/concert.jpg"`).

After editing data or code:

```bash
make build   # verify locally
git push     # triggers GitHub Actions deploy
```

## Deploying to GitHub Pages

1. Push this `repo/` folder to a GitHub repository
2. In repo **Settings → Pages**, set source to **GitHub Actions**
3. Push to `master` — `.github/workflows/deploy.yml` builds and publishes `out/`

Custom domain: `public/CNAME` contains `syracusechamberorchestra.com`. Point DNS to GitHub Pages and enable the custom domain in repo settings.

Optional env vars:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for SEO
- `NEXT_PUBLIC_BASE_PATH` — required for `username.github.io/repo-name` URLs (set automatically in CI). **Remove both env vars in the workflow when using a custom domain at the root** (e.g. `syracusechamberorchestra.com`).

## Project structure

```
data/           Content JSON
public/         Static assets
src/app/        Pages
src/components/ Layout and UI
src/lib/        Data loaders, formatting, site config
```
