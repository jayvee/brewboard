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
  - "feedback:3"
  - "docs/specs/feedback/02-triaged/feedback-03-dark-mode-flicker.md"
type: "bug"
severity: "low"
---

# Research: White flash on every page navigation in dark mode

## Context

Multiple users in Discord #bugs channel: @beersnob_dave: "Every time I click a link, there's a white flash before the dark theme kicks in. It's like a flashbang at 2am." @ales_and_errors: "Same here, been happening since I signed up. I thought it was my browser."

## Evidence

- Classic FOUC (Flash of Unstyled Content) — the `<html>` class is set by a client-side script that runs after first paint - Fix: inject a blocking `<script>` in `<head>` that reads the theme preference from localStorage before any rendering - Affects 100% of dark mode users on every navigation - Safari is worst (longer white flash), Chrome recovers faster

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