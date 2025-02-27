"use server";

// import {getVideoIdFromUrl} from "@/lib/youtube/getVideoIdFromUrl";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();

  if (!url) return;

  const videoId = "abc"; // todo
  if (!videoId) return;

  redirect(`/video/${videoId}/analysis`);
}
