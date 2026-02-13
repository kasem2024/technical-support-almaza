import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "دليل إستلام/إبلاغ",
  description: " تم الإنشاء هذا الدليل لمساعدتك في عملية إستلام أو إبلاغ عن الأجهزة التقنية بسهولة .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SidebarProvider className="overflow-x-hidden ">
      <AppSidebar />
      <main  className="bg-gradient-to-br from-slate-50 to-emerald-50">
         <SidebarTrigger className="z-50"  />
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}
