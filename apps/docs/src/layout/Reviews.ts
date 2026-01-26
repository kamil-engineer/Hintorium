import { reviews } from "../data/reviews";
import { createIcon } from "../utils/icons";
import { generateStarSvg } from "../utils/stars";

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
                                        "review__best-marker",
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
