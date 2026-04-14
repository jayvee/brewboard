type FeaturedBeerProps = {
  name: string;
  brewery: string;
  style: string;
  rating: number;
  tagline: string;
};

export function FeaturedBeer({ name, brewery, style, rating, tagline }: FeaturedBeerProps) {
  return (
    <div className="bg-amber-950 rounded-xl p-8 mb-8 text-white">
      <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">{tagline}</p>
      <h2 className="text-4xl font-bold text-white mb-1">{name}</h2>
      <p className="text-amber-200 text-lg mb-4">{brewery}</p>
      <div className="flex items-center gap-3">
        <span className="bg-amber-500 text-amber-950 text-sm font-semibold px-3 py-1 rounded-full">{style}</span>
        <div className="flex items-center gap-1 text-amber-300 text-xl">
          {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
          <span className="text-amber-400 text-base ml-1">{rating}</span>
        </div>
      </div>
    </div>
  );
}
