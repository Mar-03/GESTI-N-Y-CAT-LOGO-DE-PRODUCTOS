export default function ProductFilters({
  searchTerm,
  selectedCategory,
  onlyOffers,
  categories,
  onSearchChange,
  onCategoryChange,
  onOnlyOffersChange,
  onClearFilters,
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Filtros</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">Búsqueda y categorías</h3>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:bg-slate-50"
        >
          Limpiar
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Buscar por nombre</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Ej. Laptop, audífonos, ropa"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Categoría</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={onlyOffers}
            onChange={(event) => onOnlyOffersChange(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          Solo productos en oferta
        </label>
      </div>
    </div>
  );
}
