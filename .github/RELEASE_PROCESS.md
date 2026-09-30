# VaneUI Release Process

This document outlines the automated release pipeline for VaneUI using GitHub Actions.

## Overview

The release pipeline supports two types of releases:

1. **Pre-releases** - Published from the `main` branch with `alpha` tag
2. **Stable releases** - Published from the `prod` branch as the latest version

## Workflows

### 1. Test Suite (`test.yml`)

**Trigger:** Pull requests to `main`/`prod` branches  
**Purpose:** Ensure code quality and prevent regressions

**Process:**
- Runs on Node.js 24 against React 18 and 19
- Type checking with TypeScript
- Full test suite execution
- Package building verification
- Test coverage reporting
- Blocks merging if tests fail

### 2. Pre-release Pipeline (`npm-publish.yml`)

**Trigger:** Push to `main` branch  
**Purpose:** Create pre-release versions for testing and review

**Process:**
- Runs tests automatically (fails if tests fail)
- Generates version: `{base-version}-alpha.{timestamp}.{commit-sha}`
- Builds package and runs tests again
- Publishes to npm with `alpha` tag only if all tests pass
- Reports publication success

**Installation:**
```bash
npm install @vaneui/ui@alpha
```

### 3. Stable Release Pipeline (`npm-publish-stable.yml`)

**Trigger:** Push to `prod` branch  
**Purpose:** Create stable production releases

**Process:**
- Runs tests automatically (fails if tests fail)
- Checks if version already exists on npm
- Builds package and runs tests again
- Publishes to npm as `latest` only if all tests pass
- Creates git tag and GitHub release
- Only publishes if version is new and tests pass

**Installation:**
```bash
npm install @vaneui/ui@latest
```

### 4. Manual Release Creation (`release.yml`)

**Trigger:** Manual workflow dispatch  
**Purpose:** Bump version and initiate release process

**Features:**
- Runs tests before proceeding (fails if tests fail)
- Choose version bump type: patch, minor, major
- Choose target branch: main (pre-release) or prod (stable)
- Builds package
- Automatically commits version bump only if all tests pass
- Triggers appropriate release pipeline

## Release Process

### For Pre-releases (Testing/Review)

1. **Automatic:** Push changes to `main` branch
   - Pre-release is created automatically
   - Version format: `0.1.8-alpha.20240714123456.abc1234`

2. **Manual:** Use GitHub Actions UI
   - Go to Actions → "Create Release"
   - Select version bump type
   - Select `main` as target branch
   - Click "Run workflow"

### For Stable Releases

1. **Recommended:** Use GitHub Actions UI
   - Go to Actions → "Create Release"
   - Select version bump type
   - Select `prod` as target branch
   - Click "Run workflow"

2. **Manual:** 
   - Bump version manually in `package.json`
   - Push to `prod` branch
   - Stable release is created automatically

## Quality Gates

All release workflows include multiple quality gates to ensure package reliability:

### 🧪 **Test Gates**
- **Pre-build tests**: Run before any build process
- **Post-build tests**: Run after building to ensure build doesn't break functionality
- **Multiple React versions**: Test compatibility across React 18 and 19 (PR test suite)
- **Type checking**: Ensure TypeScript compilation succeeds

### 🚫 **Failure Handling**
- **Immediate stop**: Any test failure immediately stops the release process
- **Clear error messages**: Descriptive failure messages in CI logs
- **No partial publishes**: Package is never published if any step fails
- **Version rollback**: Failed releases don't increment version numbers

### 🔍 **Verification Steps**
- **Package content verification**: Ensure all required files are included
- **Test coverage reporting**: Monitor test coverage trends
- **Build artifact validation**: Verify built package integrity

## Version Strategy

- **Patch** (0.1.8 → 0.1.9): Bug fixes, small improvements
- **Minor** (0.1.8 → 0.2.0): New features, backwards compatible
- **Major** (0.1.8 → 1.0.0): Breaking changes

## NPM Tags

- `latest`: Stable releases from prod branch
- `alpha`: Pre-releases from main branch

## Required Secrets

No npm token is needed: the publish workflows use npm trusted publishing (OIDC), configured per package on npmjs.com under Settings → Trusted Publisher for `npm-publish.yml` and `npm-publish-stable.yml`.

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

## Branch Strategy

```
main (development)     →  Pre-releases (@alpha)
  ↓ (merge when ready)
prod (production)      →  Stable releases (@latest)
```

## Installation Examples

```bash
# Latest stable version
npm install @vaneui/ui

# Latest pre-release
npm install @vaneui/ui@alpha

# Specific version
npm install @vaneui/ui@0.1.8
npm install @vaneui/ui@0.1.8-alpha.20240714123456.abc1234
```

## Monitoring

- Check GitHub Actions for build status
- Monitor npm package page for published versions
- Review GitHub releases for release notes