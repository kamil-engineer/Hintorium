import { createIcon } from "../utils/icons";

export const Hero = () => {
  const content = /* HTML */ `
    <section class="hero">
      <div class="grid-background"></div>
      <div class="hero__wrapper">
        <div class="subtitle-wrapper">
          <span class="subtitle">Modern Tooltips Library</span>
        </div>
        <h1 class="hero__title">
          Elegant Tooltips for
          <span class="hero__title-bottom">Modern Web Apps</span>
        </h1>
        <p class="hero__description">
          A lightweight, accessible tooltip library with smooth animations,
          customizable styling, and built-in best practices. Create delightful
          user experiences effortlessly.
        </p>
        <div class="hero__actions">
          <a href="/docs" class="button button--lg button--primary">
            Get Started ${createIcon("rightArrow", "button__image")}
          </a>
          <a
            href="https://github.com/kamil-engineer/Hintorium"
            class="button button--lg button--outline"
          >
            ${createIcon("code", "button__image")} View on GitHub
          </a>
        </div>
        <div class="hero__partners">
          <p class="hero__partners-title">Trusted by developers at</p>
          <ul class="hero__partners-list">
            <li class="hero__partners-partner">TechCorp</li>
            <li class="hero__partners-partner">DevStudio</li>
            <li class="hero__partners-partner">WebFlow</li>
            <li class="hero__partners-partner">Savely</li>
          </ul>
        </div>
      </div>
    </section>
  `;

  return content;
};
