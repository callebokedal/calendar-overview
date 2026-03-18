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
    settings: "Settings",
    settingsLang: "Language",
    settingsFontSize: "Font size",
    settingsFontSmall: "Small",
    settingsFontLarge: "Large",
    settingsRepo: "Source code",
    settingsClose: "Close",
    tipsHeader: "Tips",
    tipDateDiff: "Click or hover over a day to compare it with the current date",
    tipCopyDate: "Click a day to copy the date",
    tipSpecialDays: "Public holidays and special days are highlighted"
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
    settings: "Inställningar",
    settingsLang: "Språk",
    settingsFontSize: "Textstorlek",
    settingsFontSmall: "Liten",
    settingsFontLarge: "Stor",
    settingsRepo: "Källkod",
    settingsClose: "Stäng",
    tipsHeader: "Tips",
    tipDateDiff: "Klicka eller hovra över en dag för att jämföra med dagens datum",
    tipCopyDate: "Klicka på en dag för att kopiera datumet",
    tipSpecialDays: "Röda dagar och högtidsdagar markeras"
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

/** 'small' | 'large' */
export const FontSizeContext = createContext("small");

export function useFontSize() {
  return useContext(FontSizeContext);
}
