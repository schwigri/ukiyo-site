# UkiyoSite

Personal static blog built with Astro and deployed to SourceHut Pages.

## Development

- Requires Node.js `>=22.12`.
- Install dependencies with `npm ci`.
- Validate changes with `npm run lint`, `npm run typecheck`, and `npm run build`.
- The production build is static and is written to `dist/`.

## Deployment

- `.build.yml` is the SourceHut Builds manifest. It installs dependencies, runs linting and type checks, builds the site, packages the contents of `dist/` as `site.tar.gz`, and publishes it to SourceHut Pages.
- Publishing is restricted to pushes to `refs/heads/main` and uses the narrowly scoped `pages.sr.ht/PAGES:RW` OAuth grant.
- The deployment target is `www.griffen.dev`. Preserve the archive's contents-at-root layout: `index.html` must be at the root of the tarball, not inside a `dist/` directory.
- Do not broaden the OAuth scope or remove the branch restriction without explicit approval.
