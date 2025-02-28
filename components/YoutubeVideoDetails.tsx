"use client";

import PropagateLoader from "react-spinners/PropagateLoader";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { VideoDetails } from "@/types/types";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);
      if (video) {
        setVideo(video);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!video)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="opacity-60 dark:opacity-0">
          <PropagateLoader loading size={10} />
        </div>

        <div className="opacity-0 dark:opacity-60">
          <PropagateLoader loading size={10} color="#ffffff" />
        </div>
      </div>
    );

  // ! Add loaders

  const subscribers =
    typeof video.channel.subscribers === "string"
      ? parseInt(video.channel.subscribers)
      : video.channel.subscribers;

  const views =
    typeof video.views === "string" ? parseInt(video.views) : video.views;

  const likes =
    typeof video.likes === "string" ? parseInt(video.likes) : video.likes;

  const comments =
    typeof video.comments === "string"
      ? parseInt(video.comments)
      : video.comments;

  return (
    <div className="@container bg-white dark:bg-transparent rounded-xl">
      <div className="flex flex-col gap-8">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex-grow space-y-4">
          <h1 className="text-2xl @lg:text-3xl font-bold text-indigo-600 leading-tight line-clamp-2">
            {video.title}
          </h1>

          {/* Channel Info */}
          <div className="flex items-center gap-4 bg-indigo-50 dark:bg-[#141f38]/80 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-900 transition-all duration-300 p-3">
            <Image
              src={video.channel.thumbnail}
              alt={video.channel.title}
              width={48}
              height={48}
              className="w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100"
            />

            <div>
              <h2 className="text-base @md:text-lg font-semibold text-gray-400 line-clamp-2">
                {video.channel.title}
              </h2>
              <p className="text-sm @md:text-base text-indigo-500">
                {subscribers
                  ? new Intl.NumberFormat().format(subscribers)
                  : "0"}{" "}
                Subscribers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 @lg:gird-cols-4 gap-4 pt-1">
            <div className="bg-indigo-50 dark:bg-[#141f38]/80 p-6 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-900 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">Published</p>
              </div>

              <p className="font-medium text-indigo-500">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-[#141f38]/80 p-6 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-900 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">Views</p>
              </div>
              <p className="font-medium text-indigo-500">
                {views ? new Intl.NumberFormat().format(views) : "0"}{" "}
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-[#141f38]/80 p-6 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-900 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">Likes</p>
              </div>
              <p className="font-medium text-indigo-500">
                {likes ? new Intl.NumberFormat().format(likes) : "0"}{" "}
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-[#141f38]/80 p-6 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-900 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">Comments</p>
              </div>
              <p className="font-medium text-indigo-500">
                {comments ? new Intl.NumberFormat().format(comments) : "0"}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoDetails;
