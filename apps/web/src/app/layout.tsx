import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saas RBCA Next",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
