
export function buildShareUrl(beerName: string, rating: number, platform: "twitter" | "facebook"): string {
  const text = encodeURIComponent(`Check out this beer: ${beerName} - Rating: ${rating}/5`);

  if (platform === "twitter") {
    return `https://twitter.com/intent/tweet?text=${text}`;
  } else if (platform === "facebook") {
    const urlToShare = encodeURIComponent(`https://example.com/beer/${beerName}`);
    return `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
  }

  throw new Error("Unsupported sharing platform");
}
