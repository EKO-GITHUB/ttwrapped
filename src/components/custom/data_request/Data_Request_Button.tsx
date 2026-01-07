"use client";

import Unavailable_Button from "@/components/custom/data_request/Unavailable_Button";
import { useData_store } from "@/stores/useData_store";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Download_Button from "./Download_Button";
import Error_Button from "./Error_Button";
import Pending_Button from "./Pending_Button";
import Region_Modal from "./Region_Modal";
import Request_Button from "./Request_Button";

export default function Data_Request_Button() {
  const handle_file_load = useData_store((state) => state.handle_file_load);
  const [is_downloading, set_is_downloading] = useState(false);
  const [error, set_error] = useState<string | null>(null);
  const has_auto_downloaded = useRef(false);
  const user = useUser();
  const userHasApprovedScope = user.user?.externalAccounts.some((account) =>
    account.approvedScopes.includes("portability.all"),
  );

  const is_eea_uk = document.cookie.includes("is_eea_uk=1");

  const { data: request_state, refetch: refetch_state } = trpc.tiktok.get_request_state.useQuery(undefined, {
    enabled: is_eea_uk,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || data.status !== "pending") return false;
      return 15000;
    },
    refetchIntervalInBackground: false,
  });

  const { refetch: check_status, isFetching: is_checking_status } = trpc.tiktok.check_status.useQuery(undefined, {
    enabled: is_eea_uk && request_state?.status === "pending",
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || data.status !== "pending") return false;
      return 15000;
    },
    refetchIntervalInBackground: false,
  });

  const request_mutation = trpc.tiktok.request_data.useMutation({
    onSuccess: () => {
      set_error(null);
      refetch_state();
    },
    onError: (err) => {
      set_error(err.message);
    },
  });

  const cancel_mutation = trpc.tiktok.cancel_request.useMutation({
    onSuccess: () => {
      set_error(null);
      refetch_state();
    },
    onError: (err) => {
      set_error(err.message);
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
    onError: (err) => {
      set_is_downloading(false);
      set_error(err.message);
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

  if (!is_eea_uk) {
    return <Region_Modal />;
  }

  const status = request_state?.status ?? "none";
  const is_loading = request_mutation.isPending || cancel_mutation.isPending || is_downloading;

  if (!userHasApprovedScope) {
    return <Unavailable_Button />;
  }

  if (error) {
    return (
      <Error_Button
        error={error}
        is_retrying={request_mutation.isPending}
        on_retry={() => {
          set_error(null);
          request_mutation.mutate();
        }}
      />
    );
  }

  if (status === "none" || status === "expired" || status === "cancelled") {
    return (
      <Request_Button
        status={status}
        is_loading={is_loading}
        on_request={() => request_mutation.mutate()}
      />
    );
  }

  if (status === "pending") {
    return (
      <Pending_Button
        is_cancelling={cancel_mutation.isPending}
        is_refreshing={is_checking_status}
        on_cancel={() => cancel_mutation.mutate()}
        on_refresh={() => {
          check_status().then(() => refetch_state());
        }}
      />
    );
  }

  if (status === "downloading") {
    return (
      <Download_Button
        is_downloading={is_downloading}
        on_download={() => {
          set_is_downloading(true);
          download_mutation.mutate();
        }}
      />
    );
  }

  return null;
}
