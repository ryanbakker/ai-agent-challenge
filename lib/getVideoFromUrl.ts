export function getVideoIdFromUrl(url: string): string | null {
  let videoId: string | null = null;

  if (url.includes("youtu.be/")) {
    // Shortened URL format
    videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("youtube.com/shorts/")) {
    // Shorts URL format
    videoId = url.split("shorts/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("v=")) {
    // Standard URL format
    videoId = url.split("v=")[1]?.split("&")[0] || null;
  }

  return videoId;
}
