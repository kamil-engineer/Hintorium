import { CodeExample } from "../components/CodeExample";

export const BasicTooltipExample = CodeExample({
  title: "Basic Tooltip",
  description: "Simple tooltip with default settings",
  demo: /* HTML */ `
    <button
      data-hintorium-tooltip="This is a tooltip"
      class="button button--lg button--primary"
    >
      Hover me
    </button>
  `,
  snippets: [
    {
      language: "html",
      label: "HTML",
      code: `<button data-hintorium-tooltip="This is a tooltip">
  Hover me
</button>`,
    },
    {
      language: "typescript",
      label: "TypeScript",
      code: `// Global initialization
initTooltip();

// Or manual initialization
const button = document.querySelector('button');
new Tooltip(button, "This is a tooltip");`,
    },
  ],
});

export const IconButtonsExample = CodeExample({
  title: "Icon Buttons",
  description: "Tooltips on icon-only buttons",
  demo: /* HTML */ `
    <div style="display: flex; gap: 0.5rem;">
      <button
        aria-label="Like"
        data-hintorium-tooltip="Add to favorites"
        class="button button--icon"
      >
        ❤️
      </button>
      <button
        aria-label="Share"
        data-hintorium-tooltip="Share this"
        class="button button--icon"
      >
        🔗
      </button>
      <button
        aria-label="Comment"
        data-hintorium-tooltip="Leave a comment"
        class="button button--icon"
      >
        💬
      </button>
    </div>
  `,
  snippets: [
    {
      language: "html",
      label: "HTML",
      code: `<button 
  aria-label="Like" 
  data-hintorium-tooltip="Add to favorites"
>
  ❤️
</button>

<button 
  aria-label="Share" 
  data-hintorium-tooltip="Share this"
>
  🔗
</button>

<button 
  aria-label="Comment" 
  data-hintorium-tooltip="Leave a comment"
>
  💬
</button>`,
    },
    {
      language: "typescript",
      label: "TypeScript",
      code: `// Automatic initialization for all elements
initTooltip();`,
    },
  ],
});

export const PositionsExample = CodeExample({
  title: "Tooltip Positions",
  description: "Control tooltip placement with data attributes",
  demo: /* HTML */ `
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;"
    >
      <button
        data-hintorium-tooltip="Top position"
        data-hintorium-tooltip-position="top"
        class="button button--primary button--lg"
      >
        Top
      </button>
      <button
        data-hintorium-tooltip="Right position"
        data-hintorium-tooltip-position="right"
        class="button button--primary button--lg"
      >
        Right
      </button>
      <button
        data-hintorium-tooltip="Bottom position"
        data-hintorium-tooltip-position="bottom"
        class="button button--primary button--lg"
      >
        Bottom
      </button>
      <button
        data-hintorium-tooltip="Left position"
        data-hintorium-tooltip-position="left"
        class="button button--primary button--lg"
      >
        Left
      </button>
    </div>
  `,
  snippets: [
    {
      language: "html",
      label: "HTML",
      code: `<button 
  data-hintorium-tooltip="Top position"
  data-hintorium-tooltip-position="top"
>
  Top
</button>

<button 
  data-hintorium-tooltip="Right position"
  data-hintorium-tooltip-position="right"
>
  Right
</button>

<!-- Available positions: top, right, bottom, left -->`,
    },
    {
      language: "typescript",
      label: "TypeScript",
      code: `// With initialization
initTooltip();

// Or programmatically
new Tooltip(element, "Tooltip text", {
  position: 'top' // 'top' | 'right' | 'bottom' | 'left'
});`,
    },
  ],
});

export const RichContentExample = CodeExample({
  title: "Rich Content",
  description: "Tooltips with HTML content, styling, and formatting",
  demo: /* HTML */ `
    <div
      style="display: flex; gap: 1rem; justify-content: center; flex-wrap:wrap"
    >
      <button
        data-hintorium-tooltip="&lt;div style='padding: 0.5rem;'&gt;&lt;strong style='display: block; margin-bottom: 0.25rem;'&gt;Rich Tooltip&lt;/strong&gt;&lt;p style='margin: 0; color: rgba(255,255,255,0.9);'&gt;You can use HTML elements for advanced formatting!&lt;/p&gt;&lt;/div&gt;"
        class="button button--lg button--outline"
      >
        Hover for Rich Content
      </button>

      <button
        data-hintorium-tooltip="&lt;div style='text-align: center;'&gt;&lt;div style='font-size: 2rem; margin-bottom: 0.25rem;'&gt;🎉&lt;/div&gt;&lt;strong&gt;Celebration!&lt;/strong&gt;&lt;/div&gt;"
        class="button button--lg button--outline"
      >
        With Emoji
      </button>
    </div>
  `,
  snippets: [
    {
      language: "html",
      label: "HTML",
      code: `<!-- HTML Content in Tooltip -->
<button data-hintorium-tooltip="
  <div style='padding: 0.5rem;'>;
    <strong>Rich Tooltip</strong>;
    <p>You can use HTML elements!&lt;/p>
  </div>
">
  Hover me
</button>

<!-- With Emoji -->
<button data-hintorium-tooltip="
  <div>
    <div>🎉</div>;
    <strong>Celebration!>/strong>;
  </div>;
">
  Celebrate
</button>`,
    },
    {
      language: "typescript",
      label: "TypeScript",
      code: `// Programmatic rich content
const richContent = \`
  <div style="padding: 0.5rem;">
    <strong>Rich Tooltip</strong>
    <p>You can use HTML elements!</p>
  </div>
\`;

new Tooltip(element, richContent);

// Or with template
const tooltip = new Tooltip(element, {
  content: \`
    <div class="custom-tooltip">
      <h4>Title</h4>
      <p>Description text</p>
      <a href="#">Learn more</a>
    </div>
  \`,
  allowHTML: true
});`,
    },
    {
      language: "css",
      label: "CSS",
      code: `/* Custom styling for rich tooltips */
.custom-tooltip {
  padding: 0.75rem;
  max-width: 250px;
}

.custom-tooltip h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.custom-tooltip p {
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.custom-tooltip a {
  color: #60a5fa;
  text-decoration: none;
}`,
    },
  ],
});

export const Examples = () => {
  const content = /* HTML */ `
    <section class="overview" id="examples">
      <div class="overview__wrapper">
        <div class="overview__content">
          <h2 class="overview__title">Interactive Examples</h2>
          <p class="overview__description">
            Hover to see tooltips, click tabs to view code
          </p>
        </div>

        <div class="examples-grid">
          ${BasicTooltipExample} ${IconButtonsExample} ${PositionsExample}
          ${RichContentExample}
        </div>
      </div>
    </section>
  `;

  return content;
};
