"use client";

import { Message, useChat } from "@ai-sdk/react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/features/flags";
import { ImageIcon, LetterText, PenIcon } from "lucide-react";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: Record<string, unknown>;
}

interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";
  return `🛠️ Tool Used: ${part.toolInvocation.toolName}`;
};

function AiAgentChat({ videoId }: { videoId: string }) {
  const { messages, input, handleInputChange, handleSubmit, append, status } =
    useChat({
      maxSteps: 5,
      body: {
        videoId,
      },
    });

  const isScriptGenerationEnabled = useSchematicFlag(
    FeatureFlag.SCRIPT_GENERATION
  );
  const isImageGenerationEnabled = useSchematicFlag(
    FeatureFlag.IMAGE_GENERATION
  );
  const isTitleGenerationEnabled = useSchematicFlag(
    FeatureFlag.TITLE_GENERATIONS
  );
  const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.ANALYSE_VIDEO);

  // Generate Transcript Shortcut
  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: Message = {
      id: `generate-script-${randomId}`,
      role: "user",
      content:
        "Generate a step-by-step shooting script for this video that I can use on my own channel to produce a video that is similar to this one, dont do any other steps such as generating a image, just generate the script only!",
    };
    append(userMessage);
  };

  const generateImage = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const userMessage: Message = {
      id: `generate-image-${randomId}`,
      role: "user",
      content: "Generate a thumbnail for this video",
    };
    append(userMessage);
  };

  const generateTitle = async () => {
    console.log("🚀 [UI] Generate title button clicked");
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log("🔍 [UI] Generated random ID:", randomId);
    const userMessage: Message = {
      id: `generate-title-${randomId}`,
      role: "user",
      content:
        "Generate a title for this video. Please analyze the video details and transcript to create an SEO-optimized, engaging title that accurately represents the content. Consider current YouTube trends and best practices for title optimization.",
    };
    console.log("📝 [UI] Appending user message:", userMessage);
    append(userMessage);
    console.log("✅ [UI] Message appended to chat");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Boost Assistant
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-500">
                  Welcome to AI Agent Chat
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Ask any question about your video!
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === "user" ? "bg-blue-500" : "bg-gray-100"
                } rounded-xl px-4 py-3`}
              >
                {message.parts && message.role === "assistant" ? (
                  // Assistant Message

                  <div className="space-y-3">
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div key={i} className="prose prose-sm max-w-none">
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      ) : part.type === "tool-invocation" ? (
                        <div
                          key={i}
                          className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"
                        >
                          <div className="font-medium text-xs">
                            {formatToolInvocation(part as ToolPart)}
                          </div>

                          {(part as ToolPart).toolInvocation.result && (
                            <pre className="text-xs bg-white/75 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(
                                (part as ToolPart).toolInvocation.result,
                                null,
                                2
                              )}
                            </pre>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  // User Message
                  <div className="prose prose-sm max-w-none text-white">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="border rounded-xl border-gray-100 p-4 bg-white dark:bg-[#141f38]/80 dark:border-[#233560]/80 dark:hover:border-indigo-900 dark:text-indigo-5 mr-4">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={
                !isVideoAnalysisEnabled
                  ? "Upgrade to ask anything about your video..."
                  : "Ask anything about your video..."
              }
              className="flex-1 px-4 py-2 text-sm border border-gray-200 dark:border-indigo-800 dark:text-indigo-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent dark:focus:ring-0 dark:focus:border-indigo-500"
            />

            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-700 dark:hover:bg-transparent dark:border dark:border-indigo-800 dark:hover:border-indigo-900 dark:hover:text-indigo-200 cursor-pointer"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isVideoAnalysisEnabled
              }
            >
              {status === "streaming"
                ? "AI is replying..."
                : status === "submitted"
                ? "AI is thinking..."
                : "Send"}
            </Button>
          </form>

          <div className="flex gap-2">
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:border-indigo-800 dark:border dark:text-indigo-50 dark:hover:text-indigo-200 dark:hover:border-indigo-600 cursor-pointer"
              onClick={generateScript}
              type="button"
              disabled={!isScriptGenerationEnabled}
            >
              <LetterText className="w-4 h-4" />
              {isScriptGenerationEnabled ? (
                <span>Generate Script</span>
              ) : (
                <span>Upgrade to generate a script</span>
              )}
            </button>

            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:border-indigo-800 dark:border dark:text-indigo-50 dark:hover:text-indigo-200 dark:hover:border-indigo-600 cursor-pointer"
              onClick={generateTitle}
              type="button"
              disabled={!isTitleGenerationEnabled}
            >
              <PenIcon className="w-4 h-4" />
              {isTitleGenerationEnabled ? (
                <span>Generate Title</span>
              ) : (
                <span>Upgrade to generate a title</span>
              )}
            </button>

            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:border-indigo-800 dark:border dark:text-indigo-50 dark:hover:text-indigo-200 dark:hover:border-indigo-600 cursor-pointer"
              onClick={generateImage}
              type="button"
              disabled={!isImageGenerationEnabled}
            >
              <ImageIcon className="w-4 h-4" />
              {isImageGenerationEnabled ? (
                <span>Generate Image</span>
              ) : (
                <span>Upgrade to generate a image</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;
