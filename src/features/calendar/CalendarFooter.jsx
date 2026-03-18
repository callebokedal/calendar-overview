import { useLang } from "./LangContext.jsx";

/**
 * Floating footer with calendar navigation actions.
 * @param {{
 *   onToday: () => void,
 *   onBack3: () => void,
 *   onForward3: () => void,
 *   onOpenSettings: () => void
 * }} props
 */
export function CalendarFooter({ onToday, onBack3, onForward3, onOpenSettings }) {
  const t = useLang();
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2 z-20">
      <button
        onClick={onBack3}
        title={t.titleBack3}
        className="text-sm px-3 py-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
      >
        {t.back3}
      </button>
      <button
        onClick={onToday}
        title={t.titleToday}
        className="text-sm px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 font-semibold transition-colors"
      >
        {t.today}
      </button>
      <button
        onClick={onForward3}
        title={t.titleForward3}
        className="text-sm px-3 py-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
      >
        {t.forward3}
      </button>
      <div className="w-px h-4 bg-gray-200 mx-1" />
      <button
        onClick={onOpenSettings}
        title={t.settings}
        className="p-1 px-2 rounded-full hover:bg-gray-100 text-gray-500 font-bold text-lg leading-none transition-colors"
      >
        ···
      </button>
    </div>
  );
}
