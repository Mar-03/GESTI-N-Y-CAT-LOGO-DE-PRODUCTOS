"use client";

import { useState } from 'react';

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  enOferta: false,
  precioOferta: '',
  imagen: '',
  categoriaId: '',
  categoriaNombre: '',
};

export default function ProductForm({ onSubmit, loading = false, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.nombre.trim()) nextErrors.nombre = 'El nombre es obligatorio.';
    if (!form.descripcion.trim()) nextErrors.descripcion = 'La descripción es obligatoria.';
    if (!form.precio || Number(form.precio) <= 0) nextErrors.precio = 'El precio debe ser mayor a 0.';
    if (!form.imagen.trim()) nextErrors.imagen = 'La imagen es obligatoria.';
    if (!form.categoriaId || Number(form.categoriaId) <= 0) nextErrors.categoriaId = 'La categoría es obligatoria.';
    if (!form.categoriaNombre.trim()) nextErrors.categoriaNombre = 'El nombre de la categoría es obligatorio.';

    if (form.enOferta && (!form.precioOferta || Number(form.precioOferta) >= Number(form.precio))) {
      nextErrors.precioOferta = 'El precio oferta debe ser menor al precio normal.';
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        enOferta: form.enOferta,
        precioOferta: form.enOferta ? Number(form.precioOferta) : 0,
        imagen: form.imagen.trim(),
        categoriaId: Number(form.categoriaId),
        categoriaNombre: form.categoriaNombre.trim(),
      });

      setForm(initialForm);
      setErrors({});
      onSuccess?.();
    } catch (error) {
      setSubmitError(error.message || 'No se pudo guardar el producto.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#987b80]/15 bg-[#ffeeee] p-6 shadow-sm">
      <div>
        <h3 className="mt-2 text-2xl font-bold text-[#6d3536]">Nuevo producto</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} error={errors.nombre} />
        <Field label="Precio" name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} error={errors.precio} />
      </div>

      <Field label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} error={errors.descripcion} textarea />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Imagen" name="imagen" value={form.imagen} onChange={handleChange} error={errors.imagen} />
        <Field label="Categoría ID" name="categoriaId" type="number" value={form.categoriaId} onChange={handleChange} error={errors.categoriaId} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Categoría" name="categoriaNombre" value={form.categoriaNombre} onChange={handleChange} error={errors.categoriaNombre} />
        <Field label="Precio oferta" name="precioOferta" type="number" step="0.01" value={form.precioOferta} onChange={handleChange} error={errors.precioOferta} />
      </div>

      <label className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-[#6d3536]">
        <input
          type="checkbox"
          name="enOferta"
          checked={form.enOferta}
          onChange={handleChange}
          className="h-4 w-4 rounded border-[#987b80]/30 text-[#6d3536] focus:ring-[#987b80]"
        />
        Producto en oferta
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#6d3536] px-4 py-3 font-semibold text-white transition hover:bg-[#987b80] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Guardando...' : 'Guardar producto'}
      </button>

      {submitError ? <p className="text-sm font-medium text-[#987b80]">{submitError}</p> : null}
    </form>
  );
}

function Field({ label, error, textarea = false, className = '', ...props }) {
  const baseClass = `w-full rounded-xl border bg-white/70 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#987b80]/25 ${
    error ? 'border-[#987b80]' : 'border-[#987b80]/30'
  } ${className}`;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#6d3536]">{label}</span>
      {textarea ? (
        <textarea {...props} className={baseClass} rows={4} />
      ) : (
        <input {...props} className={baseClass} />
      )}
      {error ? <span className="text-xs font-medium text-[#987b80]">{error}</span> : null}
    </label>
  );
}
