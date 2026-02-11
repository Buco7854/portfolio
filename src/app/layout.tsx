import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/api";
import { generateAccentStyles } from "@/lib/color";
import ThemeProvider from "@/components/theme/ThemeProvider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const accentCss = settings?.accent_color
    ? generateAccentStyles(settings.accent_color)
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {accentCss && (
          <style dangerouslySetInnerHTML={{ __html: accentCss }} />
        )}
      </head>
      <body className="font-sans antialiased bg-surface text-text min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
