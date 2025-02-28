"use client";

import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import Transcriptions from "@/components/Transcriptions";
import { Button } from "@/components/ui/button";
import Usage from "@/components/Usage";
import YoutubeVideoDeatils from "@/components/YoutubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import Link from "next/link";
import { useParams } from "next/navigation";
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

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const { user } = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      const response = await createOrGetVideo(videoId as string, user.id);
      if (!response.success) {
        // toast
      } else {
        setVideo(response.data!);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  const VideoTranscriptionStatus =
    video === undefined ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-700">Loading...</span>
      </div>
    ) : !video ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <p className="text-sm text-amber-700">
          This is your first time analyzing this video. <br />
          <span className="font-semibold">
            (1 Analysis token in being used!)
          </span>
        </p>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <p className="text-sm text-green-700">
          Analysis exists for this video - no additional tokens needed in future
          calls!
        </p>
      </div>
    );

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <section className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 dark:bg-transparent dark:border-gray-800 p-6">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-950 transition-all duration-200"
            >
              <Link href="/">Return</Link>
            </Button>

            {/* <div className="flex w-full">
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={video ? video?.title : "Loading..."}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="a">Placeholder</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
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
