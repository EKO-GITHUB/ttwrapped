"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { useData_store } from "@/stores/useData_store";
import { trpc } from "@/trpc/client";
import { Download, Loader2, X } from "lucide-react";

export default function Data_Request_Button() {
  const handle_file_load = useData_store((state) => state.handle_file_load);
  const [is_downloading, set_is_downloading] = useState(false);
  const [is_eea_uk, set_is_eea_uk] = useState(false);
  const has_auto_downloaded = useRef(false);

  useEffect(() => {
    set_is_eea_uk(document.cookie.includes("is_eea_uk=1"));
  }, []);

  const { data: request_state, refetch: refetch_state } = trpc.tiktok.get_request_state.useQuery(undefined, {
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || data.status !== "pending") return false;
      return 15000;
    },
    refetchIntervalInBackground: false,
  });

  const { refetch: check_status } = trpc.tiktok.check_status.useQuery(undefined, {
    enabled: request_state?.status === "pending",
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || data.status !== "pending") return false;
      return 15000;
    },
    refetchIntervalInBackground: false,
  });

  const request_mutation = trpc.tiktok.request_data.useMutation({
    onSuccess: () => {
      refetch_state();
    },
  });

  const cancel_mutation = trpc.tiktok.cancel_request.useMutation({
    onSuccess: () => {
      refetch_state();
    },
  });

  const download_mutation = trpc.tiktok.download_data.useMutation({
    onSuccess: async (data) => {
      try {
        const binary_string = atob(data.zip_base64);
        const bytes = new Uint8Array(binary_string.length);
        for (let i = 0; i < binary_string.length; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/zip" });
        const file = new File([blob], "tiktok_data.zip", { type: "application/zip" });

        await handle_file_load(file);
      } finally {
        set_is_downloading(false);
        refetch_state();
      }
    },
    onError: () => {
      set_is_downloading(false);
    },
  });

  useEffect(() => {
    if (request_state?.status === "downloading" && !has_auto_downloaded.current && !is_downloading) {
      has_auto_downloaded.current = true;
      set_is_downloading(true);
      download_mutation.mutate();
    }

    if (request_state?.status !== "downloading") {
      has_auto_downloaded.current = false;
    }
  }, [request_state?.status, is_downloading, download_mutation]);

  useEffect(() => {
    if (request_state?.status === "pending") {
      const interval = setInterval(() => {
        check_status();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [request_state?.status, check_status]);

  const status = request_state?.status ?? "none";
  const is_loading = request_mutation.isPending || cancel_mutation.isPending || is_downloading;

  if (!is_eea_uk) {
    return null;
  }

  if (status === "none" || status === "expired" || status === "cancelled") {
    return (
      <Tooltip>
        <Tooltip_Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => request_mutation.mutate()}
            disabled={is_loading}
            className="gap-2"
          >
            {is_loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Request Data
          </Button>
        </Tooltip_Trigger>
        {status === "expired" && (
          <Tooltip_Content>
            <p>Previous request expired. Request new data.</p>
          </Tooltip_Content>
        )}
      </Tooltip>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled
          className="gap-2"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Preparing...
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => cancel_mutation.mutate()}
          disabled={cancel_mutation.isPending}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (status === "downloading") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          set_is_downloading(true);
          download_mutation.mutate();
        }}
        disabled={is_downloading}
        className="gap-2"
      >
        {is_downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {is_downloading ? "Downloading..." : "Download Ready"}
      </Button>
    );
  }

  return null;
}
