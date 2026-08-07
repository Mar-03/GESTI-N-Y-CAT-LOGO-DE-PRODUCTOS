export default function ConfirmDelete({ product, onClose, onConfirm, loading = false }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6d3536]/70 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-[#ffeeee] p-6 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d3536]">Eliminar producto</p>
        <h3 className="mt-2 text-2xl font-bold text-[#6d3536]">{product.nombre}</h3>
        <p className="mt-3 text-[#6d3536]/80">¿Desea eliminar este producto?</p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#987b80]/15 px-4 py-3 font-semibold text-[#6d3536]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            disabled={loading}
            className="flex-1 rounded-xl bg-[#6d3536] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
