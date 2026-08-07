import Image from 'next/image';

export default function ProductCard({ product, onEdit, onDelete }) {
  const price = Number(product.precio).toFixed(2);
  const offerPrice = product.precioOferta ? Number(product.precioOferta).toFixed(2) : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-[16/10] bg-slate-100">
        <Image
          src={product.imagen || 'https://placehold.co/600x400?text=Producto'}
          alt={product.nombre}
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{product.nombre}</h3>
            <p className="text-sm text-slate-500">{product.categoriaNombre}</p>
          </div>
          {product.enOferta ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              En oferta
            </span>
          ) : null}
        </div>

        <p className="max-h-[4.5rem] overflow-hidden text-sm leading-6 text-slate-600">{product.descripcion}</p>

        <div className="flex items-end justify-between gap-3">
          <div>
            {offerPrice ? (
              <>
                <p className="text-xs uppercase tracking-wide text-slate-400 line-through">${price}</p>
                <p className="text-2xl font-bold text-sky-600">${offerPrice}</p>
              </>
            ) : (
              <p className="text-2xl font-bold text-slate-900">${price}</p>
            )}
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            ID {product.id}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => onEdit?.(product)}
            className="rounded-xl border border-sky-200 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(product)}
            className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
