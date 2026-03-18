/** Swedish weekday names Mon–Sun (ISO order) */
export const WEEKDAY_NAMES = ["må", "ti", "on", "to", "fr", "lö", "sö"];

/** English month names */
export const MONTH_NAMES = [
  "Januari", "Februari", "Mars", "April", "Maj", "Juni",
  "Juli", "Augusti", "September", "Oktober", "November", "December",
];

/**
 * Returns the Monday (00:00:00 local time) of the ISO week containing `date`.
 * @param {Date} date
 * @returns {Date}
 */
export function getMondayOfWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

/**
 * Returns the ISO 8601 week number for `date`.
 * @param {Date} date
 * @returns {number}
 */
export function getISOWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay() || 7; // Mon=1..Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek); // nearest Thursday
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * Returns all ISO weeks that overlap with the given month.
 * Each week starts on Monday; days outside the month are included.
 * @param {number} year
 * @param {number} month - 0-indexed (0 = January)
 * @returns {Array<{ weekNum: number, weekMonday: Date, days: Date[] }>}
 */
export function getWeeksForMonth(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let monday = getMondayOfWeek(firstDay);
  const weeks = [];

  while (monday <= lastDay) {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    });

    // Assign the week to the month its Thursday (Mon+3) belongs to.
    // This ensures each week appears exactly once across month blocks.
    const thursday = days[3];
    if (thursday.getFullYear() === year && thursday.getMonth() === month) {
      weeks.push({ weekNum: getISOWeekNumber(monday), weekMonday: new Date(monday), days });
    }

    monday = new Date(monday);
    monday.setDate(monday.getDate() + 7);
  }

  return weeks;
}

/**
 * Difference in whole weeks between `weekMonday` and `currentMonday`.
 * Positive = future, negative = past.
 * @param {Date} weekMonday
 * @param {Date} currentMonday
 * @returns {number}
 */
export function getWeekDiff(weekMonday, currentMonday) {
  return Math.round((weekMonday - currentMonday) / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Formats a week diff as "+2", "-1", or "0".
 * @param {number} diff
 * @returns {string}
 */
export function formatWeekDiff(diff) {
  if (diff === 0) return "0";
  return diff > 0 ? `+${diff}` : `${diff}`;
}

/**
 * Returns an array of { year, month } covering [center − before .. center + after] months.
 * @param {Date} center
 * @param {number} before
 * @param {number} after
 * @returns {Array<{ year: number, month: number }>}
 */
export function getMonthsRange(center, before, after) {
  return Array.from({ length: before + after + 1 }, (_, i) => {
    const d = new Date(center.getFullYear(), center.getMonth() - before + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });
}
