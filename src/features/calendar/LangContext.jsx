import { createContext, useContext } from "react";

export const STRINGS = {
  en: {
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    weekdays: ["mo", "tu", "we", "th", "fr", "sa", "su"],
    today: "Today",
    loadEarlier: "Show 6 earlier months",
    loadLater: "Show 6 additional months",
    diffDays: "d",
    diffWeeks: "w",
    back3: "← 3m",
    forward3: "3m →",
    switchLang: "Byt till Svenska",
    titleBack3: "Scroll back 3 months",
    titleForward3: "Scroll forward 3 months",
    titleToday: "Scroll to today",
  },
  sv: {
    months: [
      "Januari", "Februari", "Mars", "April", "Maj", "Juni",
      "Juli", "Augusti", "September", "Oktober", "November", "December",
    ],
    weekdays: ["må", "ti", "on", "to", "fr", "lö", "sö"],
    today: "Idag",
    loadEarlier: "Visa 6 föregående månader",
    loadLater: "Visa 6 ytterligare månader",
    diffDays: "d",
    diffWeeks: "v",
    back3: "← 3m",
    forward3: "3m →",
    switchLang: "Switch to English",
    titleBack3: "Scrolla 3 månader bakåt",
    titleForward3: "Scrolla 3 månader framåt",
    titleToday: "Scrolla till idag",
  },
};

export const LangContext = createContext("sv");

export function useLang() {
  return STRINGS[useContext(LangContext)];
}

/** Provides a Map<dateKey, holidayName> for all visible years. */
export const HolidaysContext = createContext(new Map());

export function useHolidays() {
  return useContext(HolidaysContext);
}
