import { getWeeksForMonth } from "../../utils/calendar.js";
import { WeekRow } from "./WeekRow.jsx";
import { useLang } from "./LangContext.jsx";

/**
 * A month block: header row + one WeekRow per ISO week overlapping the month.
 * @param {{
 *   year: number,
 *   month: number,
 *   today: Date,
 *   currentMonday: Date,
 *   selectedDate: Date|null,
 *   onSelectDate: (date: Date) => void,
 *   blockRef?: React.RefObject<HTMLDivElement> | ((el: HTMLDivElement) => void)
 * }} props
 */
export function MonthBlock({ year, month, today, currentMonday, selectedDate, onSelectDate, blockRef }) {
  const t = useLang();
  const weeks = getWeeksForMonth(year, month);

  const monthDiff = (year - today.getFullYear()) * 12 + (month - today.getMonth());
  const monthDiffLabel = monthDiff === 0 ? "" : monthDiff > 0 ? `+${monthDiff}m` : `${monthDiff}m`;
  const monthDiffClass = monthDiff === 0 ? "text-red-500 font-bold" : "text-gray-400 lowercase";

  // Collect distinct quarters touched by the Thursdays of this month's weeks
  const quarters = [...new Set(
    weeks.map(({ days }) => `Q${Math.floor(days[3].getMonth() / 3) + 1}`)
  )].join(" ");

  return (
    <div ref={blockRef} className="mb-0">
      <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-500 uppercase tracking-widest border-b border-gray-200">
        <span><span className="font-normal">{year}</span> {t.months[month]}</span>
        <span className="flex gap-2 items-center">
          <span className="text-gray-400 normal-case">{quarters}</span>
          <span className={monthDiffClass}>{monthDiffLabel}</span>
        </span>
      </div>
      {weeks.map(({ weekNum, weekMonday, days }) => (
        <WeekRow
          key={weekMonday.toDateString()}
          weekNum={weekNum}
          weekMonday={weekMonday}
          days={days}
          currentMonth={month}
          today={today}
          currentMonday={currentMonday}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      ))}
    </div>
  );
}
