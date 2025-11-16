import { Header } from "../layout/Header";
import { Hero } from "../layout/Hero";
import { MobileNavigation } from "../layout/MobileNavigation";

export default function Home(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ ` ${MobileNavigation()} ${Header()}
    <main>${Hero()}</main>`;

  container.innerHTML = content;

  return container;
}
