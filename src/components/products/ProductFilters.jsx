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
    <div className="sticky top-16 z-10 space-y-3 border-b border-[#987b80]/20 bg-[#e2dbd5]/95 pb-4 pt-4 backdrop-blur-xl">
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#987b80]/60 transition-colors group-focus-within:text-[#6d3536]">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar productos..."
          className="w-full rounded-full border border-[#c7b6c6] bg-[#ffeeee] py-3 pl-11 pr-11 text-sm text-[#6d3536] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] outline-none transition focus:border-[#6d3536] focus:bg-white focus:ring-2 focus:ring-[#987b80]/25"
        />
        {searchTerm ? (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-[#987b80]/60 transition hover:text-[#6d3536]"
            aria-label="Limpiar búsqueda"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        ) : null}
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2">
        {categories.map((category) => (
          <Chip
            key={category.value}
            active={selectedCategory === category.value}
            tone="dark"
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Chip>
        ))}
        <Chip active={onlyOffers} tone="rose" onClick={() => onOnlyOffersChange(!onlyOffers)}>
          En oferta
        </Chip>
        <button
          type="button"
          onClick={onClearFilters}
          className="snap-start rounded-full bg-[#90a3b1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6d3536] shadow-sm transition active:scale-95"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children, tone = 'dark' }) {
  const activeClass = tone === 'rose' ? 'bg-[#c7b6c6] text-[#6d3536] shadow-sm' : 'bg-[#90a3b1] text-[#6d3536] shadow-sm';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
        active ? activeClass : 'bg-[#ffeeee] text-[#6d3536] hover:bg-[#c7b6c6] hover:text-[#6d3536]'
      }`}
    >
      {children}
    </button>
  );
}
