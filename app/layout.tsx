import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GENIUS DNA™ 天赋商业价值实验室",
  description: "解锁你的商业基因",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
