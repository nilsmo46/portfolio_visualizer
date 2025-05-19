import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
console.log(process.env)
export const metadata: Metadata = {
  title: "Portfolio Visualizer",
  description: "Portfolio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow no-scrollbar">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
