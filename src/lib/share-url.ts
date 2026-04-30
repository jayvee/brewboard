
export function buildShareUrl(beerName: string, rating: number, platform: "twitter" | "facebook"): string {
  const encodedBeerName = encodeURIComponent(beerName);
  const text = encodeURIComponent(`Check out this beer: ${beerName} - Rating: ${rating}/5`);

  if (platform === "twitter") {
    return `https://twitter.com/intent/tweet?text=${text}`;
  } else if (platform === "facebook") {
    // For Facebook, a URL to share is required. Assuming a placeholder for now as no specific URL is provided.
    // In a real application, this would be the actual URL of the beer review page.
    const urlToShare = encodeURIComponent(`https://example.com/beer/${encodedBeerName}`);
    return `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
  }

  // This case should ideally not be reached due to the platform type definition
  throw new Error("Unsupported sharing platform");
}
