"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function Unavailable_Button() {
  const [open, set_open] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Dialog
        open={open}
        onOpenChange={(is_open) => {
          set_open(is_open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Lock className="h-4 w-4" />
            Unavailable
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Permission Required
            </DialogTitle>
            <DialogDescription className="pt-2 text-left">
              This feature allows TTWrapped to automatically request and download your TikTok data on your behalf,
              without needing to manually export it from the TikTok app. This requires the data portability permission,
              which is currently under review by the TikTok developer team. We appreciate your patience.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
