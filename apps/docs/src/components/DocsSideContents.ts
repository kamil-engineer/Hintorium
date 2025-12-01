export const DocsSideContents = () => {
  const path = window.location.pathname;

  if (path === "/docs") return "";

  const content = /* HTML */ `
    <aside class="docs-main__side-content">asd</aside>
  `;

  return content;
};
