export const Overview = () => {
  const features = [
    {
      icon: "/fast.svg",
      alt: "App Screen with loading state ",
      title: "Ligtning Fast",
      description:
        "Optimized for performance with minimal bundle size and instant interactions.",
    },
    {
      icon: "/a11y.svg",
      alt: "Woman in a wheelchair ",
      title: "Accessible",
      description:
        "Full WCAG 2.1 compliance with keyboard navigation and screen reader support.",
    },
    {
      icon: "/theme.svg",
      alt: "Theming",
      title: "Fully Themeable",
      description:
        "Customize every aspect with CSS variables and component props.",
    },
    {
      icon: "/dependency.svg",
      alt: "Dependency",
      title: "Zero Dependencies",
      description: "Pure vanilla JavaScript, no external libraries required.",
    },
  ];

  const content = /* HTML */ `
    <section class="overview" id="overview">
      <div class="overview__wrapper">
        <div class="overview__content">
          <h2 class="overview__title">Why Choose Hintorium?</h2>
          <p class="overview__description">
            Built with developers in mind. Modern, simple, and powerful.
          </p>
        </div>
        <ul class="overview__items">
          ${features
            .map((feature) => {
              return /* HTML */ ` <li class="overview__item">
                <img
                  class="overview__image"
                  alt="${feature.alt}"
                  width="150"
                  height="100"
                  src="${feature.icon}"
                />
                <h2 class="overview__subtitle">${feature.title}</h2>
                <p class="overview__subdescription">${feature.description}</p>
              </li>`;
            })
            .join("")}
        </ul>
      </div>
    </section>
  `;

  return content;
};
