import AgentPulse from "@/components/AgentPulse";
import VideoForm from "@/components/VideoForm";
import {
  AlignJustify,
  Brain,
  ImageIcon,
  MessageSquare,
  Sparkles,
  Video,
} from "lucide-react";

const features = [
  {
    title: "AI Analysis",
    description:
      "Get deep insights into your video content with our advanced AI analysis. Understand viewer engagement and content quality.",
    icon: Brain,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Smart Transcription",
    description:
      "Get accurate transcriptions of your videos. Perfor for creating subtitles, blog posts, or repurposing your content.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Thumbnail Generation",
    description:
      "Generate eye-catching thumbnails using AI. Boost your click-through rates with compelling visuals.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Title Generation",
    description:
      "Create attention-grabbing, SEO-optimized titles for your videos using AI. Maximize views with titles that resonate with your audience.",
    icon: AlignJustify,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Shot Script",
    description:
      "Get detailed, step-by-step instructions to recreate viral videos. Learn shooting techniques, angles, and editing tips from successful content.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Discuss with Your AI Agent",
    description:
      "Engage in deep conversations about your content strategy, brainstorm ideas, and unlock new creative possibilities with your AI agent companion.",
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const steps = [
  {
    title: "1. Connect Your Content",
    description: "Share your YouTube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic reccomendations",
    icon: MessageSquare,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-indigo-600 to-indigo-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
            <div className="flex flex-row items-center gap-5">
              <AgentPulse size="large" color="indigo" />
              <h1 className=" text-6xl uppercase font-semibold bg-gradient-to-tr bg-clip-text from-indigo-300 to-indigo-50 text-transparent">
                AI Agent
              </h1>
            </div>
            <p className="text-indigo-50">
              The AI for creators. Saving you time with script creation, and
              video analysing, so you can fcous on one thing. Creating.
            </p>

            <VideoForm />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">
            Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:border-indigo-500 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-indigo-100`}
                  >
                    <Icon className={`w-6 h-6 text-indigo-600`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-indigo-800">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-900/60">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-indigo-800">
                    {step.title}
                  </h3>
                  <p className="text-indigo-900/60">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-20 px-5 md:px-0 bg-gradient-to-r from-indigo-600 to-indigo-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Meet Your AI Content Agent?
          </h2>
          <p className="text-xl text-indigo-50">
            Join creators leveraging AI to unlock content insights
          </p>
        </div>
      </footer>
    </div>
  );
}
