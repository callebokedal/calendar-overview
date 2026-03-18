import { getWeekDiff, formatWeekDiff } from "../../utils/calendar.js";
import { DayCell } from "./DayCell.jsx";

/**
 * A single week row: week-number cell followed by 7 day cells (Mon–Sun).
 * @param {{
 *   weekNum: number,
 *   weekMonday: Date,
 *   days: Date[],
 *   currentMonth: number,
 *   today: Date,
 *   currentMonday: Date,
 *   selectedDate: Date|null,
 *   onSelectDate: (date: Date) => void
 * }} props
 */
export function WeekRow({ weekNum, weekMonday, days, currentMonth, today, currentMonday, selectedDate, onSelectDate }) {
  const diff = getWeekDiff(weekMonday, currentMonday);
  const isCurrentWeek = diff === 0;

  const weekCellClass = isCurrentWeek
    ? "bg-red-500 text-white rounded font-semibold"
    : "";

  const rowClass = isCurrentWeek
    ? "grid grid-cols-8 gap-px py-0.5 bg-blue-50 border-t border-gray-200"
    : "grid grid-cols-8 gap-px py-0.5 hover:bg-gray-50 border-t border-gray-200";

  return (
    <div className={rowClass}>
      <div className={`flex flex-col items-center justify-center text-xs leading-tight py-1 border-r border-gray-200 ${weekCellClass}`}>
        <span className="text-lg font-semibold">{weekNum}</span>
        <span className="text-gray-400">{diff == 0 ? '' : `${formatWeekDiff(diff)}v`}</span>
      </div>
      {days.map((date) => (
        <DayCell
          key={date.toDateString()}
          date={date}
          currentMonth={currentMonth}
          today={today}
          isSelected={selectedDate?.toDateString() === date.toDateString()}
          onSelect={onSelectDate}
        />
      ))}
    </div>
  );
}
