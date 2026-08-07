export default function ConfirmDelete({ product, onClose, onConfirm, loading = false }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Eliminar producto</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{product.nombre}</h3>
        <p className="mt-3 text-slate-600">¿Desea eliminar este producto?</p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
