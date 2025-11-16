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
          <button class="button button--lg button--primary">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="button__image"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <a
            href="https://github.com/kamil-engineer/Hintorium"
            class="button button--lg button--outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="button__image"
            >
              <path d="m16 18 6-6-6-6" />
              <path d="m8 6-6 6 6 6" />
            </svg>
            View on GitHub
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
