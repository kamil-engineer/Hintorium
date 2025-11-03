# Hintorium

> Advanced, accessible, and fully customizable tooltip library for modern web apps.  
> Built with TypeScript and SCSS.

---

## 🚀 Installation

```bash
npm install @hintorium/core
# or
pnpm add @hintorium/core
# or
yarn add @hintorium/core
```

---

## 🧩 Usage

Import the core script and styles in your app:

```ts
import { initTooltips } from "@hintorium/core";
import "@hintorium/core/styles.css";

initTooltips({
  theme: "dark",
  animation: "fade",
  delay: 150,
});
```

Then, in your HTML:

```html
<button data-tooltip="Save changes">💾 Save</button>
```

Hintorium automatically finds elements with `data-tooltip` attributes and applies positioning, animations, and themes.

---

## 🎨 Themes & Animations

Available out of the box:

**Themes:** `light`, `dark`, `glass`, `neon`, `pastel`, `gradient`  
**Animations:** `fade`, `slide`, `zoom`, `bounce`

You can customize them with SCSS variables or extend them via plugin API.

---

## ⚙️ Configuration

| Option        | Type                                  | Default   | Description                      |
| ------------- | ------------------------------------- | --------- | -------------------------------- |
| `theme`       | `string`                              | `"light"` | Tooltip theme                    |
| `delay`       | `number`                              | `150`     | Delay before showing tooltip     |
| `animation`   | `string`                              | `"fade"`  | Entry/exit animation             |
| `position`    | `"top" / "bottom" / "left" / "right"` | `"top"`   | Tooltip position                 |
| `interactive` | `boolean`                             | `false`   | Allow hover/focus inside tooltip |

---

## 🧠 Accessibility

- Fully ARIA-compliant
- Keyboard accessible (`Tab`, `Esc`)
- Screen-reader support
- High-contrast mode compatible

---

## 📘 Documentation

👉 Full documentation, examples, and live demos available at  
[https://hintorium.vercel.app](https://hintorium.vercel.app)

---

## 🧱 Project Structure

This library is part of the **Hintorium Monorepo**:

```
.
├── apps/
│   └── docs/           # documentation and examples
└── packages/
    └── hintorium/      # the core tooltip library
```

---

## 🧾 License

MIT © [Kamil Engineer](https://github.com/kamil-engineer)  
See [LICENSE](https://github.com/kamil-engineer/Hintorium/blob/main/LICENSE)
