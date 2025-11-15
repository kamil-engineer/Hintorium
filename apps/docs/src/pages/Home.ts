import { Header } from "../layout/Header";
import { MobileNavigation } from "../layout/MobileNavigation";

export default function Home(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    ${MobileNavigation()} ${Header()}
    <h1>Welcome to Hintorium Documentation</h1>
  `;

  container.innerHTML = content;

  return container;
}
