# Codex Cloud Environment Setup

Reference for configuring this project in Codex Cloud.

## Environment Configuration

### Package Versions

Configure in Codex Cloud UI → Environment → Set package versions:

```
Node.js: 22
```

### Setup Script

```bash
npm install
npm run build
```

### Maintenance Script

```bash
npm install
```

### Environment Variables

None required. This project uses system fonts (no Google Fonts fetch during build).

### Internet Access

- **Recommended**: Off (no external API calls needed)
- **If needed**: Limited to "Common dependencies" preset

## Verification

Codex will run these commands (from AGENTS.md):

```bash
npm run lint    # ESLint check
npm run build   # Production build
```

## Container Caching

Codex caches the container for up to 12 hours. The cache auto-invalidates when:
- Setup script changes
- Environment variables change
- You manually click "Reset cache"

## Troubleshooting

### Build fails in cloud but works locally

1. Check Node.js version matches local (22.x recommended)
2. Ensure all dependencies are in `package.json`
3. Reset cache and retry

### Google Fonts error (FIXED)

This project was updated to use system fonts instead of Google Fonts.
No network requests are made during build, avoiding TLS/proxy issues.

If you need Google Fonts in the future, add this environment variable:
```
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1
```

### Dependencies not installing

1. Verify internet access is enabled for setup phase (always on)
2. Check `package.json` is valid JSON
3. Try `npm ci` instead of `npm install` for reproducible builds

### Lint errors

Codex reads `AGENTS.md` and will run `npm run lint`. Fix locally first:

```bash
npm run lint -- --fix
```

## Project-Specific Notes

- **No "use client"** unless required for interactivity
- **Don't edit `components/ui/*`** — use `npx shadcn@latest add`
- **Server components by default** — this is a static blog
- **System fonts** — no Google Fonts, works offline
