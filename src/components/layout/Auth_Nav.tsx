"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useData_store } from "@/stores/useData_store";
import Image from "next/image";
import Link from "next/link";

export default function Auth_Nav() {
  const { user } = useUser();
  const view_state = useData_store((state) => state.view_state);
  const reset = useData_store((state) => state.reset);

  const tiktokAccount = user?.externalAccounts.find((acc) => acc.provider === "tiktok");
  console.log(user);

  if (view_state === "slideshow") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={reset}
        >
          <Image
            src="/logo.svg"
            width={28}
            height={28}
            alt="TTWrapped logo"
          />
          <span className="text-lg font-semibold text-black/80">TTWrapped</span>
        </Link>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
            {tiktokAccount && tiktokAccount.username}
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
