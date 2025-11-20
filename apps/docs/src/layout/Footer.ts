export const Footer = () => {
  const content = /* HTML */ `
    <footer class="footer">
      <div class="footer__wrapper">
        <div class="footer__top-content">
          <div>
            <h3 class="footer__title">Hintorium Library</h3>
            <p class="footer__description">
              Modern tooltips for beautiful web applications.
            </p>
          </div>
          <div>
            <h4 class="footer__subtitle">Resources</h4>
            <ul class="footer__list">
              <li>
                <a href="#" class="link link--footer">Documentation</a>
              </li>
              <li>
                <a href="#" class="link link--footer">Examples</a>
              </li>
              <li>
                <a href="#" class="link link--footer">Changelog</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="footer__subtitle">Community</h4>
            <ul class="footer__list">
              <li>
                <a href="#" class="link link--footer">GitHub Issues</a>
              </li>
              <li>
                <a href="#" class="link link--footer">Discussions</a>
              </li>
              <li>
                <a href="#" class="link link--footer">Contributing</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom-wrapper">
          <div class="footer__bottom-content">
            <p class="footer__copyright">
              &copy; ${new Date().getFullYear()} Hintorium Library. All rights
              reserved.
            </p>
            <p>asd</p>
          </div>
        </div>
      </div>
    </footer>
  `;

  return content;
};
