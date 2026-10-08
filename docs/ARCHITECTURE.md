# Architecture

`src/main.tsx` mounts React. `src/model.ts` defines typed fictional dishes, budget/place/category/heat filtering, safe local-favorites parsing and immutable toggles. Results preserve fixture order and never implement proprietary ranking.

`src/App.tsx` owns discovery, favorites, filter and dialog state. The illustrated `FoodArt` component uses original SVG paths and fixture colors. Keyboard shortcuts act only on the focused card; touch gestures switch dishes. LocalStorage failure falls back to in-session favorites.

`src/styles.css` defines warm paper/coral tokens, Thai/Latin system typography, responsive filters/cards and visible focus. No externally fetched assets exist.

Unit tests cover filter intersections/budget boundaries/order and immutable toggles. Production-build Chromium tests exercise observable journeys, empty recovery, storage denial, focus, accessibility and external-request boundaries at three widths. There are no server routes, API clients, credentials, database files, restaurant datasets or infrastructure bindings.
