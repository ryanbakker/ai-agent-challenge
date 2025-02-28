import { Rocket } from "lucide-react";

type AgentPulseProps = {
  size?: "small" | "medium" | "large";
  color?: "light" | "dark";
};

function AgentPulse({ size, color }: AgentPulseProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const colorClasses = {
    dark: "text-indigo-600 dark:text-indigo-200",
    light: "text-indigo-50",
  };

  return (
    <Rocket
      className={`${sizeClasses[size!]} ${colorClasses[color!]}`}
      strokeWidth={2}
    />
  );
}

export default AgentPulse;
