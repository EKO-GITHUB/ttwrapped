"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Loader2 } from "lucide-react";

const DATA_CATEGORIES = [
  { name: "Profile", description: "Username, bio, and profile media" },
  { name: "Activity", description: "Comments, likes, favorites, and watch history" },
  { name: "Direct Messages", description: "Chat history with timestamps" },
  { name: "App Settings", description: "Privacy and notification preferences" },
  { name: "Login History", description: "Access dates, devices, and locations" },
  { name: "Ads & Data", description: "Ad interests and off-TikTok activity" },
  { name: "TikTok Shopping", description: "Cart, orders, and purchase history" },
  { name: "TikTok LIVE", description: "Stream history and earnings" },
];

export default function Request_Button({
  status,
  is_loading,
  on_request,
}: {
  status: string;
  is_loading: boolean;
  on_request: () => void;
}) {
  const [open, set_open] = useState(false);
  const [confirm_request, set_confirm_request] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(is_open) => {
        set_open(is_open);
        if (!is_open) set_confirm_request(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          disabled={is_loading}
          className="gap-2"
        >
          {is_loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Request Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Request Your TikTok Data
          </DialogTitle>
          <DialogDescription className="pt-2 text-left">
            {status === "expired"
              ? "Your previous request expired. Request a new copy of your data."
              : "We'll request a full export of your TikTok data on your behalf."}
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm">
          <p className="text-muted-foreground mb-3">This request includes:</p>
          <ul className="grid grid-cols-2 gap-2">
            {DATA_CATEGORIES.map((category) => (
              <li
                key={category.name}
                className="text-muted-foreground"
              >
                <span className="font-medium text-foreground">{category.name}</span>
                <span className="text-xs block">{category.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          {confirm_request ? (
            <div className="flex w-full justify-center gap-2">
              <Button
                onClick={() => {
                  on_request();
                  set_open(false);
                  set_confirm_request(false);
                }}
                disabled={is_loading}
                size="sm"
                className="grow gap-2"
              >
                {is_loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Yes, Request Data
              </Button>
              <Button
                variant="outline"
                onClick={() => set_confirm_request(false)}
                disabled={is_loading}
                size="sm"
                className="grow"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => set_confirm_request(true)}
              disabled={is_loading}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Request Data
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
