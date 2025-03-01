import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import VideoForm from "@/components/VideoForm";
import {
  AlignJustify,
  Brain,
  Github,
  ImageIcon,
  MessageSquare,
  Rocket,
  Sparkles,
  Video,
} from "lucide-react";
import Link from "next/link";

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
    <>
      <Header />

      <div className="min-h-screen">
        <section
          className="py-20 bg-gradient-to-tr from-indigo-800 to-indigo-500 dark:from-indigo-950 dark:to-indigo-700"
          id="hero"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-10 text-center mb-12">
              <div className="flex flex-col items-center gap-5">
                <Rocket className="w-16 h-16 text-indigo-200" size={2} />
                <h1 className=" text-6xl uppercase font-extrabold bg-gradient-to-tr bg-clip-text from-indigo-400 to-indigo-50 text-transparent max-w-[700px]">
                  Boost Your Creating Potential
                </h1>
              </div>
              <p className="text-indigo-50 max-w-[600px]">
                Your AI-powered creative companion. Get instant video analysis,
                engaging scripts, and actionable insights to elevate your
                content.
              </p>

              <VideoForm />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-[#0f172a]/80">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800 dark:text-indigo-200">
              Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="bg-indigo-50 dark:bg-[#141f38]/80 p-6 rounded-xl border border-indigo-100 dark:border-[#233560]/80 hover:border-indigo-500 dark:hover:border-indigo-800 transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-indigo-100 dark:bg-indigo-700/20`}
                    >
                      <Icon
                        className={`w-6 h-6 text-indigo-600 dark:text-indigo-200`}
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-300 dark:group-hover:text-indigo-400 transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-indigo-900/60 dark:text-indigo-300/50 dark:group-hover:text-indigo-300/60 text-sm transition-all">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800 dark:text-indigo-200">
              Meet Your AI Agent in 3 Simple Steps
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={index}
                    className="text-center border p-6 rounded-xl bg-white dark:bg-slate-700 dark:border-slate-600 shadow-md hover:shadow-lg transition-all dark:hover:border-indigo-600 hover:scale-[1.01]"
                  >
                    <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 dark:from-indigo-900 dark:to-indigo-700">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-100">
                      {step.title}
                    </h3>
                    <p className="text-indigo-900/60 dark:text-indigo-200/50">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="py-30 px-5 md:px-0 bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-950 dark:to-indigo-800">
          <div className="text-center flex flex-col gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Meet Your AI Content Agent?
              </h2>
              <p className="text-lg text-indigo-50">
                Join creators leveraging AI to unlock content insights
              </p>
            </div>

            <div className="flex gap-8 mx-auto flex-col md:flex-row">
              <Link href="/sign-up">
                <Button
                  className="dark:text-indigo-50 px-10 py-5 dark:bg-transparent dark:border-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-600 transition-all cursor-pointer"
                  variant="outline"
                >
                  Sign Up
                </Button>
              </Link>

              <Link href="/#hero">
                <Button
                  className="px-10 py-5 dark:bg-indigo-50 dark:border-indigo-50 dark:text-indigo-950 transition-all cursor-pointer dark:hover:text-indigo-600 dark:hover:bg-indigo-100"
                  variant="outline"
                >
                  Analyze Video
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="dark:bg-[#0f172a]/80 py-10">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Rocket
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-200"
                  size={2}
                />
                <h2 className="text-2xl font-semibold bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-100 bg-clip-text text-transparent from-indigo-700 to-indigo-400">
                  BoostCreator
                </h2>
              </Link>
            </div>
            <p className="text-indigo-200">Ryan Bakker</p>
            <div>
              <Link
                href="https://github.com/ryanbakker/ai-agent-challenge"
                target="_blank"
              >
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-950 dark:bg-[#141f38]/80 dark:border-[#233560]/80 px-8! dark:hover:border-indigo-900 transition-all duration-200 dark:hover:text-indigo-200 py-5!"
                >
                  <Github /> GitHub Repo
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
