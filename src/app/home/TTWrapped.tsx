"use client";

import File_Upload from "@/components/custom/File_Upload";
import Demo_Button from "@/components/custom/Demo_Button";
import { Accordion } from "@/components/ui/accordion";
import Error_Display from "@/app/home/error/Error_Display";
import Header from "./Header";
import Privacy_Section from "./sections/Privacy_Section";
import Tech_Stack_Section from "./sections/Tech_Stack_Section";
import Open_Source_Section from "./sections/Open_Source_Section";
import Instructions_Section from "./sections/Instructions_Section";
import Story_Slideshow from "@/components/slideshow/Story_Slideshow";
import Slideshow_Complete from "@/components/slideshow/Slideshow_Complete";
import { useData_store } from "@/stores/useData_store";
import { Disclaimer } from "@/app/home/sections/Disclaimer";
import Analytics_Dashboard from "@/components/analytics/Analytics_Dashboard";

export default function TTWrapped() {
  const error = useData_store((state) => state.error);
  const view_state = useData_store((state) => state.view_state);

  if (error) {
    return (
      <div className="container mx-auto grid max-w-6xl gap-4 p-8">
        <Header />
        <Error_Display />
      </div>
    );
  }

  if (view_state === "slideshow") {
    return <Story_Slideshow />;
  }

  if (view_state === "complete") {
    return (
      <div className="container mx-auto grid max-w-6xl gap-4 p-8">
        <Header />
        <Slideshow_Complete />
      </div>
    );
  }

  if (view_state === "dashboard") {
    return (
      <div className="container mx-auto grid max-w-6xl gap-4 p-8">
        <Header />
        <Analytics_Dashboard />
      </div>
    );
  }

  return (
    <div className="container mx-auto grid max-w-6xl gap-4 p-8">
      <Header />

      <File_Upload />

      <Demo_Button />

      <Instructions_Section />

      <Accordion
        type="single"
        collapsible
        defaultValue="privacy"
        className="space-y-4"
      >
        <Privacy_Section />
        <Tech_Stack_Section />
        <Open_Source_Section />
      </Accordion>

      <Disclaimer />
    </div>
  );
}
