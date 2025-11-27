import { App_State } from "./types";
import { generate_shuffled_backgrounds } from "./generate_shuffled_backgrounds";
import { calculate_stats } from "./calculate_stats";

export function build_state(section_state: Partial<App_State>): Partial<App_State> {
  const backgrounds = generate_shuffled_backgrounds();
  const stats = calculate_stats(section_state);

  return {
    stats,
    error: null,
    view_state: "slideshow",
    is_loading: false,
    slideshow_backgrounds: backgrounds,
    ...section_state,
  } satisfies Partial<App_State>;
}
