export function getUniqueCategories(products) {
  const map = new Map();

  products.forEach((product) => {
    if (!map.has(product.categoriaId)) {
      map.set(product.categoriaId, {
        id: product.categoriaId,
        nombre: product.categoriaNombre,
      });
    }
  });

  return Array.from(map.values());
}
