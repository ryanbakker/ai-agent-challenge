"use server";

import { getVideoIdFromUrl } from "@/lib/getVideoFromUrl";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();

  if (!url) return;

  const videoId = getVideoIdFromUrl(url);
  if (!videoId) return;

  // Redirect to video analysis page
  redirect(`/video/${videoId}/analysis`);
}
