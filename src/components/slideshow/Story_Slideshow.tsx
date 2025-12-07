"use client";

import { export_slide_as_image } from "@/components/slideshow/export_slide_as_image";
import { cn } from "@/lib/utils";
import { useData_store } from "@/stores/useData_store";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated_Background } from "./Animated_Background";
import { Slideshow_Validation_Error } from "./Slideshow_Validation_Error";

const SLIDE_PAUSE = 1000;
const SLIDE_PROGRESS_DURATION = 1000 * 5;

export default function Story_Slideshow() {
  // TODO: REMOVE DEBUG MODE
  const debug_mode = true;
  const set_is_exporting = useData_store((state) => state.set_is_exporting);

  const [current_index, set_current_index] = useState(0);
  const [is_paused, set_is_paused] = useState(false);
  const [progress, set_progress] = useState(0);

  const animation_frame_ref = useRef<number | null>(null);
  const start_time_ref = useRef<number | null>(null);
  const paused_progress_ref = useRef(0);

  const slides = useData_store((state) => state.slides);
  const go_to_complete = useData_store((state) => state.go_to_complete);

  const profile_is_valid = useData_store((state) => state.profile_is_valid);
  const your_activity_is_valid = useData_store((state) => state.your_activity_is_valid);
  const comment_is_valid = useData_store((state) => state.comment_is_valid);
  const direct_message_is_valid = useData_store((state) => state.direct_message_is_valid);

  const invalid_sections = get_invalid_sections(
    profile_is_valid,
    your_activity_is_valid,
    comment_is_valid,
    direct_message_is_valid,
  );

  const go_next = useCallback(() => {
    if (current_index < slides.length - 1) {
      set_current_index((prev) => prev + 1);
      set_progress(0);
      paused_progress_ref.current = 0;
      start_time_ref.current = null;
    } else {
      go_to_complete();
    }
  }, [current_index, slides.length, go_to_complete]);

  const go_prev = useCallback(() => {
    if (current_index > 0) {
      set_current_index((prev) => prev - 1);
    }
    set_progress(0);
    paused_progress_ref.current = 0;
    start_time_ref.current = null;
  }, [current_index]);

  useEffect(() => {
    if (is_paused) {
      paused_progress_ref.current = progress;
      if (animation_frame_ref.current) {
        cancelAnimationFrame(animation_frame_ref.current);
      }
      return;
    }

    start_time_ref.current = null;

    const animate = (timestamp: number) => {
      if (start_time_ref.current === null) {
        start_time_ref.current = timestamp;
      }

      const elapsed = timestamp - start_time_ref.current;
      const remaining_duration = SLIDE_PROGRESS_DURATION * (1 - paused_progress_ref.current / 100);
      const new_progress =
        paused_progress_ref.current + (elapsed / remaining_duration) * (100 - paused_progress_ref.current);

      if (new_progress >= 100) {
        set_progress(100);
        go_next();
      } else {
        set_progress(new_progress);
        animation_frame_ref.current = requestAnimationFrame(animate);
      }
    };

    const start_animation = () => {
      animation_frame_ref.current = requestAnimationFrame(animate);
    };

    if (paused_progress_ref.current === 0 && progress === 0) {
      const pause_timer = setTimeout(start_animation, SLIDE_PAUSE);
      return () => {
        clearTimeout(pause_timer);
        if (animation_frame_ref.current) {
          cancelAnimationFrame(animation_frame_ref.current);
        }
      };
    } else {
      start_animation();
      return () => {
        if (animation_frame_ref.current) {
          cancelAnimationFrame(animation_frame_ref.current);
        }
      };
    }
  }, [current_index, is_paused, go_next]);

  if (invalid_sections.length > 0) {
    return <Slideshow_Validation_Error invalid_sections={invalid_sections} />;
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-black">
        <div className="text-center text-white">No slides available. Please upload a JSON file.</div>
      </div>
    );
  }

  const handle_click = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      go_prev();
    } else if (x > (width * 2) / 3) {
      go_next();
    } else {
      set_is_paused((prev) => (debug_mode ? true : !prev));
    }
  };

  const current_slide = slides[current_index];

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-black">
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        onClick={handle_click}
      >
        {/*TODO: REMOVE THIS*/}
        {debug_mode && (
          <div className={"absolute z-50 grid w-full justify-center"}>
            <button
              className={"m-12 mx-auto w-max rounded-md bg-black p-4 text-center text-white hover:cursor-pointer"}
              onClick={async () => {
                set_is_exporting(true);
                await export_slide_as_image(current_slide, current_index + 1);
                set_is_exporting(false);
              }}
            >
              DOWNLOAD
            </button>
          </div>
        )}
        <Animated_Background slide_id={current_slide.id} />

        <div className="relative z-10 flex flex-1 flex-col">
          <Progress_Bar
            total={slides.length}
            current_index={current_index}
            progress={progress}
          />

          <Close_Button
            on_click={go_to_complete}
            invert_colors={current_index == 0}
          />
          <Slide_Content>{current_slide.content}</Slide_Content>
          <Navigation_Hints
            show_prev={current_index > 0}
            invert_colors={current_index == 0}
          />
          <Status_Text
            is_paused={is_paused}
            invert_colors={current_index == 0}
          />
        </div>
      </div>
    </div>
  );
}

function Progress_Bar({ total, current_index, progress }: { total: number; current_index: number; progress: number }) {
  const invert_colors = current_index === 0;

  return (
    <div className="flex gap-1 p-4">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn("h-1 flex-1 overflow-hidden rounded-full", invert_colors ? "bg-black/30" : "bg-white/30")}
        >
          <div
            className={cn("h-full", invert_colors ? "bg-black" : "bg-white")}
            style={{
              width: index < current_index ? "100%" : index === current_index ? `${progress}%` : "0%",
              transition: index === current_index ? "none" : "width 300ms",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Close_Button({ on_click, invert_colors }: { on_click: () => void; invert_colors: boolean }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        on_click();
      }}
      className={cn(
        "absolute top-4 right-4 rounded-full p-2 hover:cursor-pointer",
        invert_colors
          ? "text-black/80 hover:bg-black/20 hover:text-black"
          : "text-white/80 hover:bg-white/20 hover:text-white",
      )}
    >
      <X className="h-6 w-6" />
    </button>
  );
}

function Slide_Content({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-white">{children}</div>;
}

function Navigation_Hints({ show_prev, invert_colors }: { show_prev: boolean; invert_colors: boolean }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center">
        <ChevronLeft
          className={cn("h-8 w-8", show_prev ? "" : "opacity-0", invert_colors ? "text-black/50" : "text-white/50")}
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
        <ChevronRight className={cn("h-8 w-8", invert_colors ? "text-black/50" : "text-white/50")} />
      </div>
    </>
  );
}

function Status_Text({ is_paused, invert_colors }: { is_paused: boolean; invert_colors?: boolean }) {
  return (
    <div className={cn("p-4 text-center text-sm", invert_colors ? "text-black/80" : "text-white/80")}>
      {is_paused ? "Paused - tap center to resume" : "Tap to navigate"}
    </div>
  );
}

function get_invalid_sections(
  profile_is_valid: boolean,
  your_activity_is_valid: boolean,
  comment_is_valid: boolean,
  direct_message_is_valid: boolean,
) {
  const section_checks = [
    { is_valid: profile_is_valid, name: "profile", display_name: "Profile" },
    { is_valid: your_activity_is_valid, name: "your_activity", display_name: "Your Activity" },
    { is_valid: comment_is_valid, name: "comment", display_name: "Comments" },
    { is_valid: direct_message_is_valid, name: "direct_message", display_name: "Direct Messages" },
  ];

  return section_checks
    .filter((section) => !section.is_valid)
    .map(({ name, display_name }) => ({ name, display_name }));
}
