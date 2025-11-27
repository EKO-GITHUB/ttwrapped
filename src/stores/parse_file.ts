import JSZip from "jszip";

export async function parse_file(file: File): Promise<unknown> {
  const extension = file.name.toLowerCase().split(".").pop();

  if (extension !== "json" && extension !== "zip") {
    throw new Error("Please select a valid JSON or ZIP file");
  }

  const json_content = await extract_json_content(file, extension);
  return parse_json_content(json_content);
}

async function extract_json_content(file: File, extension: string): Promise<string> {
  if (extension === "zip") {
    return extract_from_zip(file);
  } else {
    return read_json_file(file);
  }
}

async function extract_from_zip(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(file);
  const json_files = Object.keys(zip.files).filter((name) => name.endsWith(".json") && !zip.files[name].dir);

  if (json_files.length === 0) {
    throw new Error("No JSON file found in the ZIP archive");
  }

  const json_file_name = json_files.find((name) => name.includes("user_data")) || json_files[0];
  return await zip.files[json_file_name].async("string");
}

async function read_json_file(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
}

function parse_json_content(json_content: string): unknown {
  try {
    return JSON.parse(json_content);
  } catch (err) {
    throw new Error("Invalid JSON file format: " + (err instanceof Error ? err.message : "parsing failed"));
  }
}
