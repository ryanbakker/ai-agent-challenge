import { ReactNode } from "react";
import ClientWrapper from "@/components/ClientWrapper";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Metadata } from "next";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "BoostCreator - Login",
  description: "Boost your creative potential today!",
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <body className="bg-[#151922] overflow-hidden" suppressHydrationWarning>
      <ClientWrapper>
        <main className="signContainer">
          <section className="main">
            <div className=" py-12 w-[95vw] max-w-[450px] flex flex-col items-center drop-shadow-xl relative">
              <div className="bg-indigo-950 rounded-lg h-full w-full absolute -z-10 top-0 left-0 opacity-65 shadow-xl" />
              <Link href="/" className="flex items-center gap-2 pb-4">
                <Rocket
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-200"
                  size={2}
                />
                <h1 className="text-2xl font-semibold bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-100 bg-clip-text text-transparent from-indigo-700 to-indigo-400">
                  BoostCreator
                </h1>
              </Link>

              <p className="pb-8 max-w-[220px] text-indigo-200/70 text-center text-sm">
                Sign in and boost your creative potential today!
              </p>

              {children}
            </div>
          </section>
        </main>
      </ClientWrapper>
    </body>
  );
}

export default AuthLayout;
