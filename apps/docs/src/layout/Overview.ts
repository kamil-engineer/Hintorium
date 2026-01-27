import { overviews } from "../data/overviews";

export const Overview = () => {
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
          ${overviews
            .map((overview) => {
              return /* HTML */ ` <li class="overview__item">
                <img
                  class="overview__image"
                  alt="${overview.alt}"
                  width="150"
                  height="100"
                  src="${overview.icon}"
                />
                <h2 class="overview__subtitle">${overview.title}</h2>
                <p class="overview__subdescription">${overview.description}</p>
              </li>`;
            })
            .join("")}
        </ul>
      </div>
    </section>
  `;

  return content;
};
