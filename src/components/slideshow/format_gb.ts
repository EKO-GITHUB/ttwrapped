export function format_gb(gb: number): string {
  if (gb >= 1000) {
    return (gb / 1000).toFixed(1) + " TB";
  }
  return gb.toFixed(1) + " GB";
}
