export function getText(tree: HTMLElement, tag: string): string | null {
  const tags = tree.getElementsByTagName(tag);
  if (tags.length === 0) return null;
  return tags[0].innerHTML;
}

export function getBool(tree: HTMLElement, tag: string): boolean | null {
  const text = getText(tree, tag);
  if (text === null) return null;
  return text === "true";
}

export function createXmlWithText(
  doc: XMLDocument,
  tag: string,
  text: string
): HTMLElement {
  const node = doc.createElement(tag);
  node.innerHTML = text;
  return node;
}
