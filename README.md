# 🧩 Hintorium

**Hintorium** is a lightweight tooltip library written in **TypeScript + CSS**,
designed with simplicity, accessibility, and easy integration with any framework (React, Vue, Svelte, Angular) in mind.

---

## ✨ Features (MVP)

- Tooltips invoked via the \`data-tooltip\` attribute
- Position support: \`top\`, \`right\`, \`bottom\`, \`left\`
- Themes: \`dark\`, \`light\`
- Fade-in / fade-out animation
- Zero dependencies, lightweight package

---

## 🚀 Technologies

- **TypeScript** – library logic
- **CSS** – tooltip styles and themes
- **HTML (demo)** – quick testing
- **npm** – package and distribution management

---

## 🔧 Installation

### 1. Local use (from repository)

Clone the repo:
```bash
git clone https://github.com/kamil-engineer/hintorium.git
```

Install:
```bash
cd hintorium
npm install
```

Build the project:
```bash
npm run build
```

### 2. Import in the project

Add styles and initialize the library:
```html

<link rel="stylesheet" href="./dist/styles.css">
<script type="module">
import { initTooltip } from "./dist/index.js";
initTooltip();
</script>
```

---

## 📚 Usage

Simply add the \`data-tooltip\` attribute to the HTML element:

```html
<button data-tooltip="Click me!">Hover me</button>
```

### Positioning

```html
<button data-tooltip="Bottom" data-tooltip-pos="bottom">Bottom</button>
<button data-tooltip="Right" data-tooltip-pos="right">Right</button>
```

### Themes

```html
<button data-tooltip="Dark Theme" data-tooltip-theme="dark">Dark</button>
<button data-tooltip="Light Theme" data-tooltip-theme="light">Light</button>
```
---

## 🛣️ Roadmap

The development plan is detailed in [\`BACKLOG.md\`](./BACKLOG.md).

- **Phase 1 – MVP**: Basic tooltips (hover, positions, themes, animations) ✅
- **Phase 2 – v1.0**: Accessibility (A11y), mobile support, smart positioning, configuration API
- **Phase 3 – v1.5**: Additional themes, animations, dynamic content, framework integrations
- **Phase 4 – v2.0**: Hint system (onboarding, inline hints, plugins, analytics)

---

## 👫 Community Contributions

Pull Requests and Issues are welcome!

- Report a bug → [Issues](../../issues)
- Suggest a feature → [Discussions](../../discussions)
- Join the development 🚀

---

## 📜 License

The project is available under the **MIT** license – you can use, modify, and expand it in your applications.
