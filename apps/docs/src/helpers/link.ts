export function isLinkActive(
  href: string,
  currentPath: string,
  currentHash: string,
  exact: boolean = true
): boolean {
  if (href.startsWith("#")) {
    return currentHash === href.slice(1);
  }

  if (href.includes("#")) {
    const [linkPath, linkHash] = href.split("#");
    return currentPath === linkPath && currentHash === linkHash;
  }

  if (exact) {
    return currentPath === href;
  } else {
    return currentPath.startsWith(href) && href !== "/";
  }
}
