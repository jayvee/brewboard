# Feature: Featured Beer Hero

## Summary

Add a prominent hero section above the beer grid on the home page that
showcases the highest-rated beer as "Beer of the Day". This gives the
landing page a clear visual focal point and lets visitors see the pick
of the collection the moment they arrive.

## Acceptance Criteria

- [ ] Create `src/components/featured-beer.tsx` that accepts props
      `{ name: string, brewery: string, style: string, rating: number, tagline: string }`
- [ ] Render the featured beer noticeably larger than `BeerCard`: large
      heading for the name, brewery underneath, style badge, rating stars,
      and the tagline displayed prominently
- [ ] The hero must be visually distinct from `BeerCard` — different
      background colour, more padding, and a larger type scale
- [ ] Export the component as a named export `FeaturedBeer`
- [ ] In `src/app/page.tsx`, compute the highest-rated beer from the
      existing `BEERS` array and render `<FeaturedBeer ... tagline="Beer of the Day" />`
      above the existing grid
- [ ] The existing 6-card grid must continue to render unchanged below
      the hero

## Technical Approach

Pure presentational React component — props in, JSX out. Use Tailwind
classes consistent with the rest of the app (`stone-*`, `amber-*`).
Pick the highest-rated beer with a single `reduce` over `BEERS`.

## Out of Scope

- Do NOT write tests
- Do NOT add documentation
- Do NOT modify `BeerCard.tsx`
- Do NOT add new dependencies
- Do NOT fetch data — reuse the existing static `BEERS` array
- Only create/edit the files listed in the acceptance criteria

## Validation

```bash
echo "Feature Featured Beer Hero validated"
```
