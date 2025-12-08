import { DocsArticleActions } from "../../components/DocsArticleActions";
import { createIcon } from "../../utils/icons";

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

        <div class="article-tags">
          <span class="tag tag--time"> ${createIcon("read")} 2 minutes</span>
        </div>
      </div>
    </article>
  `;

  container.innerHTML = content;

  

  return container;
};
