"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#05070a] text-slate-200 antialiased`}>
        {isLoginPage ? (
          <main>{children}</main>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col">
              <TopBar />
              <div className="p-8 cyber-grid flex-1">
                {children}
              </div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
