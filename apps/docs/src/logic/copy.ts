type CopyOptions = {
  successText?: string;
  failText?: string;
  timeout?: number;
};

function findOrCreateTextSpan(button: HTMLElement): HTMLElement {
  const existing = button.querySelector<HTMLElement>(
    ".code-viewer__copy-text, .copy-button__text"
  );

  if (existing) return existing;

  const span = document.createElement("span");
  span.className = "copy-button__text";

  const nodes: ChildNode[] = [];
  button.childNodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) {
      nodes.push(n);
    }
  });

  if (nodes.length) {
    const text = nodes.map((n) => n.textContent?.trim()).join(" ");
    span.textContent = text;
    nodes.forEach((n) => n.parentNode?.removeChild(n));
  }

  button.appendChild(span);
  return span;
}

export async function copyTextWithFeedback(
  button: HTMLElement,
  getText: () => string,
  opts: CopyOptions = {}
) {
  const { successText = "Copied!", failText = "Failed", timeout = 2000 } = opts;

  const textSpan = findOrCreateTextSpan(button);
  const original = textSpan.textContent || "";
  const text = getText();

  try {
    await navigator.clipboard.writeText(text);
    textSpan.textContent = successText;
    setTimeout(() => (textSpan.textContent = original), timeout);
    return true;
  } catch (err) {
    textSpan.textContent = failText;
    setTimeout(() => (textSpan.textContent = original), timeout);
    return false;
  }
}

export default copyTextWithFeedback;
