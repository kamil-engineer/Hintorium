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
                <a href="/docs" class="link link--footer">Documentation</a>
              </li>
              <li>
                <a href="/examples" class="link link--footer">Examples</a>
              </li>
              <li>
                <a
                  href="https://github.com/kamil-engineer/Hintorium/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link link--footer"
                  >Changelog</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="footer__subtitle">Community</h4>
            <ul class="footer__list">
              <li>
                <a
                  href="https://github.com/kamil-engineer/Hintorium/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link link--footer"
                  >GitHub Issues</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/kamil-engineer/Hintorium/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link link--footer"
                  >Code of conduct</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/kamil-engineer/Hintorium/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link link--footer"
                  >Contributing</a
                >
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
            <ul class="footer__socials">
              <li>
                <a
                  href="https://github.com/kamil-engineer/Hintorium"
                  class="button button--navigation button--icon"
                >
                  <img
                    class="button__image"
                    width="18"
                    height="18"
                    alt="Github"
                    src="/icons/icon-github.svg"
                  />
                </a>
              </li>
              <li>
                <a
                  href="mailto:mathey.academy@gmail.com"
                  class="button button--navigation button--icon"
                >
                  <img
                    class="button__image"
                    width="18"
                    height="18"
                    alt="Mail"
                    src="/icons/icon-mail.svg"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/~kamilengineer"
                  class="button button--navigation button--icon"
                >
                  <img
                    class="button__image"
                    width="18"
                    height="18"
                    alt="Mail"
                    src="/icons/icon-npm.svg"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `;

  return content;
};
