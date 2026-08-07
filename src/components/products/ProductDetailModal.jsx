export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const price = Number(product.precio).toFixed(2);
  const offerPrice = product.precioOferta ? Number(product.precioOferta).toFixed(2) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6d3536]/70 px-4 py-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#ffeeee] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#987b80]/15 px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d3536]">Detalle</p>
            <h3 className="text-2xl font-bold text-[#6d3536]">{product.nombre}</h3>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-[#6d3536]">
            Cerrar
          </button>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[240px_1fr]">
          <img
            src={product.imagen || 'https://placehold.co/600x400?text=Producto'}
            alt={product.nombre}
            className="h-full w-full rounded-2xl object-cover"
          />

          <div className="space-y-4">
            <p className="text-sm text-[#6d3536]/80">{product.descripcion}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Categoría" value={product.categoriaNombre} />
              <Info label="ID categoría" value={product.categoriaId} />
              <Info label="Precio" value={`$${price}`} />
              <Info label="Oferta" value={product.enOferta ? 'Sí' : 'No'} />
            </div>
            {offerPrice ? <p className="text-lg font-bold text-[#6d3536]">Precio oferta: ${offerPrice}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#987b80]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#6d3536]">{value}</p>
    </div>
  );
}
