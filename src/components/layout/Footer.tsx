"use client";

import Link from "next/link";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import { useMobile } from "@/hooks/useMobile";
import React from "react";

export default function Footer() {
  const is_mobile = useMobile();
  const current_year = new Date().getFullYear();

  return (
    <div className="mx-auto w-full p-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white p-4 shadow-xl backdrop-blur-lg">
        {is_mobile ? (
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap justify-around gap-4">
              <Logo />
              <Author_Link show_details={false} />
            </div>
            <Features />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Logo />
            <Features />
            <Author_Link show_details={true} />
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-2 border-t border-black/10 pt-4 md:flex-row">
          <span className="text-xs text-black/50">© {current_year} TTWrapped. All rights reserved.</span>
          <Legal_Links />
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="ttwrapped logo"
      />
      <span className="text-lg font-semibold text-black/80">TTWrapped</span>
    </div>
  );
}

function Features() {
  return (
    <div className="flex items-center gap-6 text-xs text-black/60 sm:text-sm">
      <span>100% open source</span>
      <span>Privacy-first</span>
      <span>Client-side processing</span>
    </div>
  );
}

function Author_Link({ show_details }: { show_details: boolean }) {
  return (
    <Link
      className="flex transform items-center gap-3 rounded-xl bg-black/5 p-2.5 transition-all duration-100 hover:bg-black/10"
      href="https://github.com/EKO-GITHUB"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="rounded-full border-2 border-white/80"
        width={28}
        height={28}
        src="https://avatars.githubusercontent.com/u/25434461?v=4"
        alt="Murad Tochiev profile"
      />
      {show_details && (
        <div className="text-left">
          <div className="text-sm font-semibold">Murad Tochiev</div>
          <div className="text-xs text-black/60">@EKO-GITHUB</div>
        </div>
      )}
      <GithubIcon
        className="text-black/80"
        size={18}
      />
    </Link>
  );
}

function Legal_Links() {
  return (
    <div className="flex items-center gap-4 text-xs text-black underline transition-colors hover:text-black/80">
      <Link href="/terms">Terms of Service</Link>
      <Link href="/usage">Usage Guidelines</Link>
    </div>
  );
}
