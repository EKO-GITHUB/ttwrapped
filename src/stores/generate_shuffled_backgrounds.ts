export function generate_shuffled_backgrounds(): string[] {
  const all_backgrounds = Array.from({ length: 57 }, (_, i) => `/slideshow_backgrounds/bg-slide-${i + 1}.jpg`);
  return all_backgrounds.sort(() => Math.random() - 0.5);
}
