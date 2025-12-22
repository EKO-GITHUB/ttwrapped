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
import { Clock, Loader2, RefreshCw, X } from "lucide-react";
import { useState } from "react";

export default function Pending_Button({
  is_cancelling,
  is_refreshing,
  on_cancel,
  on_refresh,
}: {
  is_cancelling: boolean;
  is_refreshing: boolean;
  on_cancel: () => void;
  on_refresh: () => void;
}) {
  const [open, set_open] = useState(false);
  const [confirm_cancel, set_confirm_cancel] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Dialog
        open={open}
        onOpenChange={(is_open) => {
          set_open(is_open);
          if (!is_open) set_confirm_cancel(false);
        }}
      >
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Pending
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Request Pending
            </DialogTitle>
            <DialogDescription className="pt-2 text-left">
              Your data request is being processed by TikTok. This can take anywhere from a few hours to several days
              depending on the size of your data.
            </DialogDescription>
          </DialogHeader>
          <div className="text-muted-foreground text-sm">
            <p>
              The status is automatically checked when you visit this page. You can also manually refresh the status
              below.
            </p>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => {
                on_refresh();
              }}
              disabled={is_refreshing}
              className="gap-2"
            >
              {is_refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh Status
            </Button>
            {confirm_cancel ? (
              <div className="flex w-full justify-center gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    on_cancel();
                    set_open(false);
                    set_confirm_cancel(false);
                  }}
                  disabled={is_cancelling}
                  size="sm"
                  className="grow gap-2"
                >
                  {is_cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                  Yes, Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => set_confirm_cancel(false)}
                  disabled={is_cancelling}
                  size="sm"
                  className={"grow"}
                >
                  No, Keep It
                </Button>
              </div>
            ) : (
              <Button
                variant="destructive"
                onClick={() => set_confirm_cancel(true)}
                disabled={is_cancelling}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel Request
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
