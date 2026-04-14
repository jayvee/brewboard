# Research: Caching Strategy

## Summary

Choose one cache approach for launch: in-memory or Redis. Keep recommendation to local dev + small prod traffic.

## Questions

- [x] Which option should we choose right now?

## Findings

### Agents
- **cc (Claude):** Thorough analysis of three options (in-memory via lru-cache, Redis, Next.js built-in). Recommends Next.js built-in caching only — no extra libraries needed given BrewBoard's current state (hardcoded data, single instance, no external data source).
- **cx (Codex):** No findings submitted (empty template).

### Consensus
Use Next.js built-in caching. BrewBoard has no external data source yet, so there is nothing to cache beyond what Next.js already handles via static rendering and route-level caching. Redis is unnecessary overhead for a single-instance app with small traffic.

## Recommendation

**Use Next.js built-in caching only. Do not add Redis or lru-cache at this stage.**

- BrewBoard currently uses hardcoded in-memory data with no database or external API.
- Next.js defaults (static rendering, fetch caching, `revalidate`, `unstable_cache`) cover all current and near-term needs.
- Redis can be swapped in later via `cacheHandlers` config (~20 lines) if multi-instance scaling is needed.
- The first actionable step is creating the `/api/beers` route — without it, there's nothing to cache.

## Output

### Selected Features

| Feature Name | Description | Priority | Create Command |
|---|---|---|---|
| api-route-beers | Create `/api/beers` route handler to serve beer data (prerequisite for caching) | high | `aigon feature-create "api-route-beers"` |
| page-static-cache | Configure static generation with `revalidate` for the beer listing page | medium | `aigon feature-create "page-static-cache"` |
| data-cache-wrapper | Add `unstable_cache` wrapper around database/API queries when a data source is introduced | low | `aigon feature-create "data-cache-wrapper"` |
| redis-cache-handler | Implement custom `cacheHandlers` in next.config.js for Redis when multi-instance scaling is needed | low | `aigon feature-create "redis-cache-handler"` |

### Feature Dependencies
- page-static-cache depends on api-route-beers
- data-cache-wrapper depends on api-route-beers
- redis-cache-handler depends on data-cache-wrapper

### Not Selected
- None — all suggested features were selected.
