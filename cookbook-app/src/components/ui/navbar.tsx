"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  //for future work
  const pathname = usePathname();

  const tabs = [
    { name: "Recipe Search", href: "/recipe-search" },
    { name: "Community", href: "/community" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="w-full border-b bg-card text-card-foreground shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <h1 className="text-lg font-bold">The Recipe Monster</h1>

        <div className="flex gap-6">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === tab.href
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
