export const MobileNavigation = () => {
  const content = /* HTML */ `
    <nav class="mobile-nav">
      <ul class="nav__list">
        <li class="nav__subtitle">Menu</li>
        <li>
          <a class="link link--navigation" href="#overview"> Overview</a>
        </li>
        <li>
          <a class="link link--navigation" href="#examples"> Examples</a>
        </li>
        <li>
          <a class="link link--navigation" href="#api"> API</a>
        </li>
      </ul>
    </nav>
  `;

  return content;
};
