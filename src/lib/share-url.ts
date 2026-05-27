export function buildShareUrl(
  beerName: string,
  rating: number,
  platform: "twitter" | "facebook",
): string {
  if (platform === "twitter") {
    return `https://twitter.com/intent/tweet?text=I+rated+${beerName}+${rating}/5+stars`
  }

  return "https://www.facebook.com/sharer/sharer.php?u=https://brewboard.app"
}
