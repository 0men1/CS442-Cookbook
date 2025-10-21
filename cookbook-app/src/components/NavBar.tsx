"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/ModeToggle";

export default function NavBar() {
  //for future work
  const pathname = usePathname();

  const tabs = [
    { name: "Recipe Search", href: "/search" },
    { name: "Community", href: "/community" },
    { name: "Guides", href:"/guides"},
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="w-full border-b bg-card text-card-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-md font-medium px-3 py-1 rounded-lg"
          >
            <h1>The Recipe Monster</h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
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

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium px-3 py-1.5 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Register
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
