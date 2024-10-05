import type { Metadata } from "next";
import "./globals.css";
import { UserContext } from "./context/userContext";

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
        <UserContext>
          <main>
            <div className="bg-gradient-to-br from-gray-200  to-gray-400 min-h-screen">
              {children}
            </div>
          </main>
        </UserContext>
      </body>
    </html>
  );
}
