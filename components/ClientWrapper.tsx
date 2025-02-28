"use client";

import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
import { ConvexClientProvider } from "./ConexClientProvider";
import { ThemeProvider } from "./themes/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schematicPubKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;

  if (!schematicPubKey) {
    throw new Error("No Publish Key");
  }

  return (
    <ConvexClientProvider>
      <SchematicProvider publishableKey={schematicPubKey}>
        <SchematicWrapped>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SchematicWrapped>
      </SchematicProvider>
    </ConvexClientProvider>
  );
}
