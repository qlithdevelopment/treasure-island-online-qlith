export function slugify(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[|&/\\#,+()$~%.'":*?<>{}]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const propertiesData = [];

export const detailedProperties = {};

export function getPropertyBySlug(_slug) {
  return null;
}
