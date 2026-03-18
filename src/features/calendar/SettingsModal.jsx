import { useLang } from "./LangContext.jsx";

const REPO_URL = "https://github.com/callebokedal/calendar-overview";

/**
 * @param {{
 *   lang: string,
 *   fontSize: string,
 *   onLangChange: (lang: string) => void,
 *   onFontSizeChange: (size: string) => void,
 *   onClose: () => void
 * }} props
 */
export function SettingsModal({ lang, fontSize, onLangChange, onFontSizeChange, onClose }) {
  const t = useLang();

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center sm:items-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-sm p-6 pb-8 sm:pb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">{t.settings}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
            aria-label={t.settingsClose}
          >
            ✕
          </button>
        </div>

        {/* Language */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.settingsLang}</p>
          <div className="flex gap-2">
            {["sv", "en"].map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  lang === l
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {l === "sv" ? "Svenska" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.settingsFontSize}</p>
          <div className="flex gap-2">
            {["small", "large"].map((size) => (
              <button
                key={size}
                onClick={() => onFontSizeChange(size)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  fontSize === size
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {size === "small" ? t.settingsFontSmall : t.settingsFontLarge}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.tipsHeader}</p>
          <div className="flex gap-2 ms-5">
            <ul className="list-disc">
                <li>{t.tipDateDiff}</li>
                <li>{t.tipCopyDate}</li>
                <li>{t.tipSpecialDays}</li>
            </ul>
          </div>
        </div>

        {/* Repo link */}
        <div className="border-t border-gray-100 pt-4">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            {t.settingsRepo} ↗
          </a>
        </div>
      </div>
    </div>
  );
}
