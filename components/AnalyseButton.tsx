"use client";

import { useFormStatus } from "react-dom";

function AnalyseButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-[10px] text-white bg-indigo-400 dark:bg-indigo-950 rounded-lg hover:bg-indigo-500 dark:hover:bg-indigo-950/80 focus:outline-none focus:ring-2 focus:eing-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium hover:cursor-pointer"
    >
      {pending ? "Seeking" : "Seek"}
    </button>
  );
}

export default AnalyseButton;
