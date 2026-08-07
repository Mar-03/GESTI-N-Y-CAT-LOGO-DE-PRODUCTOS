"use client";

import { useEffect, useState } from 'react';

export default function ProductEditModal({ product, onClose, onSave, loading = false }) {
  const [form, setForm] = useState(product);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(product);
    setErrors({});
  }, [product]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.nombre?.trim()) nextErrors.nombre = 'El nombre es obligatorio.';
    if (!form.descripcion?.trim()) nextErrors.descripcion = 'La descripción es obligatoria.';
    if (!form.precio || Number(form.precio) <= 0) nextErrors.precio = 'El precio debe ser mayor a 0.';
    if (!form.imagen?.trim()) nextErrors.imagen = 'La imagen es obligatoria.';
    if (!form.categoriaId || Number(form.categoriaId) <= 0) nextErrors.categoriaId = 'La categoría es obligatoria.';
    if (!form.categoriaNombre?.trim()) nextErrors.categoriaNombre = 'La categoría es obligatoria.';
    if (form.enOferta && (!form.precioOferta || Number(form.precioOferta) >= Number(form.precio))) {
      nextErrors.precioOferta = 'El precio oferta debe ser menor al precio normal.';
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSave({
      ...form,
      id: Number(form.id),
      precio: Number(form.precio),
      precioOferta: form.enOferta ? Number(form.precioOferta) : 0,
      categoriaId: Number(form.categoriaId),
    });
  }

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6d3536]/70 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-[#ffeeee] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#987b80]/15 px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d3536]">Editar producto</p>
            <h3 className="text-2xl font-bold text-[#6d3536]">{product.nombre}</h3>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-[#6d3536]">
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="nombre" value={form.nombre || ''} onChange={handleChange} error={errors.nombre} />
            <Field label="Precio" name="precio" type="number" step="0.01" value={form.precio || ''} onChange={handleChange} error={errors.precio} />
          </div>

          <Field label="Descripción" name="descripcion" value={form.descripcion || ''} onChange={handleChange} error={errors.descripcion} textarea />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Imagen" name="imagen" value={form.imagen || ''} onChange={handleChange} error={errors.imagen} />
            <Field label="Categoría ID" name="categoriaId" type="number" value={form.categoriaId || ''} onChange={handleChange} error={errors.categoriaId} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Categoría" name="categoriaNombre" value={form.categoriaNombre || ''} onChange={handleChange} error={errors.categoriaNombre} />
            <Field label="Precio oferta" name="precioOferta" type="number" step="0.01" value={form.precioOferta || ''} onChange={handleChange} error={errors.precioOferta} />
          </div>

          <label className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-[#6d3536]">
            <input
              type="checkbox"
              name="enOferta"
              checked={Boolean(form.enOferta)}
              onChange={handleChange}
              className="h-4 w-4 rounded border-[#987b80]/30 text-[#6d3536] focus:ring-[#987b80]"
            />
            Producto en oferta
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#987b80]/15 px-4 py-3 font-semibold text-[#6d3536]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-[#6d3536] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, textarea = false, ...props }) {
  const baseClass = `w-full rounded-xl border bg-white/70 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#987b80]/25 ${
    error ? 'border-[#987b80]' : 'border-[#987b80]/30'
  }`;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#6d3536]">{label}</span>
      {textarea ? <textarea {...props} className={baseClass} rows={4} /> : <input {...props} className={baseClass} />}
      {error ? <span className="text-xs font-medium text-[#987b80]">{error}</span> : null}
    </label>
  );
}
