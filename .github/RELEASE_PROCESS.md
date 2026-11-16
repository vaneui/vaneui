# VaneUI Release Process

Releases run off branch pushes. The steps for cutting one, and the rules for the
changelog, are in [CONTRIBUTING.md](../CONTRIBUTING.md#release-notes) under
"Release Notes" and "Cutting a release". This page only describes what the
workflows do.

## Branches

| Push to | Workflow | Result |
|---------|----------|--------|
| a pull request against `main` or `prod` | `test.yml` | Unit tests on React 18 and 19, build, package checks, browser tests. Nothing is published. |
| `main` | `npm-publish.yml` | A pre-release on the `alpha` dist-tag. |
| `prod` | `npm-publish-stable.yml` | The stable release on `latest`, a `vX.Y.Z` git tag and a GitHub release. |

There is no workflow that bumps the version. The version in `package.json` and the
`CHANGELOG.md` entry are committed by hand, then `main` is pushed, then `main:prod`.

## What gates a publish

Both publish workflows run the same gate before `npm publish`:

1. Browser tests (`npm run test:e2e`) in the Playwright container, on Chromium, Firefox and WebKit.
2. `npm test` (type check and unit tests).
3. `npm run build`.
4. `npm pack --dry-run` and `npm run check:package` (the exports map and the shipped types).

A failure in any step stops the run before anything is published.

## Pre-releases

Every push to `main` publishes `X.Y.Z-alpha.<timestamp>.g<short sha>` to the `alpha`
dist-tag. When the version in `package.json` is already on npm, the pre-release is
built on the next patch number, so it sorts above the stable release it follows.

```bash
npm install @vaneui/ui@alpha
```

## Stable releases

A push to `prod` publishes the version in `package.json` to `latest`, unless that
exact version is already on npm. The tag and the GitHub release are created whenever
they are missing, also on a re-run after a publish that succeeded but failed to tag.

```bash
npm install @vaneui/ui
```

## Credentials

No npm token is stored. Both publish workflows use npm trusted publishing (OIDC),
configured on npmjs.com under the package settings for `npm-publish.yml` and
`npm-publish-stable.yml`. The tag and the GitHub release use the workflow's own
`GITHUB_TOKEN`.

## Version numbers

The rule is at the top of [CHANGELOG.md](../CHANGELOG.md): patch for fixes, minor
for additive props and components, major for a change to an existing prop name,
default or rendered element.
