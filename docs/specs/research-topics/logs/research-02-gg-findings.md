# Research Findings: offline sync

**Agent:** Gemini (gg)
**Research ID:** 02
**Date:** 2026-04-14

---

## Key Findings

For MVP read-only viewing, the recommendation is to defer offline support and ship without offline capabilities in v1. This keeps the initial product simpler and avoids introducing service worker complexity before there is evidence that offline access is important for users.

### Option A: Basic Service Worker Cache

**Pros:**
- Enables read-only offline viewing of static content
- Improves repeat-load performance for cached assets
- Can establish an early PWA foundation

**Cons:**
- Adds service worker lifecycle and cache invalidation complexity
- Introduces more debugging surface in a simple seed app
- Provides limited value while the app is still static and low-traffic

### Option B: No Offline in v1

**Pros:**
- Lowest complexity for initial delivery
- Avoids stale-cache and service worker maintenance issues
- Lets the team revisit offline support once real usage patterns are known

**Cons:**
- No read-only experience when the network is unavailable
- Offline support must be added later if it becomes important

## Sources

- Product and repo context from `docs/specs/research-topics/03-in-progress/research-02-offline-sync.md`
- BrewBoard app structure and current lack of PWA/service-worker setup in the local codebase

## Recommendation

Defer offline support for v1. The app is still simple and static, and the cost of adding service worker infrastructure now is not justified by the likely user value. Reassess once the app has real data flows and clearer requirements for offline behavior.

## Suggested Features

| Feature Name | Description | Priority | Depends On |
|--------------|-------------|----------|------------|
| pwa-manifest | Add a basic web app manifest so the app can be installed without introducing offline caching yet | low | none |
| offline-readonly-cache | Add read-only offline caching with a service worker when user demand justifies the extra complexity | low | pwa-manifest |
