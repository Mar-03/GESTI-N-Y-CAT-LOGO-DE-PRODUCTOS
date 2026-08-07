"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';
import { createProduct, getProductById, getProducts } from '@/services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  async function handleCreateProduct(payload) {
    setCreating(true);
    try {
      await createProduct(payload);
      await loadProducts();
      setFeedback({ type: 'success', message: 'Producto creado correctamente.' });
    } finally {
      setCreating(false);
    }
  }

  async function handleViewDetail(id) {
    try {
      setDetailLoading(true);
      const product = await getProductById(id);
      setDetailProduct(product);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'No se pudo cargar el detalle.' });
    } finally {
      setDetailLoading(false);
    }
  }

  function closeDetail() {
    setDetailProduct(null);
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Integrante 1</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Listado de productos</h2>
            <p className="mt-2 text-slate-600">Consumo del endpoint GET para mostrar los productos en tarjetas.</p>
          </div>
          <span className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
            {products.length} productos
          </span>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <ProductForm
            onSubmit={handleCreateProduct}
            loading={creating}
            onSuccess={() => setFeedback({ type: 'success', message: 'Formulario enviado con exito.' })}
          />

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Listado</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Productos registrados</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                {detailLoading ? 'Cargando detalle...' : 'Vista general'}
              </span>
            </div>

            {feedback.message ? (
              <div
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {feedback.message}
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
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                No hay productos disponibles.
              </div>
            ) : (
              <ProductList products={products} onViewDetail={handleViewDetail} />
            )}
          </div>
        </div>
      </section>

      {detailProduct ? <ProductDetailModal product={detailProduct} onClose={closeDetail} /> : null}
    </main>
  );
}
