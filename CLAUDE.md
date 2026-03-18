# CLAUDE.md – React App Project Template

## Language
- All code, comments, variable names, function names, and documentation must be written in **English**
- UI text (labels, placeholders, messages) should also be in English unless otherwise specified

## Technical Stack
- **React 19** with **JavaScript** (no TypeScript)
- **Vite 6** as build tool
- **Tailwind CSS v4** for styling (utility classes only, no custom CSS files unless necessary)
- **React Router v7** for routing
- **vite-plugin-singlefile** for producing a self-contained single-file HTML build
- Add further libraries only when explicitly requested

## Container-First Development

All development happens inside a Podman container. **Never suggest running `npm` or `node` directly on the host machine.** See [README.md](README.md) for the full build and run commands.

Key rules:
- Install/update dependencies: `podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm install"`
- Build image: `podman build -t myapp .` (re-run when `Containerfile` changes)
- Dev server on port 5175: `podman run --rm -it -v $(pwd):/app:z -w /app -p 5175:5175 --name myapp-dev myapp`
- Production build: `npm run build` inside the container → `dist/index.html`
- The `Containerfile` (not `Dockerfile`) is the source of truth for the runtime environment
- Use `node:22-alpine` (active LTS, pinned major) for both the dev container and one-off `npm` runs
- Only suggest up-to-date, stable, and secure base images

## Project Structure

```
src/
  features/
    calendar/      # All calendar UI and logic
      CalendarView.jsx    # Root calendar component; owns lang + selectedDate state
      CalendarFooter.jsx  # Floating footer (navigation + language toggle)
      CalendarInner.jsx   # Inner component (inside LangContext.Provider)
      MonthBlock.jsx      # Month header + week rows
      WeekRow.jsx         # One row per ISO week
      DayCell.jsx         # Single day cell with tooltip and clipboard copy
      LangContext.jsx     # LangContext, HolidaysContext, STRINGS, useLang(), useHolidays()
  pages/
    CalendarPage.jsx      # Route-level page (thin wrapper around CalendarView)
  utils/
    calendar.js           # Pure date helpers: ISO weeks, week diff, month ranges
    holidays.js           # Holiday computation (Easter algorithm, SE/EN rules)
  assets/          # Static assets (icons, images)
  components/      # Reusable UI components (not page-specific)
    common/        # Generic components (Button, Modal, Badge, etc.)
    layout/        # Layout components (Sidebar, Header, Panes, etc.)
  hooks/           # Shared custom hooks
  services/        # Data access layer (local storage, import/export, API)
  types/           # JSDoc type definitions and shared constants
```

## App functionality
The app should:
- Present a scrollable overview of months, with the current month in view on load
- Each month is separated by a header row showing: `<year> <month name>` (left), quarter(s) e.g. `Q1` (centre-right), and month diff vs today e.g. `+2m` (right); current month is highlighted in red
- Each month lists all ISO weeks that belong to it (a week belongs to the month its Thursday falls in — no duplicate weeks across months)
- Each week is a row with:
  - A week-number cell showing the ISO week number and the week diff vs current week (e.g. `v12 / +1v`); current week highlighted in red
  - Seven day cells (Monday–Sunday) each showing the two-letter weekday abbreviation and date number
- Day cell colours:
  - Today: red border + red text
  - Public holidays and Sundays: red text
  - Notable eves (Julafton, Påskafton, Midsommarafton, Valborgsmässoafton, Nyårsafton): amber text
  - Days outside the displayed month: muted/dimmed
- Clicking/tapping a day cell:
  - Shows a floating tooltip with the day's name (if a holiday/notable), and the diff in days and weeks relative to today (e.g. `+8d / +1v`)
  - Copies the date to clipboard in ISO format `yyyy-mm-dd`
  - Only one tooltip visible at a time; clicking the same cell again dismisses it
  - Hovering also shows the tooltip on desktop
- Floating footer bar with:
  - Scroll back 3 months
  - Scroll to today
  - Scroll forward 3 months
  - Language toggle button (`SV` / `EN`)
- Load-more buttons at the top and bottom of the list to extend the visible range by 6 months
- Language (Swedish / English) is persisted in `localStorage` and defaults to Swedish
- Holiday and month/weekday names respect the selected language
- Distributable as a single self-contained HTML file (`npm run build` → `dist/index.html`)

## Code Conventions
- **Functional components only** – never class components
- **Named exports** – never default exports (except for pages used by React Router)
- **One component per file**
- **No inline styles** – use Tailwind classes exclusively
- Props must be documented with JSDoc `@param` comments for complex components
- Avoid deeply nested ternaries – extract to variables or helper functions

## State Management
- **Local component state** (`useState`) for purely local UI state
- Add Zustand or React Query only when explicitly requested
- Do not mix server state with UI state

## File Naming
- Component files: `PascalCase.jsx`
- Hook files: `camelCase.js`, prefixed with `use`
- Service files: `camelCase.service.js` (e.g. `storage.service.js`)
- Utility files: `camelCase.js`

## What to Avoid
- No TypeScript (use JSDoc for type hints if needed)
- No Redux or MobX
- No CSS Modules or styled-components – Tailwind only
- No class components
- No default exports (except route-level pages)
- No host-level `npm install` – always run inside container
