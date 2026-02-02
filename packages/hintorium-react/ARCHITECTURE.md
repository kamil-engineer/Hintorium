# Structure

```
packages/hintorium-react/
├── src/
│   ├── index.ts                      # Main export
│   ├── types.ts                      # TypeScript types
│   ├── context/
│   │   └── TooltipContext.tsx        # Global configuration
│   ├── hooks/                        # Hooks
│   └── components/                   # Declarative Components
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── README.md                         # Documentation itself
```

## 🎨 How to use

### 1️⃣ Hook API (easiest)

```tsx
const tooltipRef = useTooltip("Hello!", { position: "top" });
return <button ref={tooltipRef}>Hover me</button>;
```

### 2️⃣ Declarative Component

```tsx
<Tooltip content="Hello!" position="top">
  <button>Hover me</button>
</Tooltip>
```

### 3️⃣ Global Provider

```tsx
<TooltipProvider options={{ theme: "dark" }}>
  <App />
</TooltipProvider>
```
