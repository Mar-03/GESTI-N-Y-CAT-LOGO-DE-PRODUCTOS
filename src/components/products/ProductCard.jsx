export default function ProductCard({ product, onViewDetail, onEdit, onDelete }) {
  const price = Number(product.precio).toFixed(2);
  const offerPrice = product.precioOferta ? Number(product.precioOferta).toFixed(2) : null;

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#987b80]/20 bg-[#ffeeee] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      onClick={() => onViewDetail?.(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onViewDetail?.(product.id);
        }
      }}
    >
      <div className="relative aspect-[16/10] bg-slate-100">
        <img
          src={product.imagen || 'https://placehold.co/600x400?text=Producto'}
          alt={product.nombre}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#6d3536] backdrop-blur">
          {product.categoriaNombre}
        </div>
        {product.enOferta ? (
          <div className="absolute right-3 top-3 rounded-full bg-[#987b80] px-3 py-1 text-xs font-bold text-[#ffeeff] shadow-sm">
            OFERTA
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight text-[#6d3536]">{product.nombre}</h3>
            <p className="mt-1 text-sm text-[#6d3536]/75">{product.descripcion}</p>
          </div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#6d3536]">ID {product.id}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            {offerPrice ? (
              <>
                <p className="text-xs uppercase tracking-wide text-[#6d3536]/45 line-through">${price}</p>
                <p className="text-2xl font-bold text-[#6d3536]">${offerPrice}</p>
              </>
            ) : (
              <p className="text-2xl font-bold text-[#6d3536]">${price}</p>
            )}
          </div>

          <div className="flex gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            <ActionButton
              label="Editar"
              icon="edit"
              tone="sky"
              onClick={(event) => {
                event.stopPropagation();
                onEdit?.(product);
              }}
            />
            <ActionButton
              label="Eliminar"
              icon="delete"
              tone="rose"
              onClick={(event) => {
                event.stopPropagation();
                onDelete?.(product);
              }}
            />
            <ActionButton
              label="Detalle"
              icon="visibility"
              tone="slate"
              onClick={(event) => {
                event.stopPropagation();
                onViewDetail?.(product.id);
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionButton({ icon, label, tone, onClick }) {
  const toneClass =
    tone === 'sky'
      ? 'text-[#6d3536] hover:bg-white/80'
      : tone === 'rose'
        ? 'text-[#987b80] hover:bg-white/80'
        : 'text-[#6d3536] hover:bg-white/80';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#987b80]/15 bg-white/80 shadow-sm transition ${toneClass}`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    </button>
  );
}
