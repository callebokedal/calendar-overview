/** Returns the date of Easter Sunday for a given year (Meeus/Jones/Butcher). */
function getEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** First occurrence of `weekday` (0=Sun) on or after `date`. */
function nextWeekday(date, weekday) {
  const d = new Date(date);
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1);
  return d;
}

/** Returns a stable string key for a date (no time zone issues). */
export function holidayKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/**
 * Returns a Map<string, {name: string, type: 'holiday'|'notable'}> for the given year and locale.
 * @param {number} year
 * @param {'sv'|'en'} lang
 * @returns {Map<string, {name: string, type: string}>}
 */
export function getHolidaysForYear(year, lang) {
  const easter = getEaster(year);
  const map = new Map();

  function add(date, sv, en) {
    map.set(holidayKey(date), { name: lang === "sv" ? sv : en, type: "holiday" });
  }

  function addNotable(date, sv, en) {
    map.set(holidayKey(date), { name: lang === "sv" ? sv : en, type: "notable" });
  }

  // ── Shared Christian / fixed dates ──────────────────────────────────────
  add(new Date(year, 0, 1),    "Nyårsdagen",          "New Year's Day");
  add(addDays(easter, -2),     "Långfredagen",        "Good Friday");
  add(easter,                  "Påskdagen",           "Easter Sunday");
  add(addDays(easter, 1),      "Annandag påsk",       "Easter Monday");
  add(new Date(year, 11, 25),  "Juldagen",            "Christmas Day");
  add(new Date(year, 11, 26),  "Annandag jul",        "Boxing Day");

  // ── Notable eves (shared when Swedish) ──────────────────────────────────
  addNotable(addDays(easter, -1),                              "Påskafton",           "Easter Eve");
  addNotable(new Date(year, 3, 30),                            "Valborgsmässoafton",  "Walpurgis Night");
  addNotable(addDays(nextWeekday(new Date(year, 5, 20), 6), -1), "Midsommarafton",     "Midsummer Eve");
  addNotable(new Date(year, 11, 24),                           "Julafton",            "Christmas Eve");
  addNotable(new Date(year, 11, 31),                           "Nyårsafton",          "New Year's Eve");

  if (lang === "sv") {
    // ── Swedish-specific ────────────────────────────────────────────────
    add(new Date(year, 0, 6),         "Trettondedag jul",     "Trettondedag jul");
    add(new Date(year, 4, 1),         "Första maj",           "Första maj");
    add(addDays(easter, 39),          "Kristi himmelsfärd",   "Kristi himmelsfärd");
    add(addDays(easter, 49),          "Pingstdagen",          "Pingstdagen");
    add(new Date(year, 5, 6),         "Sveriges nationaldag", "Sveriges nationaldag");
    // Midsummer Saturday: first Saturday on or after Jun 20
    add(nextWeekday(new Date(year, 5, 20), 6), "Midsommardagen", "Midsommardagen");
    // All Saints: first Saturday on or after Oct 31
    add(nextWeekday(new Date(year, 9, 31), 6), "Alla helgons dag", "Alla helgons dag");
  } else {
    // ── English (England & Wales) ────────────────────────────────────────
    // Early May Bank Holiday: first Monday in May
    const earlyMay = nextWeekday(new Date(year, 4, 1), 1);
    add(earlyMay, "Early May Bank Holiday", "Early May Bank Holiday");
    // Spring Bank Holiday: last Monday in May
    const lastMayMonday = nextWeekday(new Date(year, 4, 25), 1);
    add(lastMayMonday, "Spring Bank Holiday", "Spring Bank Holiday");
    // Summer Bank Holiday: last Monday in August
    const lastAugMonday = nextWeekday(new Date(year, 7, 25), 1);
    add(lastAugMonday, "Summer Bank Holiday", "Summer Bank Holiday");
  }

  return map;
}
