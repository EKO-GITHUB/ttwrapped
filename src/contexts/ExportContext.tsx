"use client";

import { createContext, useContext } from "react";

type Export_Context_Type = {
  is_exporting: boolean;
};

const ExportContext = createContext<Export_Context_Type>({ is_exporting: false });

export function ExportProvider({ children, is_exporting }: { children: React.ReactNode; is_exporting: boolean }) {
  return <ExportContext.Provider value={{ is_exporting }}>{children}</ExportContext.Provider>;
}

export function useExport() {
  return useContext(ExportContext);
}
