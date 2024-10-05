import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Technical test Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-br from-gray-200  to-gray-400 min-h-screen">
      {children}
    </div>
  );
}
