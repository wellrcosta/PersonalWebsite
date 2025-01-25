"use client";

import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/lib/auth-context";
import { AuthDialog } from "./auth-dialog";

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-6 w-6" aria-hidden="true" />
              <span className="font-semibold">Wellington Reis</span>
            </Link>
            <nav className="flex gap-4">
              <Button
                variant={pathname === "/" ? "secondary" : "ghost"}
                asChild
              >
                <Link href="/">Home</Link>
              </Button>
              <Button
                variant={pathname === "/blog" ? "secondary" : "ghost"}
                asChild
              >
                <Link href="/blog">Blog</Link>
              </Button>
              <Button
                variant={pathname === "/tasks" ? "secondary" : "ghost"}
                asChild
              >
                <Link href="/tasks">Tasks</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <AuthDialog>
                <Button>Sign In</Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
