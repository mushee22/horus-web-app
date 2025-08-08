
import QueryClientContextProvider from "@/context/query-client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DisableZoom from "@/components/elements/disable-zoom";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horus Financial Learning Academy",
  description: "Horus Financial Academy is a premier financial learning academy dedicated to equipping you with the knowledge and skills to navigate the financial markets. From foundational concepts to advanced strategies, we teach you how to analyze price momentum, identify key market levels, and make informed trading decisions using technical tools and real-world insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {/* <SideBar/> */}
        <QueryClientContextProvider>
          {children}
          <DisableZoom/>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
