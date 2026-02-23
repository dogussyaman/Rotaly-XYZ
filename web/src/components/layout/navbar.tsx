"use client";

import {Logo, MobileNav, SearchBar, UserActions} from "./navbar/index";


export function Navbar() {

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-16 sm:h-18 items-center gap-4">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <SearchBar />

        {/* Sağ taraf */}
        <UserActions />

        {/* Mobil Menü */}
        <MobileNav />
      </div>
    </nav>
  );
}
