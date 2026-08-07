"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductList from '@/components/products/ProductList';
import { getProducts } from '@/services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError('');

        const data = await getProducts();

        if (active) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Ocurrió un error al cargar los productos.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

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
          <ProductList products={products} />
        )}
      </section>
    </main>
  );
}
