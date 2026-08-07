import { normalizeText } from '@/utils/text';

export function getUniqueCategories(products) {
  const map = new Map();

  products.forEach((product) => {
    const normalizedName = normalizeText(product.categoriaNombre);
    const label = String(product.categoriaNombre || '').trim();

    if (!map.has(normalizedName)) {
      map.set(normalizedName, {
        value: normalizedName,
        label,
      });
    }
  });

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label, 'es'));
}
