import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coupon redemption",
  description: "Technical test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="bg-gradient-to-br from-gray-200  to-gray-400 min-h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
