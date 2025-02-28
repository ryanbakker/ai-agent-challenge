"use client";

import { FeatureFlag } from "@/features/flags";
import { useUser } from "@clerk/nextjs";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";
import Usage from "./Usage";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

function Transcriptions({ videoId }: { videoId: string }) {
  const { user } = useUser();

  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  console.log(user, videoId, setTranscript);

  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col border-gray-200 dark:border-gray-800">
      <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

      {/* Transcription */}
      {!featureUsageExceeded ? (
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
          {transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-sm text-gray-400 min-w-[50px]">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-gray-700">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No transcription available</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Transcriptions;
