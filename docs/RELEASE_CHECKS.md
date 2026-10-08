# Local release evidence — 2026-10-08

Target: independently authored static dish-discovery showcase. macOS / Node 24 / Chromium.

| Check | Observed result |
|---|---|
| `npm ci` | Clean lockfile install succeeded |
| `npm run check` | Lint, typecheck, 4 unit tests and production build passed |
| `npm audit --audit-level=high` | 0 vulnerabilities |
| `PREVIEW=1 npm run test:e2e` | 9 Chromium tests passed against the production artifact |
| Gitleaks 8.30.1 redacted source + build scan | No detected secrets |
| Source/configuration/fixture/asset review | Independent source and SVG; no private implementation, datasets, photos or ranking copied |
| Runtime license notices | React/React DOM/Scheduler MIT and Lucide ISC notices retained |
| Browser workflow | Filter intersections/budget/empty reset, next dish, choose dialog, save/reload/remove, keyboard, blocked storage and horizontal gesture exercised |
| Browser boundary | No external HTTP requests or page errors in primary journeys |
| Accessibility/responsive | axe, overflow and focus tests at 1440/1024/390; screenshots inspected |

Menu items, shops, food courts, prices and ingredients are fictional. No order, reservation,
payment, allergen verification, API, ranking service or production operation occurs.
All state stays in the session or optionally browser-local favorites.

Publication additionally verifies the staged allowlist, a single fresh initial commit,
redacted history scan, actual remote tree/visibility, rendered README and GitHub CI. Those
remote results are separate from this local record. No hosted application or provider
integration is deployed or live-verified. This edition is a prototype/showcase.
