# GitHub Pages

Site: https://ulysess31.github.io/blog_logue/

## Publish changes

1. Work on `deploy-v0`.
2. Commit source changes and push to `origin/deploy-v0`.
3. Open the repository Actions tab and wait for `Deploy GitHub Pages` to succeed.
4. Open the site URL. The standalone preview is at `/blog_logue/preview/`.

Build output in `out/` and TypeScript cache `tsconfig.tsbuildinfo` are generated files; do not commit them. Stage source files explicitly.

## Local development (PowerShell)

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

## Verify the Pages build locally (PowerShell)

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/blog_logue'
corepack pnpm build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

The build exports static files to `out/`. It does not require `next start` or a paid server.

## GitHub settings

- Repository visibility: Public.
- Settings > Pages > Build and deployment > Source: GitHub Actions.
- Settings > Environments > github-pages > Deployment branches and tags: allow `deploy-v0`.
- If deployment needs approval, open the Actions run and complete the environment review.

Browser storage is specific to each browser and site origin. Share the generated preview URL to send content to another person; their browser cannot read your localStorage.
