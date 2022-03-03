export function get_text(tree: HTMLElement, tag: string): string | null {
  const tags = tree.getElementsByTagName(tag);
  if (tags.length == 0) return null;
  return tags[0].innerHTML;
}

export function get_bool(tree: HTMLElement, tag: string): boolean | null {
  const text = get_text(tree, tag);
  if (text === null) return null;
  return text === "true";
}
