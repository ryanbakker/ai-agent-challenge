"use server";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

export const createOrGetVideo = async (
  videoId: string,
  userId: string
): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const featureCheck = await checkFeatureUsageLimit(
    user.id,
    featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
  );

  if (!featureCheck.success) {
    return {
      success: false,
      error: featureCheck.error,
    };
  }

  try {
    const video = await convex.query(api.videos.getVideoById, {
      videoId,
      userId,
    });

    if (!video) {
      // Get video details from YouTube
      const videoDetails = await getVideoDetails(videoId);
      if (!videoDetails) {
        return {
          success: false,
          error: "Failed to fetch video details",
        };
      }

      // Create new video entry with title
      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId,
        title: videoDetails.title,
      });

      const newVideo = await convex.query(api.videos.getVideoById, {
        videoId: newVideoId,
        userId,
      });

      console.log("Tracking analyze video event...");
      await client.track({
        event: featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
        company: {
          id: userId,
        },
        user: {
          id: userId,
        },
      });

      return {
        success: true,
        data: newVideo!,
      };
    } else {
      // Update title if it doesn't exist
      if (!video.title) {
        const videoDetails = await getVideoDetails(videoId);
        if (videoDetails) {
          await convex.mutation(api.videos.updateVideoTitle, {
            videoId,
            userId,
            title: videoDetails.title,
          });
        }
      }

      return {
        success: true,
        data: video,
      };
    }
  } catch (error) {
    console.error("Error creating or getting video: ", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};
