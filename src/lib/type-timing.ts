/** Pause before the first letter, then one letter per interval. */
export const TYPE_INTERVAL_MS = 72;
export const TYPE_START_MS = 160;

export function typeDuration(name: string) {
  return TYPE_START_MS + name.length * TYPE_INTERVAL_MS + 240;
}
