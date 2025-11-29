export function random_of_array(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}
