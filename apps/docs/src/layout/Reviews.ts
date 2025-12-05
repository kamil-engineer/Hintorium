import { createIcon } from "../utils/icons";
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
    <section class="overview" id="reviews">
      <div class="overview__content">
        <h2 class="overview__title">What do they think about our library?</h2>
        <p class="overview__description">
          Our special sponsors answered this question.
        </p>
      </div>
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
                          <figcaption class="sr-only">
                            ${review.author.name}, ${review.author.job}
                          </figcaption>
                        </figure>
                        <div class="review__general">
                          <div class="review__tags">
                            <span class="tag tag--verified">
                              ${createIcon("verified", "tag__image")}
                              Verified</span
                            >

                            <span class="tag tag--premium">
                              ${createIcon("premium", "tag__image")} Premium
                              member
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
                                      ${createIcon(
                                        "check",
                                        "review__best-marker"
                                      )}
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

          <div class="custom-swiper-pagination">
            ${Array.from({ length: reviews.length }, () => {
              return /* HTML */ `
                <button
                  class="pagination-item"
                  aria-label="Change slide"
                ></button>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </section>
  `;

  return content;
};
