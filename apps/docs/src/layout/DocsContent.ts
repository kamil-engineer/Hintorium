import { DocsSidebar } from "../components/DocsSidebar";
import { DocsSideContents } from "../components/DocsSideContents";

export const DocsContent = (subContent: HTMLElement): string => {
  const tempDiv = document.createElement("div");
  tempDiv.appendChild(subContent.cloneNode(true));

  const content = /* HTML */ `
    <div class="docs-main">
      ${DocsSidebar()}
      <div class="docs-main__wrapper">
        <main class="docs-main__content">${tempDiv.innerHTML}</main>
        ${DocsSideContents()}
      </div>
    </div>
  `;

  return content;
};
