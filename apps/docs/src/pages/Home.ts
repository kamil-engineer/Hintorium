import { Examples } from "../layout/Examples";
import { Header } from "../layout/Header";
import { Hero } from "../layout/Hero";
import { MobileNavigation } from "../layout/MobileNavigation";
import { Overview } from "../layout/Overview";

export default function Home(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ ` ${MobileNavigation()} ${Header()}
    <main>${Hero()} ${Overview()} ${Examples()}</main>`;

  container.innerHTML = content;

  return container;
}
