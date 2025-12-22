"use client";

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
import { Globe, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Region_Modal() {
  const [open, set_open] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={set_open}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-muted-foreground gap-2"
        >
          <Info className="h-4 w-4" />
          Request Unavailable
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Region Restriction
          </DialogTitle>
          <DialogDescription className="pt-2 text-left">
            Your location doesn&apos;t qualify for automatic data requests. This feature is only available to users in
            the European Economic Area (EEA) and the United Kingdom due to data portability regulations.
          </DialogDescription>
        </DialogHeader>
        <Image
          src="/world_eea_uk.svg"
          alt="Map highlighting EEA and UK regions"
          width={400}
          height={200}
          className="mx-auto"
        />
        <div className="text-muted-foreground text-sm">
          <p className="mb-2">You can still export your TikTok data manually:</p>
          <ol className="list-inside list-decimal space-y-1">
            <li>Open the TikTok app</li>
            <li>Go to Settings → Privacy → Download your data</li>
            <li>Request your data and wait for TikTok to prepare it</li>
            <li>Download the ZIP file and upload it here</li>
          </ol>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => set_open(false)}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
