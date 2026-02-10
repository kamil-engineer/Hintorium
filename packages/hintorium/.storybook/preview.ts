import type { Preview, StoryFn } from "@storybook/html-vite";

import "../src/style.css";

export const decorators: ((Story: StoryFn) => HTMLElement)[] = [
  (Story) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.height = "100vh";
    wrapper.style.padding = "1rem";
    wrapper.style.background = "#f5f5f5";
    const storyResult = Story({} as any, {} as any);
    if (typeof storyResult === "string") {
      wrapper.innerHTML = storyResult;
    } else if (storyResult instanceof Node) {
      wrapper.appendChild(storyResult);
    } else if ((storyResult as any)?.root instanceof Node) {
      wrapper.appendChild((storyResult as any).root);
    } else {
      try {
        wrapper.appendChild(storyResult as unknown as Node);
      } catch {
        return wrapper;
      }
    }
    return wrapper;
  },
];

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  layout: "fullscreen",
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#f5f5f5" },
      { name: "dark", value: "#222" },
    ],
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
