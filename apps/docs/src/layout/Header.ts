import { Logo } from "../shared/Logo";
import { Navigation } from "./Navigation";

export const Header = () => {
  const content = /* HTML */ `
    <header class="header">
      <div class="wrapper">
        <div class="header__content">
          ${Logo()} ${Navigation()}
          <div class="header__actions">
            <a
              href="https://github.com/kamil-engineer/Hintorium"
              class="button button--navigation"
            >
              <img
                class="button__image"
                width="18"
                height="18"
                alt="Github"
                src="/icons/icon-github.svg"
              />
            </a>

            <button class="button button--navigation">
              <img
                class="button__image"
                width="18"
                height="18"
                alt="Dark Theme"
                src="/icons/icon-dark.svg"
              />
            </button>

            <button class="button button--navigation button--hamburger">
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
      </div>
    </header>
  `;

  return content;
};
