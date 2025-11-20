export const generateStarSvg = (rating: number, max = 5) => {
  const fullStar = "/icons/icon-full-star.svg";
  const halfStar = "/icons/icon-half-star.svg";
  const emptyStar = "/icons/icon-empty-star.svg";

  let html = "";
  for (let i = 1; i <= max; i++) {
    if (i <= rating) {
      html += `<img src="${fullStar}" alt="" width="24" height="24"/>`;
    } else if (i - rating < 1 && i > rating) {
      html += `<img src="${halfStar}" alt="" width="24" height="24"/>`;
    } else {
      html += `<img src="${emptyStar}" alt="" width="24" height="24"/>`;
    }
  }
  return html;
};
