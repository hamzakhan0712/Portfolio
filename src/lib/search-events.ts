/**
 * The bridge between the masthead's search button and the command palette.
 *
 * They sit in different branches of the tree — the masthead is inside the
 * layout, the palette is mounted beside the router — so a shared event is
 * simpler than threading a callback through both. Lives in its own module so
 * neither component file mixes constants with component exports, which would
 * cost them fast refresh during development.
 */
export const OPEN_SEARCH_EVENT = "docs:open-search";

export function openSearch(): void {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
}
