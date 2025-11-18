export const Examples = () => {
  const content = /* HTML */ `
    <section class="overview" id="overview">
      <div class="overview__wrapper">
        <div class="overview__content">
          <h2 class="overview__title">Interactive Examples</h2>
          <p class="overview__description">
            Hover or focus to see tooltips in action with smooth animations
          </p>
        </div>

        <div class="overview__items">
          <div class="example overview__item">
            <h3 class="example__title">Basic Tooltip</h3>

            <div class="example__content">
              <button
                data-hintorium-tooltip="Tooltip"
                data-hintorium-tooltip-position="right"
                class="button button--lg button--primary"
              >
                Basic Tooltip
              </button>
            </div>

            <div class="example__code">
              <div class="example__code-item">
                <p class="example__code-subtitle">HTML</p>
                <div class="example__code-content">
                  <p class="example__code-setup">
                    &lt;button data-hintorium-tooltip="Basic Tooltip"&gt; Basic
                    Tooltip&lt;/button&gt;
                  </p>
                </div>
              </div>

              <div class="example__code-item">
                <p class="example__code-subtitle">TypeScript / JavaScript</p>
                <div class="example__code-content">
                  <p class="example__code-setup">
                    <strong>Global</strong> : initTooltip()<br />
                    <strong>Manual</strong> : new
                    Tooltip(document.querySelector('button'), "Basic Tooltip")
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="example overview__item">
            <h3 class="example__title">Icon Buttons</h3>

            <div class="example__content">
              <button
                aria-label="Add to favorite"
                data-hintorium-tooltip="Add to favorite"
                class="button"
              >
                <img
                  class="button__image"
                  src="/icons/icon-heart.svg"
                  width="16"
                  height="16"
                  alt=""
                  aria-hidden="true"
                />
              </button>

              <button
                aria-label="Share"
                data-hintorium-tooltip="Share"
                class="button"
              >
                <img
                  class="button__image"
                  src="/icons/icon-share.svg"
                  width="16"
                  height="16"
                  alt=""
                  aria-hidden="true"
                />
              </button>

              <button
                aria-label="Leave a comment"
                data-hintorium-tooltip="Leave a comment"
                class="button"
              >
                <img
                  class="button__image"
                  src="/icons/icon-message.svg"
                  width="16"
                  height="16"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>

            <div class="example__code">
              <div class="example__code-item">
                <p class="example__code-subtitle">HTML</p>
                <div class="example__code-content">
                  <p class="example__code-setup">
                    &lt;button data-hintorium-tooltip="Add to favorite"
                    class='like'&gt;ICON&lt;/button&gt;
                  </p>
                  <p class="example__code-setup">
                    &lt;button data-hintorium-tooltip="Share"
                    class='share'&gt;ICON&lt;/button&gt;
                  </p>
                  <p class="example__code-setup">
                    &lt;button data-hintorium-tooltip="Leave a comment"
                    class='comment'&gt;ICON&lt;/button&gt;
                  </p>
                </div>
              </div>

              <div class="example__code-item">
                <p class="example__code-subtitle">TypeScript / JavaScript</p>
                <div class="example__code-content">
                  <p class="example__code-setup">
                    <strong>initTooltip()</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="example overview__item">
            <h3 class="example__title">Tooltip Positions</h3>

            <div class="example__content">
              <button
                data-hintorium-tooltip="Top position"
                class="button button--lg top"
              >
                Top
              </button>

              <button
                data-hintorium-tooltip="Right"
                class="button button--lg right"
              >
                Right
              </button>

              <button
                data-hintorium-tooltip="Bottom"
                class="button button--lg bottom"
              >
                Bottom
              </button>

              <button
                data-hintorium-tooltip="Left"
                class="button button--lg left"
              >
                Left
              </button>
            </div>
          </div>

          <div class="example overview__item">
            <h3 class="example__title">Rich Content</h3>

            <div class="example__content">
              <button
                data-hintorium-tooltip="<div>
              <p><strong>Rich Content Title!</strong></p>
              <p>Rich content!</p>
            </div>"
                class="button button--lg rich button--outline"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return content;
};
