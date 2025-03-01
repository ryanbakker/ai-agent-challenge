"use client";

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { Copy } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles = useQuery(api.titles.list, { videoId, userId: user?.id ?? "" });

  console.log(user, videoId);

  const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
    FeatureFlag.TITLE_GENERATIONS
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast.success("Copied to clipboard");
  };

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-transparent border-gray-200 dark:border-gray-800">
      <div className="min-w-52">
        <Usage
          featureFlag={FeatureFlag.TITLE_GENERATIONS}
          title="Generated Titles"
        />
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group relative p-4 rounded-lg border border-gray-100 bg-gray-50 dark:bg-gray-800  hover:border-blue-100 hover:bg-blue-50 dark:border-none transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-gray-900 leading-relaxed dark:text-gray-50">
                {title.title}
              </p>

              <button
                onClick={() => copyToClipboard(title.title)}
                className="group transition-opacity duration-200 p-1.5 hover:bg-blue-100 rounded-md dark:hover:bg-transparent cursor-pointer"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4 text-blue-600 dark:text-indigo-100 dark:hover:text-indigo-400 transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!titles?.length && !!isTitleGenerationEnabled && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No titles have been generated yet
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            Generate titles to see them here
          </p>
        </div>
      )}
    </div>
  );
}

export default TitleGeneration;
