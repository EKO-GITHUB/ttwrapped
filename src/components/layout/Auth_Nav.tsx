"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Data_Request_Button from "@/components/custom/data_request/Data_Request_Button";
import { useData_store } from "@/stores/useData_store";
import { trpc } from "@/trpc/client";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Auth_Nav() {
  const view_state = useData_store((state) => state.view_state);
  const reset = useData_store((state) => state.reset);
  const { user } = useUser();
  const { data: tiktok_user } = trpc.tiktok.get_user.useQuery();

  useEffect(() => {
    if (tiktok_user) {
      user?.reload();
    }
  }, [tiktok_user, user]);

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
                className={"hover:cursor-pointer"}
                size="sm"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Data_Request_Button />
            <UserButton
              showName
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
