"use client";
import LogoMobile from "@/components/common/logo-mobile";
import "./globals.css";
import { Inter } from "next/font/google";
import BurguerMenu from "@/components/common/burguerMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className + " min-h-screen bg-slate-100"}>
          <div className="flex flex-wrap justify-between w-full items-center bg-white shadow-lg">
            <div className="px-4">
              <LogoMobile />
            </div>
            <div className="px-8">
              <BurguerMenu />
            </div>
          </div>
          {children}
        </body>
      </html>
    </>
  );
}
