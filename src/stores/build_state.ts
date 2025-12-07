import { calculate_stats } from "./calculate_stats";
import { App_State } from "./types";

export function build_state(section_state: Partial<App_State>): Partial<App_State> {
  const stats = calculate_stats(section_state);

  return {
    stats,
    error: null,
    view_state: "slideshow",
    is_loading: false,
    ...section_state,
  } satisfies Partial<App_State>;
}
