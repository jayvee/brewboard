# Research Findings: Caching Strategy

**Agent:** Claude (cc)
**Research ID:** 01
**Date:** 2026-04-14

---

## Key Findings

### Current State

BrewBoard is a Next.js 14 app with hardcoded in-memory data (no database, no external API calls). The `next.config.js` is empty — no custom cache handlers configured. The only data-fetching code (`src/lib/api.ts`) calls `/api/beers` but no API route exists yet; the page renders from a static array. There is effectively **nothing to cache right now**.

### Option 1: In-Memory Cache (e.g., `lru-cache` or Next.js built-in)

**How it works:** Data is stored in the Node.js process heap. Next.js already provides built-in caching for `fetch` requests and static routes via its Data Cache and Full Route Cache. For non-fetch data (e.g., future database queries), `unstable_cache` or the `lru-cache` npm package can wrap async functions.

**Pros:**
- Zero operational overhead — no external services to provision, monitor, or pay for
- Fastest possible reads — no network hop, data lives in the same process (~nanoseconds)
- `lru-cache` is mature (38M+ weekly downloads), has bounded memory via LRU eviction, and supports TTL
- Next.js built-in caching covers the most common patterns (fetch, route-level revalidation, tag-based invalidation) with zero additional dependencies
- Perfect for single-instance deployments (which is all BrewBoard needs at launch)

**Cons:**
- Cache is lost on process restart or deploy
- Not shared across multiple server instances (irrelevant for single-instance)
- No persistence to disk by default
- Memory-limited — cache competes with application heap

**Best for:** Single-server apps, local dev, small prod traffic, data that can be re-fetched cheaply.

### Option 2: Redis (self-hosted or Upstash)

**How it works:** An external Redis server stores cached data. Next.js supports custom `cacheHandlers` in `next.config.js` to redirect its built-in cache to Redis. Libraries like `ioredis` or `@upstash/redis` provide the client.

**Pros:**
- Cache survives application restarts and deploys
- Shared across multiple server instances — essential for horizontal scaling
- Rich data structures (lists, sets, sorted sets, hashes) beyond simple key-value
- Upstash offers serverless Redis with pay-per-request pricing and HTTP-based access (no connection pooling issues)
- On-demand invalidation and pub/sub for cache busting across instances

**Cons:**
- Adds network latency (~1-5ms per read vs nanoseconds for in-memory)
- Operational complexity — requires provisioning, monitoring, and securing a Redis instance
- Cost — even Upstash free tier has limits; self-hosted Redis needs a server
- Connection management — traditional Redis needs connection pooling in serverless environments
- Overkill for a single-instance app with small dataset

**Best for:** Multi-instance deployments, data that's expensive to recompute, apps needing cache persistence across deploys.

### Option 3: Next.js Built-in Caching Only (No Additional Library)

**How it works:** Rely entirely on Next.js defaults: static rendering for pages without dynamic data, `fetch` caching with `force-cache`, `revalidate` for time-based refresh, `revalidateTag`/`revalidatePath` for on-demand invalidation, and React `cache()` for request deduplication.

**Pros:**
- Zero dependencies — nothing to install or configure
- Covers the dominant use case: caching rendered pages and fetch responses
- Integrates with Next.js ISR (Incremental Static Regeneration) for stale-while-revalidate patterns
- `unstable_cache` wraps arbitrary async functions (database queries, etc.)

**Cons:**
- Less control over eviction, TTL granularity, and cache size than `lru-cache`
- `unstable_cache` API is still marked unstable (though widely used)
- No help for non-Next.js server code (e.g., standalone scripts, background jobs)

**Best for:** Apps that primarily serve pages and fetch data — which is exactly what BrewBoard does.

## Sources

- [Next.js Caching Guide (official docs)](https://nextjs.org/docs/app/guides/caching) — built-in caching model, `unstable_cache`, route segment config
- [Next.js `cacheHandlers` config](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheHandlers) — custom cache handler for Redis/external stores
- [Redis Caching Strategies: Next.js Production Guide 2025](https://www.digitalapplied.com/blog/redis-caching-strategies-nextjs-production) — Redis + Next.js integration patterns
- [Redis Cache vs. In-Memory Cache: When to Use What (NashTech)](https://blog.nashtechglobal.com/redis-cache-vs-in-memory-cache-when-to-use-what/) — decision criteria and tradeoffs
- [lru-cache on npm](https://www.npmjs.com/package/lru-cache) — LRU eviction with TTL, 38M+ weekly downloads
- [npm-compare: lru-cache vs node-cache vs memory-cache](https://npm-compare.com/lru-cache,memory-cache,node-cache,quick-lru) — library comparison
- [Leveraging Redis for Caching in Next.js (Medium, Feb 2026)](https://arnab-k.medium.com/leveraging-redis-for-enhanced-caching-strategies-in-em-next-js-em-a2298703a504) — recent patterns
- [Next.js Redis Custom Cache Handler (GitHub Discussion #52203)](https://github.com/vercel/next.js/discussions/52203) — community implementation examples

## Recommendation

**Use Next.js built-in caching only. Do not add Redis or `lru-cache` at this stage.**

Rationale:
1. **BrewBoard has no external data source yet.** The beer list is hardcoded. There is literally nothing to cache beyond what Next.js already does by statically rendering the page.
2. **When a database/API is added**, Next.js's `unstable_cache` (or the newer `use cache` directive in Next.js 16+) will handle caching database queries with TTL and tag-based invalidation — no extra library needed.
3. **Single instance, small traffic** means there's no cache-sharing requirement. In-memory is sufficient and in-memory is what Next.js uses by default.
4. **Redis adds cost and complexity** that is unjustified until either (a) the app scales to multiple instances, or (b) there's an expensive computation worth persisting across deploys.
5. **Escape hatch is trivial.** If scaling demands it later, Next.js's `cacheHandlers` config lets you swap in a Redis-backed handler with ~20 lines of config — no application code changes required.

**Decision: In-memory (via Next.js defaults) now. Redis later only if multi-instance scaling is needed.**

## Suggested Features

| Feature Name | Description | Priority | Depends On |
|--------------|-------------|----------|------------|
| api-route-beers | Create `/api/beers` route handler to serve beer data (prerequisite for any caching) | high | none |
| page-static-cache | Configure static generation with `revalidate` for the beer listing page | medium | api-route-beers |
| data-cache-wrapper | Add `unstable_cache` wrapper around database/API queries when a data source is introduced | low | api-route-beers |
| redis-cache-handler | Implement custom `cacheHandlers` in next.config.js for Redis when multi-instance scaling is needed | low | data-cache-wrapper |
