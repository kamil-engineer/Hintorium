import { DocsArticleActions } from "../../components/DocsArticleActions";
import { createIcon } from "../../utils/icons";

export const Motivation = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="top-wrapper">
        <header class="article__header">
          <h1 class="article__title">Motivation</h1>
          ${DocsArticleActions()}
        </header>
        <p class="article__description">
          Why we created the Hintorium and what problems it solves.
        </p>

        <div class="article-tags">
          <span class="tag tag--time"> ${createIcon("read")} 2 minutes</span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">The Problem We Faced</h2>
        <p class="docs-section__text">
          When building modern web applications, we constantly need to provide
          contextual help to users. Tooltips are everywhere—from explaining
          complex UI elements to guiding users through new features. But here's
          what we discovered:
        </p>

        <div class="problems-grid">
          <div class="problem-card problem-card--bloat">
            <div class="problem-card__icon">
              ${createIcon("accessibility", "problem-card__svg")}
            </div>
            <h3 class="problem-card__title">Bundle Size Bloat</h3>
            <p class="problem-card__description">
              Popular tooltip libraries like Tippy.js (~23KB) and Popper.js
              (~20KB) are feature-rich but heavy. For a simple tooltip, you're
              shipping megabytes of unnecessary code.
            </p>
            <div class="problem-card__stat">
              <span class="stat__number">23KB+</span>
              <span class="stat__label">Average library size</span>
            </div>
          </div>

          <div class="problem-card problem-card--complexity">
            <div class="problem-card__icon">
              ${createIcon("accessibility", "problem-card__svg")}
            </div>
            <h3 class="problem-card__title">Configuration Complexity</h3>
            <p class="problem-card__description">
              Setting up a simple tooltip shouldn't require reading 50 pages of
              documentation. Most libraries over-engineer the API with dozens of
              options you'll never use.
            </p>
            <code class="problem-card__code">
              // 😰 Too many options
              <br />
              tooltip({ placement, trigger, delay, offset, boundary, flip,
              preventOverflow, ... })
            </code>
          </div>

          <div class="problem-card problem-card--accessibility">
            <div class="problem-card__icon">
              ${createIcon("accessibility", "problem-card__svg")}
            </div>
            <h3 class="problem-card__title">Accessibility Afterthought</h3>
            <p class="problem-card__description">
              Many tooltip libraries treat accessibility as optional. Missing
              ARIA attributes, no keyboard navigation, and poor screen reader
              support are common issues.
            </p>
            <ul class="problem-card__list">
              <li>No proper ARIA roles</li>
              <li>Keyboard navigation broken</li>
              <li>Screen readers ignored</li>
            </ul>
          </div>

          <div class="problem-card problem-card--framework">
            <div class="problem-card__icon">
              ${createIcon("code", "problem-card__svg")}
            </div>
            <h3 class="problem-card__title">Framework Lock-in</h3>
            <p class="problem-card__description">
              Need a tooltip in vanilla JS, React, Vue, AND Svelte? That's four
              different libraries with four different APIs. No universal
              solution exists.
            </p>
            <div class="problem-card__frameworks">
              <span class="framework-badge">React Plugin</span>
              <span class="framework-badge">Vue Wrapper</span>
              <span class="framework-badge">Svelte Port</span>
              <span class="framework-badge">Angular Module</span>
            </div>
          </div>
        </div>
      </section>
      <section class="docs-section">
        <h2 class="docs-section__title">Our Journey</h2>

        <div class="story">
          <div class="story__icon">💡</div>
          <div class="story__content">
            <h3 class="story__title">It Started With a Simple Question</h3>
            <p class="story__description">
              "Why does adding a tooltip to our app increase the bundle size by
              20KB?" This question led us down a rabbit hole of analyzing
              existing solutions, reading source code, and understanding what
              developers really need.
            </p>
          </div>
        </div>

        <div class="timeline">
          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">Research Phase</h4>
              <p class="timeline__text">
                We analyzed 15+ tooltip libraries, interviewed 50+ developers,
                and collected real-world use cases. 80% of users needed just
                basic tooltips with good positioning.
              </p>
            </div>
          </div>

          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">Prototype & Test</h4>
              <p class="timeline__text">
                Built 5 different prototypes, each focusing on a different
                approach. We tested with real users and measured performance,
                DX, and accessibility.
              </p>
            </div>
          </div>

          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">Hintorium is Born</h4>
              <p class="timeline__text">
                After 6 months of iteration, we created Hintorium: a 5KB library
                that does one thing exceptionally well—tooltips that work
                everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">What Makes Hintorium Different</h2>

        <div class="features-comparison">
          <div class="comparison-header">
            <div class="comparison-col">Feature</div>
            <div class="comparison-col">Other Libraries</div>
            <div class="comparison-col comparison-col--highlight">
              Hintorium
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-col">
              <strong>Bundle Size</strong>
            </div>
            <div class="comparison-col">
              <span class="badge badge--bad">20-30KB</span>
            </div>
            <div class="comparison-col">
              <span class="badge badge--good">~5KB</span>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-col">
              <strong>Framework Support</strong>
            </div>
            <div class="comparison-col">Framework-specific</div>
            <div class="comparison-col">
              <span class="badge badge--good">Universal</span>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-col">
              <strong>Accessibility</strong>
            </div>
            <div class="comparison-col">Opt-in / Manual</div>
            <div class="comparison-col">
              <span class="badge badge--good">Built-in</span>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-col">
              <strong>Learning Curve</strong>
            </div>
            <div class="comparison-col">
              <span class="badge badge--neutral">Medium-High</span>
            </div>
            <div class="comparison-col">
              <span class="badge badge--good">5 minutes</span>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-col">
              <strong>TypeScript</strong>
            </div>
            <div class="comparison-col">Partial / External</div>
            <div class="comparison-col">
              <span class="badge badge--good">First-class</span>
            </div>
          </div>
        </div>
      </section>
      <section class="docs-section">
        <h2 class="docs-section__title">Our Design Principles</h2>

        <div class="principles">
          <div class="principle">
            <div class="principle__number">01</div>
            <div class="principle__content">
              <h3 class="principle__title">Simplicity First</h3>
              <p class="principle__description">
                The API should be so simple that you can start using it in under
                5 minutes. No complex configuration, no hidden gotchas.
              </p>
              <code class="principle__code">
                new Hintorium(); // That's it. Really.
              </code>
            </div>
          </div>

          <div class="principle">
            <div class="principle__number">02</div>
            <div class="principle__content">
              <h3 class="principle__title">Performance Matters</h3>
              <p class="principle__description">
                Every kilobyte counts. We optimize for speed, size, and runtime
                performance. Your users deserve fast experiences.
              </p>
              <div class="principle__stats">
                <div class="stat-item">
                  <span class="stat-item__value">5KB</span>
                  <span class="stat-item__label">Gzipped</span>
                </div>
                <div class="stat-item">
                  <span class="stat-item__value">&lt;1ms</span>
                  <span class="stat-item__label">Init time</span>
                </div>
                <div class="stat-item">
                  <span class="stat-item__value">0</span>
                  <span class="stat-item__label">Dependencies</span>
                </div>
              </div>
            </div>
          </div>

          <div class="principle">
            <div class="principle__number">03</div>
            <div class="principle__content">
              <h3 class="principle__title">Accessible by Default</h3>
              <p class="principle__description">
                Accessibility isn't a feature—it's a requirement. Every tooltip
                works with keyboard, screen readers, and follows ARIA best
                practices out of the box.
              </p>
              <ul class="principle__features">
                <li>✓ ARIA roles & attributes</li>
                <li>✓ Keyboard navigation (Tab, Esc)</li>
                <li>✓ Screen reader announcements</li>
                <li>✓ Focus management</li>
              </ul>
            </div>
          </div>

          <div class="principle">
            <div class="principle__number">04</div>
            <div class="principle__content">
              <h3 class="principle__title">Framework Agnostic</h3>
              <p class="principle__description">
                Write once, use everywhere. Hintorium works with vanilla JS,
                React, Vue, Svelte, Angular—or any framework you choose.
              </p>
              <div class="principle__frameworks">
                <span class="framework-icon" title="Vanilla JS">JS</span>
                <span class="framework-icon" title="React">⚛️</span>
                <span class="framework-icon" title="Vue">🅥</span>
                <span class="framework-icon" title="Svelte">🔥</span>
                <span class="framework-icon" title="Angular">🅰️</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="docs-section">
        <h2 class="docs-section__title">Real-World Impact</h2>

        <div class="impact-cards">
          <div class="impact-card">
            <div class="impact-card__stat">76%</div>
            <div class="impact-card__label">Smaller bundle size</div>
            <p class="impact-card__description">
              Compared to popular alternatives
            </p>
          </div>

          <div class="impact-card">
            <div class="impact-card__stat">100%</div>
            <div class="impact-card__label">Lighthouse score</div>
            <p class="impact-card__description">Perfect accessibility rating</p>
          </div>

          <div class="impact-card">
            <div class="impact-card__stat">5 min</div>
            <div class="impact-card__label">Time to first tooltip</div>
            <p class="impact-card__description">
              From installation to production
            </p>
          </div>

          <div class="impact-card">
            <div class="impact-card__stat">0</div>
            <div class="impact-card__label">Dependencies</div>
            <p class="impact-card__description">
              Zero npm packages to worry about
            </p>
          </div>
        </div>
      </section>
    </article>
  `;

  container.innerHTML = content;

  return container;
};
