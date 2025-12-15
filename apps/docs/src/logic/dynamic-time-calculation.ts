export const dynamicTimeCalculation = (container: HTMLElement) => {
  const article = container.querySelector(".content-article");
  const readingTimeEl = container.querySelector<HTMLElement>(".time");

  if (!article || !readingTimeEl) return;

  const wordsPerMinute = 200;
  const text = article.textContent || "";
  const wordCount = text.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  readingTimeEl.textContent = `${readingTimeMinutes} min read`;
};
