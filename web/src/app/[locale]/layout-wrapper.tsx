"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/components/chat/chat-widget";
import ChatWidgetMobile from "@/components/chat/chat-widget-mobil";

type Props = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: Props) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");
  const isAuth = pathname.includes("/(auth)") || pathname.includes("/login") || pathname.includes("/register") || pathname.includes("/reset-password");

  if (isDashboard || isAuth) {
    // Dashboard ve Auth layout - navbar ve footer yok
    return (
      <div className="min-h-screen bg-background">
        {children}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    );
  }

  // Normal layout - navbar ve footer ile
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 w-full max-w-7xl mx-auto px-0 min-h-[60vh]">
          {children}
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
        <ChatWidget />
        <ChatWidgetMobile />
      </div>
      <Footer />
    </div>
  );
}