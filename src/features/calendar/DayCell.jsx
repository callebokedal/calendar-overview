import { useLang, useHolidays, useFontSize } from "./LangContext.jsx";
import { holidayKey } from "../../utils/holidays.js";

function getCellClass(isToday, isCurrentMonth, isRed, isAmber, isSelected) {
  if (isToday) return "border-2 border-red-500 text-red-600 font-bold";
  const activeBorder = isSelected ? "border-blue-400" : "border-transparent hover:border-blue-400";
  if (!isCurrentMonth) {
    const color = isRed ? "text-red-300" : isAmber ? "text-amber-400" : "text-gray-300";
    return `border-2 ${activeBorder} ${color}`;
  }
  const color = isRed ? "text-red-500" : isAmber ? "text-amber-500" : "text-gray-800";
  return `border-2 ${activeBorder} ${color}`;
}

function getDiffLabel(date, today, t) {
  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.trunc(diffDays / 7);
  const sign = diffDays >= 0 ? "+" : "";
  const wSign = diffWeeks >= 0 ? "+" : "";
  return `${sign}${diffDays}${t.diffDays} / ${wSign}${diffWeeks}${t.diffWeeks}`;
}

/**
 * A single day cell showing the Swedish weekday abbreviation and date number.
 * @param {{ date: Date, currentMonth: number, today: Date, isSelected: boolean, onSelect: (date: Date) => void }} props
 */
export function DayCell({ date, currentMonth, today, isSelected, onSelect }) {
  const t = useLang();
  const holidays = useHolidays();
  const fontSize = useFontSize();
  const isToday = date.toDateString() === today.toDateString();
  const isCurrentMonth = date.getMonth() === currentMonth;

  // Map JS getDay() (0=Sun) to ISO index (Mon=0..Sun=6)
  const dow = date.getDay();
  const isoIndex = dow === 0 ? 6 : dow - 1;
  const dayName = t.weekdays[isoIndex];
  const isSunday = dow === 0;
  const holiday = holidays.get(holidayKey(date));
  const holidayName = holiday?.name;
  const isRed   = isSunday || holiday?.type === "holiday";
  const isAmber = !isRed && holiday?.type === "notable";

  function handleClick() {
    onSelect(date);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    navigator.clipboard?.writeText(iso).catch(() => {});
  }

  return (
    <div
      className={`relative group flex flex-col items-center justify-center rounded py-1 text-sm leading-tight cursor-pointer ${getCellClass(isToday, isCurrentMonth, isRed, isAmber, isSelected)}`}
      onClick={handleClick}
    >
      <span className={`text-xs ${isRed ? "text-red-300" : isAmber ? "text-amber-400" : "text-gray-400"}`}>{dayName}</span>
      <span className={`font-semibold ${fontSize === "large" ? "text-2xl" : "text-lg"}`}>{date.getDate()}</span>
      {!isToday && (
        <div className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-xs text-white shadow ${isSelected ? "block" : "hidden group-hover:block"}`}>
          {holidayName && <span className={`block ${holiday.type === "notable" ? "text-amber-300" : "text-red-300"}`}>{holidayName}</span>}
          {getDiffLabel(date, today, t)}
        </div>
      )}
    </div>
  );
}
