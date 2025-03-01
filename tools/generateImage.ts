import { DalleImageGeneration } from "@/actions/dalleImageGeneration";
import { FeatureFlag } from "@/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";
import { getVideoDetails } from "@/actions/getVideoDetails";

export const generateImage = (videoId: string, userId: string) =>
  tool({
    description: "Generate an image",
    parameters: z.object({
      prompt: z
        .string()
        .optional()
        .describe(
          "Optional custom prompt to generate an image for. If not provided, will automatically generate based on video details"
        ),
      videoId: z.string().describe("The YouTube video ID"),
    }),
    execute: async ({ prompt, videoId }) => {
      try {
        console.log("Starting image generation process...");
        console.log("Video ID:", videoId);
        console.log("User ID:", userId);

        const schematicCtx = {
          company: { id: userId },
          user: {
            id: userId,
          },
        };

        const isImageGenerationEnabled = await client.checkFlag(
          schematicCtx,
          FeatureFlag.IMAGE_GENERATION
        );

        console.log("Image generation enabled:", isImageGenerationEnabled);

        if (!isImageGenerationEnabled) {
          console.log("Image generation is not enabled");
          return {
            error: "Image generation is not enabled, the user must upgrade",
          };
        }

        // If no prompt is provided, generate one based on video details
        if (!prompt) {
          console.log("No prompt provided, fetching video details...");
          const videoDetails = await getVideoDetails(videoId);
          if (!videoDetails) {
            console.log("Failed to fetch video details");
            return {
              error: "Failed to fetch video details",
            };
          }
          console.log("Video details fetched:", videoDetails.title);

          // Create an engaging thumbnail prompt based on video details
          prompt = `Create a visually striking YouTube thumbnail for a video titled "${videoDetails.title}". The thumbnail should be eye-catching and professional, incorporating modern YouTube thumbnail design trends. Include bold, readable text elements that capture attention. The style should be vibrant and high-contrast, optimized for both desktop and mobile viewing. Make it stand out in YouTube's suggested videos section. The image should be in 16:9 aspect ratio format.`;
        }

        console.log("Using prompt:", prompt);

        const imageResult = await DalleImageGeneration(prompt, videoId);
        console.log("Image generation completed:", imageResult);

        if (!imageResult?.imageUrl) {
          console.log("No image URL in result");
          return {
            error: "Failed to generate image - no URL returned",
          };
        }

        return {
          success: true,
          message: "Image generated successfully",
          image: imageResult,
        };
      } catch (error: any) {
        console.error("Error in image generation:", error);
        return {
          error: `Failed to generate image: ${
            error.message || "Unknown error"
          }`,
        };
      }
    },
  });
