import { useRef, useEffect, useState, useMemo } from "react";
import { getMondayOfWeek, getMonthsRange } from "../../utils/calendar.js";
import { getHolidaysForYear } from "../../utils/holidays.js";
import { MonthBlock } from "./MonthBlock.jsx";
import { CalendarFooter } from "./CalendarFooter.jsx";
import { SettingsModal } from "./SettingsModal.jsx";
import { LangContext, HolidaysContext, FontSizeContext, useLang } from "./LangContext.jsx";

const MONTHS_BEFORE_INITIAL = 6;
const MONTHS_AFTER_INITIAL = 13;
const LOAD_MORE_STEP = 6;

function monthKey(year, month) {
  return `${year}-${month}`;
}

export function CalendarView() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") ?? "sv");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("fontSize") ?? "large");

  function handleLangChange(next) {
    setLang(next);
    localStorage.setItem("lang", next);
  }

  function handleFontSizeChange(next) {
    setFontSize(next);
    localStorage.setItem("fontSize", next);
  }

  return (
    <LangContext.Provider value={lang}>
      <FontSizeContext.Provider value={fontSize}>
        <CalendarInner
          lang={lang}
          fontSize={fontSize}
          onLangChange={handleLangChange}
          onFontSizeChange={handleFontSizeChange}
        />
      </FontSizeContext.Provider>
    </LangContext.Provider>
  );
}

function CalendarInner({ lang, fontSize, onLangChange, onFontSizeChange }) {
  const t = useLang();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonday = getMondayOfWeek(today);

  const [monthsBefore, setMonthsBefore] = useState(MONTHS_BEFORE_INITIAL);
  const [monthsAfter, setMonthsAfter] = useState(MONTHS_AFTER_INITIAL);

  const months = getMonthsRange(today, monthsBefore, monthsAfter);

  // Build combined holiday map for all years visible in the current range
  const holidays = useMemo(() => {
    const years = [...new Set(months.map((m) => m.year))];
    const map = new Map();
    for (const year of years) {
      for (const [key, name] of getHolidaysForYear(year, lang)) {
        map.set(key, name);
      }
    }
    return map;
  }, [months, lang]);
  // Map of "year-month" → DOM element for all month blocks
  const monthRefs = useRef({});

  // Tracks which month the navigation buttons are relative to
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Tracks the single tapped/selected day (for tooltip on touch)
  const [selectedDate, setSelectedDate] = useState(null);

  function handleSelectDate(date) {
    setSelectedDate((prev) =>
      prev?.toDateString() === date.toDateString() ? null : date
    );
  }

  function scrollToMonth(year, month) {
    const el = monthRefs.current[monthKey(year, month)];
    el?.scrollIntoView({ block: "start", behavior: "smooth" });
    setViewYear(year);
    setViewMonth(month);
  }

  function handleLoadEarlier() {
    setMonthsBefore((prev) => prev + LOAD_MORE_STEP);
  }

  function handleLoadLater() {
    setMonthsAfter((prev) => prev + LOAD_MORE_STEP);
  }

  function handleToday() {
    scrollToMonth(today.getFullYear(), today.getMonth());
  }

  function handleBack3() {
    const d = new Date(viewYear, viewMonth - 3, 1);
    scrollToMonth(d.getFullYear(), d.getMonth());
  }

  function handleForward3() {
    const d = new Date(viewYear, viewMonth + 3, 1);
    scrollToMonth(d.getFullYear(), d.getMonth());
  }

  useEffect(() => {
    // Initial scroll to current month (instant, no animation)
    const el = monthRefs.current[monthKey(today.getFullYear(), today.getMonth())];
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  return (
    <HolidaysContext.Provider value={holidays}>
      <div className={`max-w-md mx-auto py-4 px-2 pb-20 ${fontSize === "large" ? "text-base" : "text-sm"}`}>
        <div className="flex justify-center mb-2">
          <button
            onClick={handleLoadEarlier}
            className="px-3 py-0.5 text-xs text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 hover:border-gray-400 rounded-full transition-colors"
          >
            {t.loadEarlier}
          </button>
        </div>
        {months.map(({ year, month }) => (
          <MonthBlock
            key={monthKey(year, month)}
            year={year}
            month={month}
            today={today}
            currentMonday={currentMonday}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            blockRef={(el) => {
              if (el) monthRefs.current[monthKey(year, month)] = el;
            }}
          />
        ))}
        <div className="flex justify-center mt-2">
          <button
            onClick={handleLoadLater}
            className="px-3 py-0.5 mb-6 text-xs text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 hover:border-gray-400 rounded-full transition-colors"
          >
            {t.loadLater}
          </button>
        </div>
      </div>
      <CalendarFooter
        onToday={handleToday}
        onBack3={handleBack3}
        onForward3={handleForward3}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      {settingsOpen && (
        <SettingsModal
          lang={lang}
          fontSize={fontSize}
          onLangChange={onLangChange}
          onFontSizeChange={onFontSizeChange}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </HolidaysContext.Provider>
  );
}
