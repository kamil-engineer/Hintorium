import { DocsArticleActions } from "../../components/DocsArticleActions";
import { introductionTopics } from "../../data/topics";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export function Introduction(): HTMLElement {
  const content = document.createElement("div");
  content.classList.add("container");

  content.innerHTML = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Introduction</h1>
          ${DocsArticleActions()}
        </header>
        <p class="content-article__description">
          Get started with Hintorium - a modern, lightweight tooltip library for
          your web applications.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")} <span class="time">Loading ...</span></span
          >
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">What is Hintorium?</h2>
        <p class="docs-section__text">
          Hintorium is a lightweight, accessible tooltip library designed for
          modern web applications. It provides an elegant way to add contextual
          help and information to your UI elements without overwhelming users or
          bloating your bundle size.
        </p>

        <div class="intro-features">
          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("zap", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Lightweight</h3>
              <p class="intro-feature__description">
                Won't slow down your application.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("accessibility", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Accessible</h3>
              <p class="intro-feature__description">
                Built-in ARIA support, keyboard navigation, and screen reader
                friendly.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("palette", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Customizable</h3>
              <p class="intro-feature__description">
                Theme with CSS variables or create your own styles from scratch.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("code", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Framework Agnostic</h3>
              <p class="intro-feature__description">
                Works with vanilla Typescript, React.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section" id="key-features">
        <h2 class="docs-section__title">Key Features</h2>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">Smart Positioning</h3>
              <p class="feature-item__description">
                Automatically adjusts tooltip position to stay within viewport
                bounds. Supports top, right, bottom, and left placements with
                auto-flip behavior.
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">Rich Content Support</h3>
              <p class="feature-item__description">
                Display plain text, HTML content, or even interactive elements
                inside tooltips. Perfect for complex help dialogs and contextual
                information.
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">Smooth Animations</h3>
              <p class="feature-item__description">
                Built-in fade and scale animations powered by CSS transitions.
                Customize timing and easing to match your brand.
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">Touch-Friendly</h3>
              <p class="feature-item__description">
                Works seamlessly on touch devices with tap-to-show behavior.
                Mobile-optimized with proper touch event handling.
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">TypeScript Support</h3>
              <p class="feature-item__description">
                Full type definitions included. Get autocomplete and type
                checking out of the box in your TypeScript projects.
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__marker">
              ${createIcon("check", "feature-item__icon")}
            </div>
            <div class="feature-item__content">
              <h3 class="feature-item__title">Zero Dependencies</h3>
              <p class="feature-item__description">
                No jQuery, no Lodash, no nothing. Pure vanilla Typescript means
                fewer things to break and maintain.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="docs-section" id="when-to-use">
        <h2 class="docs-section__title">When to Use Hintorium</h2>

        <p class="docs-section__text">
          Tooltips are great for providing contextual help without cluttering
          your interface. Here are some common use cases where Hintorium shines:
        </p>

        <div class="intro-features">
          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("database", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Data Visualization</h3>
              <p class="intro-feature__description">
                Show detailed information when hovering over charts, graphs, or
                data points.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("link", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Link Previews</h3>
              <p class="intro-feature__description">
                Display previews or additional context for links before users
                click.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("bulb", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Form Field Help</h3>
              <p class="intro-feature__description">
                Explain what data is expected in form fields without taking up
                visual space.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("goal", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Icon Button Labels</h3>
              <p class="intro-feature__description">
                Clarify the purpose of icon-only buttons for better user
                experience.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("mobile", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Mobile Actions</h3>
              <p class="intro-feature__description">
                Provide context for tap-to-reveal actions on mobile interfaces.
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("settings", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Settings Descriptions</h3>
              <p class="intro-feature__description">
                Explain what each setting does without overwhelming the settings
                panel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section" id="browser-support">
        <h2 class="docs-section__title">Browser Support</h2>

        <p class="docs-section__text">
          Hintorium works in all modern browsers that support ES6+ features. We
          actively test and support:
        </p>

        <div class="browser-grid">
          <div class="browser-item">
            <div class="browser-item__icon">
              ${createIcon("chrome", "browser-item__icon-svg")}
            </div>
            <div class="browser-item__name">Chrome</div>
            <div class="browser-item__version">90+</div>
          </div>

          <div class="browser-item">
            <div class="browser-item__icon">
              ${createIcon("firefox", "browser-item__icon-svg")}
            </div>
            <div class="browser-item__name">Firefox</div>
            <div class="browser-item__version">88+</div>
          </div>

          <div class="browser-item">
            <div class="browser-item__icon">
              ${createIcon("safari", "browser-item__icon-svg")}
            </div>
            <div class="browser-item__name">Safari</div>
            <div class="browser-item__version">14+</div>
          </div>

          <div class="browser-item">
            <div class="browser-item__icon">
              ${createIcon("edge", "browser-item__icon-svg")}
            </div>
            <div class="browser-item__name">Edge</div>
            <div class="browser-item__version">90+</div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Next steps</h2>

        <p class="docs-section__text">
          Ready to add tooltips to your project? Here's where to go next:
        </p>

        <div class="topics">
          <ul class="topics__list">
            ${introductionTopics
              .map(
                (topic) => /* HTML */ `
                  <li class="topics__item">
                    <div class="topics__item-top">
                      ${createIcon(topic.icon, "topics__icon")}
                      <h3 class="topics__subtitle">${topic.title}</h3>
                    </div>
                    <p class="topics__item-description">${topic.description}</p>
                    <a href="${topic.href}" class="link link--topic">
                      Explore ${createIcon("rightArrow", "link--topic-icon")}
                    </a>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </div>
      </section>
    </article>
  `;

  dynamicTimeCalculation(content);

  return content;
}
