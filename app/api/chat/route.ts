import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";
import { z } from "zod";
import generateTitle from "@/tools/generateTitle";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  // headers: {
  //   "anthropic-beta": "token-efficient-tools-2025-02-19",
  // },
});

const model = google("gemini-1.5-flash");

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoDetails = await getVideoDetails(videoId);

  const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question is ${videoId} but you'll refer to this video as ${
    videoDetails?.title || "Selected Video"
  }. 

IMPORTANT INSTRUCTIONS FOR TITLE GENERATION:
- When the user asks to generate a title or when you receive a message containing "Generate a title", you MUST use the generateTitle tool.
- Do not try to generate the title yourself or use other methods.
- The generateTitle tool will handle fetching the transcript, generating the title, and storing it in the database.
- After using the generateTitle tool, explain to the user what happened and what the generated title is.

General Instructions:
- Use emojis to make the conversation more engaging.
- If an error occurs, explain it to the user and ask them to try again later.
- If the error suggests the user needs to upgrade, explain that they must upgrade to use the feature and tell them to go to 'Manage Plan' in the header.
- If any tool is used, analyze the response and if it contains a cache, explain that the transcript is cached because they previously transcribed the video saving the user a token - use words like database instead of cache to make it more easy to understand.
- Format responses for notion.`;

  const result = streamText({
    model,
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      ...messages,
    ],
    tools: {
      fetchTranscript: fetchTranscript,
      generateTitle: generateTitle,
      generateImage: generateImage(videoId, user.id),
      getVideoDetails: tool({
        description: "Get the details of a YouTube video",
        parameters: z.object({
          videoId: z.string().describe("The video ID to get the details for"),
        }),
        execute: async ({ videoId }) => {
          const videoDetails = await getVideoDetails(videoId);
          return { videoDetails };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
