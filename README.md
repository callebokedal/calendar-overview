# Calendar App

A compact, single-page calendar that gives you a clear week-by-week overview of the year. Open it in any browser — no installation, no account, no internet connection required after download.

## What it does

- Scrollable month-by-month view, opening at the current month
- Every week is shown as a row, with the ISO week number and how many weeks away it is from today
- Today, public holidays and Sundays stand out in **red**; special eves (Christmas Eve, Midsummer Eve, etc.) in **amber**
- Tap or click any day to see how many days and weeks away it is — and copy the date in `yyyy-mm-dd` format to your clipboard
- Month headers show which quarter the month belongs to and how far it is from today
- Floating navigation bar to jump to today or skip three months forward/back
- Supports **Swedish** and **English**, with public holidays computed for each language; preference is saved in your browser
- Distributes as a **single self-contained HTML file** — just share the file

## Using the built file

Download `dist/index.html` and open it in any modern browser. That's it.

## Building from source

You only need [Podman](https://podman.io/) (or Docker — replace `podman` with `docker` everywhere).

```bash
# 1. Install dependencies (re-execute after potential package.json updates)
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm install"

# 2. Build the container image (only needed once, or after Containerfile changes)
podman build -t myapp .

# 3. Start the dev server  →  http://localhost:5175
podman run --rm -it -v $(pwd):/app:z -w /app -p 5175:5175 --name myapp-dev myapp

# 4. Stop the dev server
podman stop myapp-dev

# 5. Produce the distributable single-file build
podman run --rm -v $(pwd):/app:z -w /app node:22-alpine sh -c "npm run build"
# → dist/index.html
```

## Tech stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 + vite-plugin-singlefile | Build tool; single-file output |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |

