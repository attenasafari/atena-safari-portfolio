export const XP_PER_LEVEL = 80;
export const XP_CORRECT = 10;
export const XP_COMPLETE = 20;
export const XP_DAILY = 30;

export function levelFromXp(xp: number) {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;
}

export function xpIntoLevel(xp: number) {
  return Math.max(0, xp) % XP_PER_LEVEL;
}

export function performanceTitle(accuracy: number) {
  if (accuracy >= 90) return "Quiz Master";
  if (accuracy >= 70) return "Amazing Job";
  if (accuracy >= 40) return "Nice Try";
  return "Keep Practicing";
}

export function todayKey(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function yesterdayKey(date = new Date()) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return todayKey(copy);
}
