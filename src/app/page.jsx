"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ConfirmDelete from '@/components/products/ConfirmDelete';
import ProductEditModal from '@/components/products/ProductEditModal';
import ProductList from '@/components/products/ProductList';
import { deleteProduct, getProducts, updateProduct } from '@/services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProductItem, setDeleteProductItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function showFeedback(type, message) {
    setFeedback({ type, message });
  }

  function closeFeedback() {
    setFeedback({ type: '', message: '' });
  }

  function handleEdit(product) {
    setEditingProduct({ ...product });
  }

  function handleDelete(product) {
    setDeleteProductItem(product);
  }

  async function handleSaveEdit(updatedProduct) {
    setSaving(true);
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      await loadProducts();
      setEditingProduct(null);
      showFeedback('success', 'Producto actualizado correctamente.');
    } catch (err) {
      showFeedback('error', err.message || 'No se pudo actualizar el producto.');
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete(id) {
    setDeleting(true);
    try {
      await deleteProduct(id);
      await loadProducts();
      setDeleteProductItem(null);
      showFeedback('success', 'Producto eliminado correctamente.');
    } catch (err) {
      showFeedback('error', err.message || 'No se pudo eliminar el producto.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Integrante 3</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Editar y eliminar productos</h2>
            <p className="mt-2 text-slate-600">Actualización con PUT y eliminación con confirmación previa.</p>
          </div>
          <span className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
            {products.length} productos
          </span>
        </div>

        {feedback.message ? (
          <div
            className={`mb-6 rounded-2xl px-4 py-3 text-sm font-medium ${
              feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span>{feedback.message}</span>
              <button type="button" onClick={closeFeedback} className="text-xs font-semibold uppercase tracking-[0.2em]">
                Cerrar
              </button>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[420px] animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            No hay productos disponibles.
          </div>
        ) : (
          <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </section>

      {editingProduct ? (
        <ProductEditModal
          product={editingProduct}
          loading={saving}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      ) : null}

      {deleteProductItem ? (
        <ConfirmDelete
          product={deleteProductItem}
          loading={deleting}
          onClose={() => setDeleteProductItem(null)}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </main>
  );
}
