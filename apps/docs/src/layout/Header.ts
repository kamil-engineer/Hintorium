import { Logo } from "../shared/Logo";
import { Navigation } from "./Navigation";

export const Header = ({ docs = false }: { docs?: boolean } = {}) => {
  const content = /* HTML */ `
    <header class="header">
      <div class="wrapper">
        <div class="header__content">
          ${Logo()} ${Navigation({ docs })}
          <div class="header__actions">
            <a
              href="https://github.com/kamil-engineer/Hintorium"
              class="button button--navigation button--icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on Github"
            >
              <img
                class="button__image"
                width="18"
                height="18"
                alt="Github"
                src="/icons/icon-github.svg"
              />
            </a>

            <button
              class="button button--navigation button--icon button--hamburger"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <img
                class="button__image"
                width="18"
                height="18"
                alt="Menu"
                src="/icons/icon-menu.svg"
              />
            </button>
          </div>
        </div>
        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    </header>
  `;

  return content;
};
