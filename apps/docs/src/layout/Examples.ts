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
            
          </div>
        </div>
      </div>
    </section>
  `;

  return content;
};
