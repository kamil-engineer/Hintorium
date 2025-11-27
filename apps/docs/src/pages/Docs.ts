import { Header } from "../layout/Header";
import { MobileNavigation } from "../layout/MobileNavigation";

export default function Docs(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ ` <div class="header-with-nav">
      ${MobileNavigation()} ${Header({ docs: true })}
    </div>
    <main>Docs page!</main>`;

  container.innerHTML = content;

  return container;
}
