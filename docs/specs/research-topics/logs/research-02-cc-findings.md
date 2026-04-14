# Research Findings: offline sync

**Agent:** Claude (cc)
**Research ID:** 02
**Date:** 2026-04-14

---

## Key Findings

### The Question

Should BrewBoard ship a basic service worker cache for read-only offline viewing in v1, or skip offline entirely?

### Current State

- Next.js 14.2 app with React 18, TypeScript, Tailwind CSS
- Zero PWA infrastructure: no manifest, no service worker, no caching
- Data is hardcoded (6 beers in `page.tsx`), not fetched from an API
- Static, read-only content with no user input or mutations

### Option A: Basic Service Worker Cache

**What it involves:**

The simplest viable approach is a hand-written `public/sw.js` (~30 lines) using a cache-first strategy for static assets, plus a `manifest.ts` file. This is the approach recommended by the official Next.js PWA guide. Total effort: 2-3 small files, no new dependencies.

Alternatively, Serwist (the maintained successor to `next-pwa`, recommended in official Next.js docs) wraps Workbox and provides zero-config precaching. It requires `@serwist/next` + a config change + a `sw.ts` file. Total effort: ~3 files, 1 new dependency.

**Pros:**
- Instant page loads on repeat visits (cache-first for static assets)
- Full offline viewing of the beer list since all data is hardcoded/static
- Low complexity for a read-only app with no dynamic data
- Establishes PWA foundation (manifest = installable to home screen)
- Next.js official docs explicitly cover this path

**Cons:**
- Cache invalidation adds maintenance surface (stale SW = stuck app)
- Service worker debugging is notoriously tricky (silent failures, update lifecycle)
- Adds build/deploy considerations (SW scope, cache versioning)
- Marginal user benefit right now: the app is a demo with hardcoded data

### Option B: No Offline in v1

**What it involves:**

Ship nothing. Add offline support later when the app has real users, dynamic data, and a clearer picture of what "offline" means (read-only cache? optimistic writes? background sync?).

**Pros:**
- Zero added complexity
- No risk of stale cache bugs
- Decisions about caching strategy can be made with real usage data
- Avoids premature architecture decisions that may need to be ripped out when real API/data layer is added

**Cons:**
- No offline viewing (users see browser error page when disconnected)
- Must retrofit later, though the retrofit is small for a static app
- Misses opportunity to establish PWA patterns early

### Option C: Hybrid - Manifest Only (No Service Worker)

A middle path: ship just `app/manifest.ts` with app icons. This makes the app installable to home screens (iOS/Android) without any caching logic. Offline still shows a browser error, but the app "feels" like a PWA.

**Pros:**
- One file, no caching complexity
- Installable to home screen immediately
- Easy to layer service worker on top later

**Cons:**
- Not truly offline-capable
- Could confuse users who install it expecting offline support

## Sources

- [Next.js Official PWA Guide](https://nextjs.org/docs/app/guides/progressive-web-apps) - Official guidance, recommends Serwist for offline, covers manifest + SW setup
- [Next.js PWA Offline with Plain Service Worker (no packages)](https://adropincalm.com/blog/nextjs-offline-service-worker/) - DIY approach, ~6 files, moderate complexity
- [Serwist Getting Started](https://serwist.pages.dev/docs/next/getting-started) - Maintained next-pwa successor, minimal config
- [Workbox Caching Strategies Overview](https://developer.chrome.com/docs/workbox/caching-strategies-overview) - Cache-first vs network-first tradeoffs
- [Offline-First PWAs: Service Worker Caching Strategies](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies) - Strategy comparison with tradeoffs
- [Building a PWA in Next.js with Serwist](https://javascript.plainenglish.io/building-a-progressive-web-app-pwa-in-next-js-with-serwist-next-pwa-successor-94e05cb418d7) - Step-by-step Serwist integration

## Recommendation

**Option B: Skip offline in v1. Optionally add manifest-only (Option C) as a low-cost PWA signal.**

Rationale:

1. **The data is hardcoded.** There is no API, no database, no dynamic content. A service worker cache for static assets provides marginal benefit over the browser's own HTTP cache for a Next.js app that already serves static HTML.

2. **Premature caching is risky.** When a real data layer is added (API, database), the caching strategy will need to change fundamentally (network-first for API calls, cache-first for assets). Building a SW now means either ripping it out or refactoring it later.

3. **This is a seed/demo repo.** The AGENTS.md explicitly states features are "intentionally trivial." The offline question becomes meaningful when there are real users with real connectivity constraints.

4. **The retrofit cost is low.** Adding a basic service worker to a Next.js app is a 2-3 file change. Deferring this decision costs almost nothing.

**If the team wants a small PWA signal now:** add `app/manifest.ts` only (Option C). This is one file, makes the app installable, and doesn't introduce caching complexity. The service worker can be layered on when the data architecture is settled.

## Suggested Features

| Feature Name | Description | Priority | Depends On |
|--------------|-------------|----------|------------|
| pwa-manifest | Add web app manifest for home screen installability | low | none |
| offline-sw-cache | Add service worker with cache-first strategy for static assets | low | pwa-manifest |
| offline-fallback-page | Add a styled offline fallback page shown when network is unavailable | low | offline-sw-cache |
