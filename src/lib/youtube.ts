export function getYoutubeVideoId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /[?&]v=([^&]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

export function getYoutubeThumbnail(url: string): string {
  const id = getYoutubeVideoId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "/placeholder.png";
}

export function getYoutubeWatchUrl(url: string): string {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}
