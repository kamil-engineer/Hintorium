import { generateStarSvg } from "../utils/stars";

const reviews = [
  {
    id: 1,
    stars: 5,
    image: {
      src: "/reviews/alex.jpg",
      alt: "Head Shot of Alex Chen",
    },
    description: `"This tooltip library completely transformed how we handle user guidance. The smooth animations and customization options are unmatched. Highly recommend!"`,
    author: {
      name: "Alex Chen",
      job: "Frontend Developer at Tech Startup",
    },
    values: ["Ease of use", "UI&UX", "Performance"],
  },
  {
    id: 2,
    stars: 4.5,
    image: {
      src: "/reviews/sarah.jpg",
      alt: "Head Shot of Sarah Williams",
    },
    description: `"The accessibility features are top-notch. We implemented it across our entire design system and our users love the polished feel."`,
    author: {
      name: "Sarah Williams",
      job: "Product Designer at Creative Agency",
    },
    values: ["Easy customizing", "Advanced features", "Easy setup"],
  },
  {
    id: 3,
    stars: 5,
    image: {
      src: "/reviews/marcus.jpg",
      alt: "Head Shot of Marcus Johnson",
    },
    description: `"Lightweight, performant, and incredibly easy to integrate. It reduced our bundle size while improving UX significantly."`,
    author: {
      name: "Marcus Johnson",
      job: "Lead Engineer at SaaS Platform",
    },
    values: [
      "Perfected for speed",
      "Features out of box",
      "Ease of communication with creator",
    ],
  },
];

export const Reviews = () => {
  const content = /* HTML */ `
    <section class="overview">
      <div class="overview__wrapper">
        <div class="swiper">
          <div class="swiper-wrapper">
            ${reviews
              .map((review) => {
                return /* HTML */ `
                  <div class="swiper-slide">
                    <div class="review">
                      <div class="review__content">
                        <figure class="review__image-container">
                          <img
                            class="review__image"
                            alt="${review.image.alt}"
                            src="${review.image.src}"
                            height="384"
                          />
                        </figure>
                        <div class="review__general">
                          <div class="review__tags">
                            <span class="tag tag--verified">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="tag__image"
                              >
                                <path
                                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                                />
                                <path d="m9 12 2 2 4-4" />
                              </svg>
                              Verified</span
                            >

                            <span class="tag tag--premium">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="tag__image"
                              >
                                <path
                                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                                />
                              </svg>
                              Premium member
                            </span>
                          </div>
                          <div class="review__stars">
                            ${generateStarSvg(review.stars)}
                          </div>
                          <blockquote class="review__text">
                            ${review.description}
                          </blockquote>
                          <div class="review__list">
                            <p class="review__list-text">
                              <strong>TOP 3</strong>
                              values for ${review.author.name.split(" ")[0]} :
                            </p>
                            <ul class="review__best">
                              ${review.values
                                .map((value) => {
                                  return /* HTML */ `
                                    <li class="review__best-item">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="review__best-marker"
                                      >
                                        <path d="M20 6 9 17l-5-5" />
                                      </svg>
                                      <span>${value}</span>
                                    </li>
                                  `;
                                })
                                .join("")}
                            </ul>
                          </div>
                          <div class="review__author">
                            <p class="review__author-name">
                              ${review.author.name}
                            </p>
                            <p class="review__author-job">
                              ${review.author.job}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>

          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  `;

  return content;
};
