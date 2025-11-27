import { TikTok_Data_Schema } from "@/types/TikTok_Data_Schema";
import { section_configs } from "./constants";
import { App_State } from "./types";

export function validate_sections(parsed_data: unknown): Partial<App_State> {
  const validated_data = validate_top_level_schema(parsed_data);
  return validate_individual_sections(validated_data);
}

function validate_top_level_schema(parsed_data: unknown): any {
  const schema_result = TikTok_Data_Schema.safeParse(parsed_data);

  if (schema_result.success) {
    return schema_result.data;
  } else {
    return parsed_data;
  }
}

function validate_individual_sections(data: any): Partial<App_State> {
  const section_state: Partial<App_State> = {};

  for (const config of section_configs) {
    const section_data = data[config.data_key];
    const result = config.schema.safeParse(section_data);
    const is_valid_key = `${config.key}_is_valid` as keyof App_State;

    if (result.success) {
      (section_state as Record<string, unknown>)[config.key] = result.data;
      (section_state as Record<string, boolean>)[is_valid_key] = true;
    } else {
      (section_state as Record<string, unknown>)[config.key] = section_data ?? null;
      (section_state as Record<string, boolean>)[is_valid_key] = false;
    }
  }

  return section_state;
}
