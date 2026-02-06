import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Package } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="border-b bg-card/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-0">
            <span className="text-xl font-bold">Pack</span>
            <span className="text-xl font-bold text-blue-500">Track</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">Customer Login</Button>
            </SignInButton>
            <Button variant="outline" asChild>
              <Link href="/admin/login">Admin Portal</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
