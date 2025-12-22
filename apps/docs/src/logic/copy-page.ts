import copyTextWithFeedback from "./copy";

export const copyPage = () => {
  const copyButton = document.querySelector<HTMLElement>(".button--copy");

  copyButton?.addEventListener("click", async () => {
    const element = document.querySelector<HTMLElement>(".content-article");

    if (!element || !copyButton) return;

    const content = element.innerText;

    await copyTextWithFeedback(copyButton, () => content, {
      successText: "Copied",
      failText: "Failed",
      timeout: 1500,
    });
  });
};
