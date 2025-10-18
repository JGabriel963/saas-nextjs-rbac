import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Saas RBCA Next",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
