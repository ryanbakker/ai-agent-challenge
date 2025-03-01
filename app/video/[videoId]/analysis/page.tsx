"use client";

import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import Transcriptions from "@/components/Transcriptions";
import { Button } from "@/components/ui/button";
import Usage from "@/components/Usage";
import YoutubeVideoDeatils from "@/components/YoutubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiAgentChat from "@/components/AiAgentChat";
import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { createOrGetVideo } from "@/actions/createOrGetVideo";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import VideoSelector from "@/components/VideoSelector";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const { user } = useUser();
  const router = useRouter();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  // Fetch all user videos
  const userVideos = useQuery(api.videos.getAllUserVideos, {
    userId: user?.id ?? "",
  });

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      const response = await createOrGetVideo(videoId as string, user.id);
      if (!response.success) {
        toast("Failed to analyze video!");
      } else {
        setVideo(response.data!);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  // Handle video selection change
  const handleVideoChange = (newVideoId: string) => {
    router.push(`/video/${newVideoId}/analysis`);
  };

  const VideoTranscriptionStatus =
    video === undefined ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-700">Loading...</span>
      </div>
    ) : !video ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 rounded-full">
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
        <p className="text-xs text-amber-600 font-medium">
          This is your first time analyzing this video, 1 token used <br />
        </p>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full dark:bg-green-900/30 dark:border-green-900">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-sm text-green-700 dark:text-green-500">
          Existing video analysis - no additional tokens used!
        </p>
      </div>
    );

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <section className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 dark:bg-transparent dark:border-gray-800 p-6 w-full">
          <div className="flex justify-between items-center w-full">
            <Button
              variant="outline"
              className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-950 dark:bg-[#141f38]/80 dark:border-[#233560]/80 dark:hover:border-indigo-900 transition-all duration-200 dark:hover:text-indigo-200"
            >
              <Link href="/">Return</Link>
            </Button>

            <VideoSelector
              videos={userVideos}
              currentVideoId={videoId}
              onVideoChange={handleVideoChange}
            />
          </div>

          {/* Analysis */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Analyse Video"
            />

            {VideoTranscriptionStatus}
          </div>

          {/* Video Details */}
          <YoutubeVideoDeatils videoId={videoId} />

          {/* Thumbnail Generation */}
          <ThumbnailGeneration videoId={videoId} />

          {/* Title Generation */}
          <TitleGeneration videoId={videoId} />

          {/* Transcriptions */}
          <Transcriptions videoId={videoId} />
        </section>

        {/* Right Side */}
        <section className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6em)]">
          <AiAgentChat videoId={videoId} />
        </section>
      </div>
    </div>
  );
}

export default AnalysisPage;
