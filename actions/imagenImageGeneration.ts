"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { ImageGenerationClient } from "@google-cloud/vertexai";

const IMAGE_SIZE = "1792x1024" as const;
const convexClient = getConvexClient();

export const ImagenImageGeneration = async (
  prompt: string,
  videoId: string
) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const imageClient = new ImageGenerationClient({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID!,
  });

  if (!prompt) {
    throw new Error("Failed to generate image prompt");
  }

  console.log("Generating image with prompt: ", prompt);

  // Generate the image using Imagen
  const [imageResponse] = await imageClient.generateImage({
    prompt: prompt,
    model: "imagen-3.0-generate-002",
    sampleCount: 1,
    sampleImageSize: {
      width: 1792,
      height: 1024,
    },
  });

  const imageUrl = imageResponse.images[0]?.uri;

  if (!imageUrl) {
    throw new Error("Failed to generate image");
  }

  // Step 1: Get short-lived upload URL for Convex
  console.log("Getting upload URL...");
  const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
  console.log("Got upload URL");

  // Step 2: Download image from the URL
  console.log("Downloading image from Imagen...");
  const image: Blob = await fetch(imageUrl).then((res) => res.blob());
  console.log("Download image successfully");

  // Step 3: Upload image to convex storage bucket
  console.log("Uploading image to storage...");
  const result = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": image!.type },
    body: image,
  });

  const { storageId } = await result.json();
  console.log("Uploaded image to storage successfully: ", storageId);

  // Step 4: Save the newly allocated storage id to the db
  console.log("Saving image reference to database...");
  await convexClient.mutation(api.images.storeImage, {
    storageId: storageId,
    videoId,
    userId: user.id,
  });
  console.log("Saved image reference to database");

  // Get serve image url
  const dbImageUrl = await convexClient.query(api.images.getImage, {
    videoId,
    userId: user.id,
  });

  // Track image generation event
  await client.track({
    event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
    company: {
      id: user.id,
    },
    user: {
      id: user.id,
    },
  });

  return {
    imageUrl: dbImageUrl,
  };
};
