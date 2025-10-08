# 📌 Backlog – Hintorium

Roadmap for the tooltip library development.

---

## 🎯 Phase 1 – MVP (Minimum Viable Product)

Basic features to make the library usable.

- [ ] Tooltip on hover (`data-tooltip`)
- [ ] Positions (`top`, `right`, `bottom`, `left`)
- [ ] Themes (`dark`, `light`)
- [ ] Fade-in / fade-out animation
- [ ] TypeScript configuration (`tsconfig.json`)
- [ ] Compilation to `dist/`
- [ ] HTML demo with simple usage

---

## 🚀 Phase 2 – v1.0 "Production Ready"

The most important things to make the library ready for use in real projects.

- [ ] ♿ Accessibility (A11y):
- [ ] Focus support (keyboard)
- [ ] ARIA (`aria-describedby`)
- [ ] 📱 Mobile support:
- [ ] Tap / long-press support
- [ ] Responsive screen adaptation
- [ ] 🧭 Smart positioning (auto-reposition when the tooltip moves outside the viewport)
- [ ] ⚙️ Configuration API (`initTooltip({ delay, theme, position })`)
- [ ] 🛠️ Basic testing (e.g., Playwright/Jest for DOM)

---

## 🌱 Phase 3 – v1.5 "Usability and Style"

Features that distinguish the library and increase the user experience.

- [ ] 🎨 Additional themes (glass, pastel, neon, gradients)
- [ ] ✨ Additional animations (slide, zoom, bounce)
- [ ] ⏱️ Delay option (`data-tooltip-delay="300"`)
- [ ] 🔗 Tooltips with HTML (e.g., `<img>`, `<a>`)
- [ ] 🔄 Dynamic content (callback or async load)
- [ ] 📦 Wrappers for React/Vue/Svelte (`@hintorium/react`)

---

## 🌍 Phase 4 – v2.0 "Tooltip System"

Going beyond classic tooltips → greater value for the community.

- [ ] 🗺️ Onboarding / guided tours (step-by-step tooltips)
- [ ] 🏷️ Inline hints (small "?" icons with hints)
- [ ] 🧩 Plugins / extensions:
- [ ] Markdown tooltips
- [ ] i18n integration (translations)
- [ ] 📊 Analytics (number of times the tooltip has appeared)

---

## 🛡️ Bonus options

Additional ideas that can be implemented later.

- [ ] Lazy rendering (tooltip created only when needed)
- [ ] Sticky mode (tooltip disappears only when clicking outside of it)
- [ ] Developer mode (debugging, frame around the tooltip)
- [ ] RTL support (Arabic/Hebrew languages)

---
