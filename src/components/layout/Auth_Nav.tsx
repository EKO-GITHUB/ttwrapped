"use client";

import Data_Request_Button from "@/components/custom/data_request/Data_Request_Button";
import { Button } from "@/components/ui/button";
import { useData_store } from "@/stores/useData_store";
import { trpc } from "@/trpc/client";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Auth_Nav() {
  const view_state = useData_store((state) => state.view_state);
  const reset = useData_store((state) => state.reset);
  const { user } = useUser();
  const { data: tiktok_user } = trpc.tiktok.get_user.useQuery();
  const { refetch: fetch_my_data } = trpc.tiktok.get_my_data.useQuery(undefined, { enabled: false });

  useEffect(() => {
    if (tiktok_user) {
      user?.reload();
    }
  }, [tiktok_user, user]);

  const handle_download_data = async () => {
    const result = await fetch_my_data();
    if (result.data) {
      const json = JSON.stringify(result.data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ttwrapped_my_data.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

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
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Download my TTWrapped account data"
                  labelIcon={<Download className="h-4 w-4" />}
                  onClick={handle_download_data}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
