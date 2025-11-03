import { initTooltip, Tooltip } from "../src/index";

export default {
  title: "Tooltip / Dynamic & HTML Content",
};

export const NormalTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Tooltip");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

NormalTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with normal content.",
    },
  },
};

export const MarkdownTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute(
    "data-hintorium-tooltip",
    "**Markdown** ***Markdownnnn***"
  );
  document.body.appendChild(button);

  initTooltip();
  return button;
};

MarkdownTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with markdown content.",
    },
  },
};

export const HTMLTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute(
    "data-hintorium-tooltip",
    "<strong>Tooltip!</strong> <span style='color:red'>Red!</span>"
  );
  document.body.appendChild(button);

  initTooltip();
  return button;
};

HTMLTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with html content.",
    },
  },
};

export const DynamicHTMLTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";

  const element = document.createElement("div");
  element.innerHTML = `
    <div style="padding: 0.5rem;">
      <b>Custom HTML</b><br/>
      <small>This comes from an HTMLElement</small>
    </div>
  `;

  new Tooltip(button, element);

  document.body.appendChild(button);

  return button;
};

DynamicHTMLTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with dynamic html content.",
    },
  },
};

export const SyncTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";

  new Tooltip(button, () => {
    return `Time: ${new Date().toLocaleTimeString()}`;
  });

  document.body.appendChild(button);

  return button;
};

SyncTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with sync content.",
    },
  },
};

export const AsyncTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";

  new Tooltip(button, async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const data = await res.json();
    return `<b>${data.name}</b><br><small>${data.email}</small>`;
  });

  document.body.appendChild(button);

  return button;
};

AsyncTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with async content.",
    },
  },
};
