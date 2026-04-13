interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const rounded = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const pos = i + 1;
    if (rounded >= pos) return "★";
    if (rounded >= pos - 0.5) return "½";
    return "☆";
  });

  return <span>{stars.join("")}</span>;
}
