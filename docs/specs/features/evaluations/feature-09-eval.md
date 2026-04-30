# Evaluation: Feature 09 - dark-mode

**Mode:** Fleet (Multi-agent comparison)

## Spec
See: `./docs/specs/features/04-in-evaluation/feature-09-dark-mode.md`

## Implementations to Compare

- [ ] **cu** (Cursor): `/Users/jviner/.aigon/worktrees/brewboard/feature-09-cu-dark-mode`
- [ ] **gg** (Gemini): `/Users/jviner/.aigon/worktrees/brewboard/feature-09-gg-dark-mode`

## Evaluation Criteria

| Criteria | cu | gg |
|----------|---|---|
| Code Quality | 9/10 | 7/10 |
| Spec Compliance | 10/10 | 10/10 |
| Performance | 9/10 | 7/10 |
| Maintainability | 9/10 | 8/10 |
| **Total** | **/40** | **/40** |

| Agent | Lines | Score |
|---|---|---|
| cu | 104 | 37/40 |
| gg | 79 | 32/40 |

## Summary

### cu (Cursor)
**Strengths:**
- Uses Next.js `Script` component with `beforeInteractive` strategy, preventing flash of unstyled content (FOUC) on dark mode
- Well-structured helper functions in ThemeToggle (`prefersDark`, `readStored`, `applyHtmlClass`) for clarity and testability
- Comprehensive dark mode styling on body (`dark:bg-stone-950 dark:text-stone-100`) for visual consistency
- Button has full styling with hover states and dark mode support
- Proper accessibility: `aria-pressed`, `aria-label`, semantic button type
- Fixed positioning of toggle (top-right, z-50) is UX-friendly for persistent access
- Handles media query listener changes with proper cleanup
- Robust implementation covering edge cases

**Weaknesses:**
- Slightly more verbose implementation (104 lines vs 79)
- Inline script string is somewhat harder to read

### gg (Gemini)
**Strengths:**
- Simpler, more compact implementation (79 lines)
- Meets all three acceptance criteria
- Clear, easy-to-follow useEffect logic
- Correct localStorage key (`brewboard-theme`)

**Weaknesses:**
- Uses inline `<script>` tag in head instead of Next.js `Script` component—suboptimal for Next.js apps
- Script doesn't use `beforeInteractive` strategy, so may cause brief FOUC on page load
- Two separate useEffect hooks could be consolidated
- Button has minimal styling (no hover states, no dark mode styling)
- Missing accessibility attributes (`aria-label`, `aria-pressed`)
- Button placed at body end rather than fixed position (less accessible)
- Body element lacks dark mode styling classes
- No semantic button type specified

## Recommendation

**Winner:** cu (Cursor) — better UX, proper Next.js patterns, superior styling and accessibility.

**Rationale:**
Both implementations are spec-compliant, but cu demonstrates better engineering practices for a Next.js application. The use of Next.js `Script` with `beforeInteractive` prevents FOUC—a critical UX issue when implementing theme toggles. cu also delivers more polished styling, accessibility features, and maintainability through better code organization. While gg is simpler, the missing UX and accessibility details make cu the stronger choice for production.

**Cross-pollination consideration:**
The other implementation doesn't provide features worth adopting beyond what cu already provides. cu's approach is more comprehensive and production-ready.

