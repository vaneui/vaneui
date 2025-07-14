# VaneUI Release Process

This document outlines the automated release pipeline for VaneUI using GitHub Actions.

## Overview

The release pipeline supports two types of releases:

1. **Pre-releases** - Published from the `main` branch with `alpha` tag
2. **Stable releases** - Published from the `prod` branch as the latest version

## Workflows

### 1. Pre-release Pipeline (`npm-publish.yml`)

**Trigger:** Push to `main` branch  
**Purpose:** Create pre-release versions for testing and review

**Process:**
- Runs tests automatically
- Generates version: `{base-version}-alpha.{timestamp}.{commit-sha}`
- Publishes to npm with `alpha` tag
- Creates GitHub pre-release

**Installation:**
```bash
npm install @vaneui/ui@alpha
```

### 2. Stable Release Pipeline (`npm-publish-stable.yml`)

**Trigger:** Push to `prod` branch  
**Purpose:** Create stable production releases

**Process:**
- Runs tests automatically
- Checks if version already exists on npm
- Publishes to npm as `latest`
- Creates git tag and GitHub release
- Only publishes if version is new

**Installation:**
```bash
npm install @vaneui/ui@latest
```

### 3. Manual Release Creation (`release.yml`)

**Trigger:** Manual workflow dispatch  
**Purpose:** Bump version and initiate release process

**Features:**
- Choose version bump type: patch, minor, major
- Choose target branch: main (pre-release) or prod (stable)
- Automatically commits version bump
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

## Version Strategy

- **Patch** (0.1.8 → 0.1.9): Bug fixes, small improvements
- **Minor** (0.1.8 → 0.2.0): New features, backwards compatible
- **Major** (0.1.8 → 1.0.0): Breaking changes

## NPM Tags

- `latest`: Stable releases from prod branch
- `alpha`: Pre-releases from main branch

## Required Secrets

Ensure these secrets are configured in GitHub repository settings:

- `NPM_TOKEN`: NPM publish token with write access
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