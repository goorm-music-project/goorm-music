import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groom Music",
  description: "음악 추천 웹서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
