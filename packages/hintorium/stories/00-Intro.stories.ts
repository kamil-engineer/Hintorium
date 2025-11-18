export default {
  title: "📖 Hintorium - Documentation",
  parameters: {
    docs: {
      description: {
        component: `
Hintorium is an advanced TypeScript tooltip library focused on accessibility, smart positioning, and custom design.

### ✨ Key Features:
- Smart positioning (auto flip to stay in viewport)
- Multiple themes (dark, light, neon, glass)
- Smooth animations (fade, zoom, bounce, slide)
- Async or dynamic content (callbacks, promises)
- Keyboard and screen reader support (A11y)
- Mobile-friendly (tap and long-press)
- Extensible plugin system
        `,
      },
    },
  },
};

export const Intro = () => {
  const container = document.createElement("div");
  container.classList.add("storybook-container-hintorium");
  container.innerHTML = `
    <h2 style="text-align:center;">Welcome to Hintorium</h2>
    <p style="text-align:center; max-width:600px; margin:auto;">
      Explore different tooltip configurations using the sidebar.
      Each story demonstrates a core feature of Hintorium.
    </p>
  `;
  return container;
};
