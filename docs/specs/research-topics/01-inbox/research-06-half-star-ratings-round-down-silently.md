---
complexity: "medium"
origin: "customer-feedback"
reporter:
  name: ""
  identifier: ""
source:
  channel: ""
  reference: ""
feedback_refs:
  - "feedback:2"
  - "docs/specs/feedback/01-inbox/feedback-02-broken-rating.md"
type: "bug"
severity: "medium"
---

# Research: Half-star ratings round down silently

## Context

Reported by @craft_mike via support email: "I rated Pliny the Elder 4.5 stars. When I go back to the beer page, it shows 4 stars. Happened three times now with different beers — only when I pick a half star. Whole stars save fine."

## Evidence

- Reproduced locally: POST /api/ratings sends `4.5`, DB stores `4.5`, but GET /api/beers/:id returns `4` - Root cause likely in `Math.floor()` in the rating seriali

## Questions to Answer

- [ ] What should we recommend based on this feedback?

## Scope

### In Scope
-

### Out of Scope
-

## Findings

## Recommendation

## Output
- [ ] Feature: