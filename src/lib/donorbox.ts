export function getDonorboxEmbedUrl(donationUrl: string): string | null {
  const match = donationUrl.match(/donorbox\.org\/(?:embed\/)?([^/?#]+)/);
  if (!match?.[1]) {
    return null;
  }

  return `https://donorbox.org/embed/${match[1]}`;
}
