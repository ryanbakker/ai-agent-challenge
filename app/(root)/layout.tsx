import type { Metadata } from "next";
import "../globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AI Agent Challenge",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-[#0a0b0f]" suppressHydrationWarning>
        <ClientWrapper>
          <main className="group">{children}</main>
          <Toaster />
        </ClientWrapper>
      </body>
    </html>
  );
}
