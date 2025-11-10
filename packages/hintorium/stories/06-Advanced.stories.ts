import { initTooltip, Tooltip } from "../src/index";
import { I18n } from "../src/tooltip/i18n";

export default {
  title: "Tooltip / Advanced",
};

export const RTLTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute(
    "data-hintorium-tooltip",
    "RTL Tooltip for testing purpose, must be biiiiiiiiiig"
  );
  button.setAttribute("data-hintorium-tooltip-position", "left");
  button.setAttribute("dir", "rtl");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

RTLTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with RTL direction.",
    },
  },
};

export const I18nTooltip = () => {
  I18n.setTranslations(
    "pl",
    JSON.parse(
      JSON.stringify({
        tooltip: {
          title: "Podpowiedź",
        },
      })
    )
  );

  I18n.setTranslations(
    "en",
    JSON.parse(
      JSON.stringify({
        tooltip: {
          title: "Toltipurio",
        },
      })
    )
  );

  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", `tooltip.title`);

  document.body.appendChild(button);

  initTooltip();
  return button;
};

I18nTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with i18n functionality.",
    },
  },
};
