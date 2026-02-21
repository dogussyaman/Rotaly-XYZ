import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <div className="relative grid min-h-screen w-full grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div
          style={{
            backgroundImage: "url('/rtl.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative hidden md:block"
        />

        <div className="relative flex items-center justify-center bg-background/80 dark:bg-slate-950/85 backdrop-blur-xl px-6 py-8 md:px-10 md:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between md:hidden">
              <div>
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">
                  Rotaly Travel
                </div>
                <div className="text-lg font-semibold">
                  Hesabınıza giriş yapın
                </div>
              </div>
              <Link
                href="/"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Ana sayfaya dön
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
