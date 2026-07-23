export function getDonorboxCampaignId(donationUrl: string): string | null {
  const match = donationUrl.match(/donorbox\.org\/(?:embed\/)?([^/?#]+)/);
  return match?.[1] ?? null;
}
