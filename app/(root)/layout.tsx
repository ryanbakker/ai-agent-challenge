import type { Metadata } from "next";
import "../globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "BoostCreator",
  description: "Boost your creative potential today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="dark:bg-[#0a0b0f]" suppressHydrationWarning>
      <ClientWrapper>
        <main className="group">{children}</main>
        <Toaster />
      </ClientWrapper>
    </body>
  );
}
