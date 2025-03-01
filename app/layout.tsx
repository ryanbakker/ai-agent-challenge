import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      {children}
    </html>
  );
}
