# Hintorium Plugin (React)

![npm](https://img.shields.io/npm/dw/hintorium-react)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

> React plugin to hintorium-core package.
> Built with React and Typescript

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

Import the core styles in your app:

```ts
import "hintorium-core/dist/hintorium-core.css";
```

Import hook / declarative component in your component

```ts
export const MyComponent = () => {
    const tooltipRef = useTooltip('Click me!', { position: 'top' });
    return <button ref={tooltipRef}>Hover me</button>;
}
```

Optionally you can add a global context to handle global configuration

```ts
function App(){
    return (
        <TooltipProvider options={{theme:"dark"}}>
            <YourApp/>
        </TooltipProvider>
    )
}
```

---

## Architecture

```
src
├── index.ts                      # Main file
├── types.ts                      # Package types
├── hooks/                        # Hooks
├── components/                   # Declarative components
└── context/                      # Context
```

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
