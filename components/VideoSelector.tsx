"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "@/convex/_generated/dataModel";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { VideoDetails } from "@/types/types";

interface VideoSelectorProps {
  videos: Doc<"videos">[] | undefined;
  currentVideoId: string;
  onVideoChange: (videoId: string) => void;
}

export default function VideoSelector({
  videos,
  currentVideoId,
  onVideoChange,
}: VideoSelectorProps) {
  const [videoDetails, setVideoDetails] = useState<
    Record<string, VideoDetails>
  >({});

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!videos) return;

      const details: Record<string, VideoDetails> = {};
      for (const video of videos) {
        try {
          const videoDetail = await getVideoDetails(video.videoId);
          if (videoDetail) {
            details[video.videoId] = videoDetail;
          }
        } catch (error) {
          console.error(
            `Error fetching details for video ${video.videoId}:`,
            error
          );
        }
      }
      setVideoDetails(details);
    };

    fetchVideoDetails();
  }, [videos]);

  return (
    <div className="max-w-[350px]">
      <Select value={currentVideoId} onValueChange={onVideoChange}>
        <SelectTrigger className="dark:bg-[#141f38]/80 dark:border-[#233560]/80 dark:hover:border-indigo-900 dark:text-indigo-50 dark:hover:text-indigo-200 cursor-pointer truncate">
          <SelectValue placeholder="Select a video" className="truncate">
            <p className="pr-1.5">
              {videoDetails[currentVideoId]?.title || "Loading..."}
            </p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="dark:bg-[#141f38] dark:border-[#233560]/80 dark:hover:border-indigo-900 dark:text-indigo-50 dark:hover:text-indigo-200">
          {videos?.map((video) => (
            <SelectItem
              key={video.videoId}
              value={video.videoId}
              className="dark:hover:bg-indigo-950 dark:text-indigo-50 cursor-pointer truncate max-w-[550x] pr-6"
            >
              <p className="truncate max-w-[400px]">
                {videoDetails[video.videoId]?.title || "Loading..."}
              </p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
