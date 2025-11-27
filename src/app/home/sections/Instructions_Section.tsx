"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const steps = [
  {
    image: "/usage_guide/usage-guide-step-1.jpg",
    description: "Open TikTok and tap Profile in the bottom right corner",
  },
  {
    image: "/usage_guide/usage-guide-step-2.jpg",
    description: "Tap the menu icon (three lines) in the top right corner",
  },
  { image: "/usage_guide/usage-guide-step-3.jpg", description: "Select 'Settings and privacy' from the menu" },
  { image: "/usage_guide/usage-guide-step-4.jpg", description: "Tap on 'Account'" },
  { image: "/usage_guide/usage-guide-step-5.jpg", description: "Tap on 'Download your data'" },
  {
    image: "/usage_guide/usage-guide-step-6.jpg",
    description: "Change the file format if it's not already set to 'JSON'",
  },
  { image: "/usage_guide/usage-guide-step-7.jpg", description: "Choose 'JSON' as the file format (important!)" },
  { image: "/usage_guide/usage-guide-step-8.jpg", description: "Tap 'Request data' to confirm your request" },
  {
    image: "/usage_guide/usage-guide-step-9.jpg",
    description: "TikTok may send you a confirmation email or text message with a code to verify your identity",
  },
  {
    image: "/usage_guide/usage-guide-step-10.jpg",
    description: "You'll see a confirmation that your request is being processed",
  },
  {
    image: "/usage_guide/usage-guide-step-11.jpg",
    description: "Wait for TikTok to prepare your data (usually 2-4 days)",
  },
  {
    image: "/usage_guide/usage-guide-step-12.jpg",
    description: "You'll receive a notification when your data is ready",
  },
  {
    image: "/usage_guide/usage-guide-step-13.jpg",
    description: "Go back to 'Download your data' and tap 'Download data'",
  },
  { image: "/usage_guide/usage-guide-step-14.jpg", description: "Congratulations! Your data is ready to be used" },
];

export default function Instructions_Section() {
  const [selected_step, set_selected_step] = useState<number | null>(null);
  const touch_start_x = useRef<number | null>(null);

  const go_to_previous = () => {
    if (selected_step !== null && selected_step > 0) {
      set_selected_step(selected_step - 1);
    }
  };

  const go_to_next = () => {
    if (selected_step !== null && selected_step < steps.length - 1) {
      set_selected_step(selected_step + 1);
    }
  };

  const handle_touch_start = (e: React.TouchEvent) => {
    touch_start_x.current = e.touches[0].clientX;
  };

  const handle_touch_end = (e: React.TouchEvent) => {
    if (touch_start_x.current === null) return;

    const touch_end_x = e.changedTouches[0].clientX;
    const diff = touch_start_x.current - touch_end_x;
    const swipe_threshold = 50;

    if (diff > swipe_threshold) {
      go_to_next();
    } else if (diff < -swipe_threshold) {
      go_to_previous();
    }

    touch_start_x.current = null;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-8 dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
      <h2 className="mb-4 text-center text-lg font-bold text-gray-900 sm:mb-6 sm:text-2xl dark:text-gray-100">
        How to Get Your TikTok Data
      </h2>

      <Carousel className="mx-auto w-full max-w-[200px] sm:max-w-sm lg:max-w-lg">
        <CarouselContent>
          {steps.map((step, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center gap-2 p-1 sm:gap-4 sm:p-2">
                <button
                  type="button"
                  onClick={() => set_selected_step(index)}
                  className="relative aspect-[9/16] w-full max-w-[160px] cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-transform hover:scale-[1.02] sm:max-w-[280px] sm:rounded-2xl dark:border-gray-700"
                >
                  <Image
                    src={step.image}
                    loading={"eager"}
                    alt={`Step ${index + 1}: ${step.description}`}
                    fill
                  />
                </button>
                <div className="text-center">
                  <Step_Badge number={index + 1} />
                  <p className="mt-1 text-xs text-gray-700 sm:mt-2 sm:text-sm dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 h-7 w-7 cursor-pointer sm:-left-12 sm:h-8 sm:w-8" />
        <CarouselNext className="-right-4 h-7 w-7 cursor-pointer sm:-right-12 sm:h-8 sm:w-8" />
      </Carousel>

      <div className="mt-3 text-center text-sm text-gray-500 sm:mt-4 sm:text-xs dark:text-gray-400">
        Tap to enlarge • Swipe to navigate
      </div>
      <div className={"my-2 w-full rounded-md border border-t border-black/10"}></div>
      <div className="mt-3 flex justify-center text-center text-xs text-gray-500 sm:mt-4 sm:text-xs dark:text-gray-400">
        Note that this process can vary depending on your device, app version and future TikTok updates. We recommend
        using careful judgment when following these steps.
      </div>

      <Dialog
        open={selected_step !== null}
        onOpenChange={(open) => !open && set_selected_step(null)}
      >
        <DialogContent
          className="h-[85vh] max-h-[90vh] w-[95vw] max-w-[95vw] border-none bg-white/90 p-2 sm:p-4"
          showCloseButton={true}
        >
          <VisuallyHidden>
            <DialogTitle>
              {selected_step !== null
                ? `Step ${selected_step + 1}: ${steps[selected_step].description}`
                : "Image preview"}
            </DialogTitle>
          </VisuallyHidden>
          {selected_step !== null && (
            <div
              className="flex h-full flex-col items-center justify-center gap-4"
              onTouchStart={handle_touch_start}
              onTouchEnd={handle_touch_end}
            >
              <button
                type="button"
                onClick={go_to_previous}
                disabled={selected_step === 0}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40 disabled:opacity-30 sm:left-4"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative h-full w-full max-w-md">
                <Image
                  src={steps[selected_step].image}
                  alt={`Step ${selected_step + 1}: ${steps[selected_step].description}`}
                  fill
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={go_to_next}
                disabled={selected_step === steps.length - 1}
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40 disabled:opacity-30 sm:right-4"
              >
                <ChevronRight size={24} />
              </button>

              <div className="left-0 grid w-full justify-center justify-items-center gap-2 rounded-md bg-white/60 p-1 text-center">
                <Step_Badge number={selected_step + 1} />
                <p className="mt-2 px-4 text-sm text-gray-800">{steps[selected_step].description}</p>
                <p className="mt-1 text-xs text-gray-600">
                  {selected_step + 1} / {steps.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Step_Badge({ number }: { number: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
      {number}
    </span>
  );
}
