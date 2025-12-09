export const initTocScrollTracking = () => {
  const sections = document.querySelectorAll<HTMLElement>(".docs-section");
  const tocLinks =
    document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]");

  if (sections.length === 0 || tocLinks.length === 0) return;

  const observerOptions: IntersectionObserverInit = {
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  let activeSection: string | null = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;

      if (entry.isIntersecting) {
        activeSection = sectionId;
        updateActiveLink(sectionId);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

    function updateActiveLink(sectionId: string): void {
    tocLinks.forEach((link) => {
      if (link.dataset.tocLink === sectionId) {
        link.classList.add('toc__link--active');
      } else {
        link.classList.remove('toc__link--active');
      }
    });
  }
};

export const toc = () => {
  const article = document.querySelector(".content-article");
  const tocContent = document.querySelector(".docs-main__side-content");

  if (!article || !tocContent) return;

  const sections = article.querySelectorAll(".docs-section");

  sections.forEach((section) => {
    if (!section.id) {
      const heading = section.querySelector(".docs-section__title");
      section.id =
        heading?.textContent
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ||
        `section-${Math.random().toString(36).substr(2, 9)}`;
    }
  });

  let tocHTML = /* HTML */ `
    <div class="toc">
      <h3 class="toc__title">On this page</h3>
      <nav class="toc__nav" aria-label="Table of contents">
        <ul class="toc__list">
          ${Array.from(sections)
            .map((section) => {
              const heading = section.querySelector(".docs-section__title");
              return /* HTML */ `
                <li class="toc__item">
                  <a
                    href="#${section.id}"
                    class="toc__link"
                    data-toc-link="${section.id}"
                  >
                    ${heading?.textContent || "Untitled"}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      </nav>
    </div>
  `;

  tocContent.innerHTML = tocHTML;

  initTocScrollTracking();
};
