import { DocsArticleActions } from "../../components/DocsArticleActions";

export const Motivation = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="top-wrapper">
        <header class="article__header">
          <h1 class="article__title">Motivation</h1>
          ${DocsArticleActions()}
        </header>
        <p class="article__description">
          Why we created the Hintorium and what problems it solves.
        </p>
      </div>
    </article>
  `;

  container.innerHTML = content;

  return container;
};
