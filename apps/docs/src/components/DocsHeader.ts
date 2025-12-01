export const DocsHeader = () => {
  const separator = /* HTML */ `
    <li class="breadcrumbs__item">
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
        class="breadcrumbs__icon"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </li>
  `;

  const content = /* HTML */ `
    <header class="docs-content__header">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a href="/" class="link link--breadcrumb link--current"> Home </a>
        </li>
        ${separator}
        <li class="breadcrumbs__item">
          <a href="/docs" class="link link--breadcrumb"> Documentation </a>
        </li>
      </ul>
    </header>
  `;

  return content;
};
