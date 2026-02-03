# Hintorium Core (Typescript)

![npm](https://img.shields.io/npm/dw/hintorium-core)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

> Advanced, accessible, and fully customizable tooltip library for modern web apps.  
> Built with TypeScript and SCSS.

---

## 🚀 Installation

```bash
npm install hintorium-core
# or
pnpm add hintorium-core
# or
yarn add hintorium-core
```

---

## 🧩 Usage

Import the core script and styles in your app:

```ts
import { initTooltip } from "hintorium-core";
import "hintorium-core/dist/hintorium-core.css";

// Global setup
initTooltip(|OPTIONAL CONFIGURATION|);

// Manual setup
new Tooltip(*ELEMENT*,*CONTENT*,|OPTIONAL CONFIGURATION|)
```

Then, in your HTML:

```html
<button data-hintorium-tooltip="Save changes">💾 Save</button>
```

Hintorium automatically finds elements with `data-hintorium-tooltip` attributes and applies positioning, animations, and themes.

---

## 🎨 Themes & Animations

Available out of the box:

**Themes:** `light`, `dark`, `glass`, `neon`, `pastel`, `gradient`  
**Animations:** `fade`, `slide`, `zoom`, `bounce`

You can customize them with SCSS variables or extend them via plugin API.
<br>
Hintorium allows you to very easily modify styles to suit your project's needs, based on the CSS Variables syntax.

---

## ⚙️ Configuration

| Option            | Type               | Default           | Description                                          |
| ----------------- | ------------------ | ----------------- | ---------------------------------------------------- |
| `theme`           | `TooltipTheme`     | `"dark"`          | Tooltip theme                                        |
| `delay`           | `number`           | `300`             | Delay before showing tooltip                         |
| `animation`       | `TooltipAnimation` | `"fade"`          | Entry/exit animation                                 |
| `position`        | `TooltipPosition`  | `"top"`           | Tooltip position                                     |
| `sticky`          | `boolean`          | `false`           | Allow sticky tooltip                                 |
| `a11y`            | `object`           | `readonly object` | A11y configuration                                   |
| `mobile`          | `object`           | `readonly object` | Mobile UX configuration                              |
| `rtl`             | `boolean`          | `false`           | RTL setup                                            |
| `isTour`          | `boolean`          | `false`           | Tooltip Tour configuration                           |
| `onShow`          | `function`         | `undefined`       | Easily action on show tooltip setup                  |
| `onInjectContent` | `function`         | `undefined`       | Easily action on inject/update content tooltip setup |

---

## 🧠 Accessibility

- Fully ARIA-compliant
- Keyboard accessible
- Screen-reader support
- High-contrast mode compatible
- Mobile support
- UX details as touch screens configurations, auto detections.

---

## 📘 Documentation

👉 Full documentation, examples, and live demos available at  
<strong>Docs : </strong>[https://hintorium.vercel.app](https://hintorium.vercel.app)
<br>
<strong>Storybook (For Devs) : </strong>[https://hintorium-storybook.vercel.app](https://hintorium-storybook.vercel.app)

---

## 🧱 Project Structure

This library is part of the **Hintorium Monorepo**:

```
.
├── apps/
│   └── docs/                 # documentation and examples
└── packages/
    └── hintorium/            # the core tooltip library
    └── hintorium-react/      # react plugin
```

---

## 🧾 License

MIT © [Kamil Engineer](https://github.com/kamil-engineer)  
See [LICENSE](https://github.com/kamil-engineer/Hintorium/blob/main/LICENSE)
