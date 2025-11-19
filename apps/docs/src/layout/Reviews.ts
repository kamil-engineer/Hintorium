import { generateStarSvg } from "../utils/stars";

export const Reviews = () => {
  const stars = generateStarSvg(4.5);

  const content = /* HTML */ `
    <section class="overview">
      <div class="overview__wrapper">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="review">
                <div class="review__content">
                  <figure class="review__image-container">
                    <img
                      class="review__image"
                      alt="Asian Boy"
                      src="/reviews/asian.jpg"
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
                    </div>
                    <div class="review__stars">${stars}</div>
                    <blockquote class="review__text">
                      "This tooltip library completely transformed how we handle
                      user guidance. The smooth animations and customization
                      options are unmatched. Highly recommend!"
                    </blockquote>
                    <div class="review__list">
                      <p class="review__list-text">Top 3 values for Alex :</p>
                      <ul class="review__best">
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
                          <span>Ease of use</span>
                        </li>
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
                          <span>UI/UX</span>
                        </li>
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
                          <span>Performance</span>
                        </li>
                      </ul>
                    </div>
                    <div class="review__author">
                      <p class="review__author-name">Alex Chen</p>
                      <p class="review__author-job">
                        Frontend Developer at Tech Startup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
          </div>

          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  `;

  return content;
};
