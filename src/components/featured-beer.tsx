type FeaturedBeerProps = {
  name: string;
  brewery: string;
  style: string;
  rating: number;
  tagline: string;
};

export function FeaturedBeer({
  name,
  brewery,
  style,
  rating,
  tagline,
}: FeaturedBeerProps) {
  const fullStars = Math.round(rating);

  return (
    <section
      className="mb-10 rounded-2xl border border-amber-200/80 bg-amber-50 px-8 py-10 shadow-sm"
      aria-label={tagline}
    >
      <p className="text-base font-semibold uppercase tracking-wide text-amber-800 md:text-lg">
        {tagline}
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
        {name}
      </h2>
      <p className="mt-3 text-xl text-stone-600 md:text-2xl">{brewery}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 md:text-base">
          {style}
        </span>
        <div className="flex items-center gap-2 text-xl text-stone-800 md:text-2xl">
          <span aria-hidden>
            {'★'.repeat(fullStars)}
            {'☆'.repeat(5 - fullStars)}
          </span>
          <span className="text-stone-500 text-lg md:text-xl">{rating}</span>
        </div>
      </div>
    </section>
  );
}
