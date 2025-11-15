export default function Home(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");
  container.appendChild(document.createElement("h1"));
  return container;
}
