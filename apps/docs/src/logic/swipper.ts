import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export const setupSwipper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  const paginationButtons = document.querySelectorAll(
    ".custom-swiper-pagination .pagination-item"
  );

  const updatePagination = () => {
    paginationButtons.forEach((btn, index) => {
      btn.classList.toggle(
        "pagination-item--active",
        index === swiper.realIndex
      );
    });
  };

  updatePagination();

  swiper.on("slideChange", () => {
    updatePagination();
  });

  paginationButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => swiper.slideToLoop(index));
  });
};
