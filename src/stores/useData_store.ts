import { generate_demo_data } from "@/demo_data_generator/generate_demo_data";
import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { create } from "zustand";
import { build_state } from "./build_state";
import { section_configs } from "./constants";
import { generate_slides } from "./generate_slides";
import { initial_state } from "./initial_state";
import { parse_file } from "./parse_file";
import { App_State, UseData_store } from "./types";
import { validate_sections } from "./validate_sections";

export const useData_store = create<UseData_store>((set, get) => ({
  ...initial_state,

  set_error: (error) => set({ error }),
  set_view_state: (state) => set({ view_state: state }),
  set_is_loading: (is_loading) => set({ is_loading }),

  handle_file_load: async (file) => {
    if (!file) return;

    set({ is_loading: true, error: null });

    try {
      const parsed_data = await parse_file(file);
      const section_state = validate_sections(parsed_data);
      const new_state = build_state(section_state);

      set(new_state);
      set({
        slides: generate_slides(),
        is_demo_mode: false,
      });
    } catch (err) {
      const error_message = err instanceof Error ? err.message : "An unknown error occurred";
      set({ ...initial_state, error: error_message });
    }
  },

  load_demo_data: async () => {
    set({ is_loading: true, error: null });

    try {
      const demo_data: TikTok_Data = generate_demo_data();
      const section_state = validate_sections(demo_data);
      const new_state = build_state(section_state);

      set(new_state);
      set({
        slides: generate_slides(),
        is_demo_mode: true,
      });
    } catch (err) {
      const error_message =
        err instanceof Error
          ? `Failed to load demo: ${err.message}`
          : "Demo data could not be loaded. Please try uploading your own data.";
      set({ ...initial_state, error: error_message });
    }
  },

  handle_error: (error) => set({ ...initial_state, error }),

  go_to_slideshow: () => set({ view_state: "slideshow" }),
  go_to_complete: () => set({ view_state: "complete" }),
  go_to_dashboard: () => set({ view_state: "dashboard" }),

  reset: () => set(initial_state),

  get_is_all_valid: () => {
    const state = get();
    return section_configs.every((config) => {
      const is_valid_key = `${config.key}_is_valid` as keyof App_State;
      return state[is_valid_key] as boolean;
    });
  },

  get_validation_summary: () => {
    const state = get();
    const valid_count = section_configs.filter((config) => {
      const is_valid_key = `${config.key}_is_valid` as keyof App_State;
      return state[is_valid_key] as boolean;
    }).length;
    const total = section_configs.length;
    return {
      valid_count,
      invalid_count: total - valid_count,
      total,
    };
  },
}));

export type { Data_Section_Key, All_Stats } from "./types";
