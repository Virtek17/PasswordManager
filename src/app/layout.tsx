import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Менеджер паролей",
  description: "Современный менеджер паролей с поддержкой групп",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-oid="b1jifow">
      <body className="antialiased" data-oid="hqec2:a">
        {children}
        <Script
          type="module"
          strategy="afterInteractive"
          src="https://cdn.jsdelivr.net/gh/onlook-dev/onlook@main/apps/web/client/public/onlook-preload-script.js"
          data-oid="zxbuq9a"
        />
      </body>
    </html>
  );
}
