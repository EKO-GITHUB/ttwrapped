"use client";

import { Loader2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { useData_store } from "@/stores/useData_store";

export default function File_Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const is_loading = useData_store((state) => state.is_loading);
  const handle_file_load = useData_store((state) => state.handle_file_load);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    await handle_file_load(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 transition-all duration-200 ${
        is_loading
          ? "cursor-wait border-black/20 bg-black/5"
          : isDragging
            ? "cursor-pointer border-blue-500 bg-blue-50"
            : "cursor-pointer border-black/20 bg-white hover:border-black/40 hover:bg-black/5"
      }`}
      onDragOver={is_loading ? undefined : handleDragOver}
      onDragLeave={is_loading ? undefined : handleDragLeave}
      onDrop={is_loading ? undefined : handleDrop}
      onClick={is_loading ? undefined : handleClick}
    >
      {is_loading ? (
        <Loader2
          className="animate-spin text-black/60"
          size={48}
        />
      ) : (
        <Upload
          className={`${isDragging ? "text-blue-500" : "text-black/60"}`}
          size={48}
        />
      )}

      <div className="text-center">
        <p className="text-lg font-semibold text-black">
          {is_loading ? "Processing your data..." : fileName ? fileName : "Upload TikTok Data"}
        </p>
        <p className="text-sm text-black/60">
          {is_loading
            ? "This may take a moment"
            : fileName
              ? "Tap, click or drag to upload a different file"
              : "Tap, click or drag and drop your JSON or ZIP file here"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.zip"
        onChange={handleFileInput}
        className="hidden"
        disabled={is_loading}
      />
    </div>
  );
}
