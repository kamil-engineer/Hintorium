import { paths } from "../router/routes";

export const Logo = () => {
  const content = /*HTML */ `
    <a class="link logo" href=${paths.HOME}>
        <img class="logo__image" alt="Hintorium" width="32" height="32" src="/logo.svg"/>
    </a>
  `;

  return content;
};
