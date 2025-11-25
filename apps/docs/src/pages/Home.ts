import { Examples } from "../layout/Examples";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Hero } from "../layout/Hero";
import { MobileNavigation } from "../layout/MobileNavigation";
import { Overview } from "../layout/Overview";
import { Reviews } from "../layout/Reviews";

export default function Home(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ ` <div class="header-with-nav">
      ${MobileNavigation()} ${Header()}
    </div>
    <main>${Hero()} ${Overview()} ${Examples()} ${Reviews()}</main>
    ${Footer()}`;

  container.innerHTML = content;

  return container;
}
