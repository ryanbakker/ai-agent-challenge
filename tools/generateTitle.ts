import { titleGenerate } from "@/actions/titleGenerate";
import { tool } from "ai";
import { z } from "zod";
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";

const generateTitle = tool({
  description: "Generate a title for a YouTube video",
  parameters: z.object({
    videoId: z.string().describe("The video ID to generate a title for"),
  }),
  execute: async ({ videoId }) => {
    console.log(
      "🚀 [Title Tool] Starting title generation for video:",
      videoId,
      new Date().toISOString()
    );

    try {
      const convexClient = getConvexClient();
      console.log("✅ [Title Tool] Convex client initialized");
      const user = await currentUser();

      if (!user?.id) {
        console.error("❌ [Title Tool] No user found");
        throw new Error("User not authenticated");
      }

      console.log("✅ [Title Tool] User authenticated:", user.id);

      // Get the transcript
      console.log(
        "📝 [Title Tool] Fetching transcript...",
        new Date().toISOString()
      );
      const transcript = await convexClient.query(
        api.transcript.getTranscriptByVideoId,
        {
          videoId,
          userId: user.id,
        }
      );

      console.log("📝 [Title Tool] Transcript fetch result:", {
        timestamp: new Date().toISOString(),
        hasTranscript: !!transcript,
        transcriptLength: transcript?.transcript?.length || 0,
      });

      // Convert transcript to summary
      const videoSummary = transcript
        ? transcript.transcript.map((t: { text: string }) => t.text).join(" ")
        : "";

      console.log(
        "📝 [Title Tool] Created summary, length:",
        videoSummary.length,
        "at",
        new Date().toISOString()
      );

      // Default considerations for title generation
      const considerations = `
        - Keep it under 100 characters
        - Make it SEO friendly
        - Use engaging language
        - Include key topics from the video
        - Consider using numbers or interesting facts if present
      `;

      console.log(
        "🤖 [Title Tool] Calling titleGenerate function...",
        new Date().toISOString()
      );
      const title = await titleGenerate(videoId, videoSummary, considerations);
      console.log(
        "✅ [Title Tool] Title generated:",
        title,
        "at",
        new Date().toISOString()
      );

      return { title };
    } catch (error) {
      console.error(
        "❌ [Title Tool] Error in title generation:",
        error,
        "at",
        new Date().toISOString()
      );
      throw error;
    }
  },
});

export default generateTitle;
