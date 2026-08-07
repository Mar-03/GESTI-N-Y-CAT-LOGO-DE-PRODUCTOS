"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ConfirmDelete from '@/components/products/ConfirmDelete';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import ProductEditModal from '@/components/products/ProductEditModal';
import ProductFilters from '@/components/products/ProductFilters';
import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '@/services/api';
import { getUniqueCategories } from '@/utils/categories';
import { normalizeText } from '@/utils/text';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [creating, setCreating] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProductItem, setDeleteProductItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

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

  async function handleCreateProduct(payload) {
    setCreating(true);
    try {
      await createProduct(payload);
      await loadProducts();
      setCreateOpen(false);
      showFeedback('success', 'Producto creado correctamente.');
    } catch (err) {
      showFeedback('error', err.message || 'No se pudo crear el producto.');
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
      showFeedback('error', err.message || 'No se pudo cargar el detalle.');
    } finally {
      setDetailLoading(false);
    }
  }

  function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('');
    setOnlyOffers(false);
  }

  const categories = getUniqueCategories(products);
  const filteredProducts = products.filter((product) => {
    const name = normalizeText(product.nombre);
    const matchesName = name.includes(normalizeText(searchTerm));
    const matchesCategory = !selectedCategory || normalizeText(product.categoriaNombre) === selectedCategory;
    const matchesOffer = !onlyOffers || Boolean(product.enOferta);

    return matchesName && matchesCategory && matchesOffer;
  });

  return (
    <main className="min-h-screen bg-[#e2dbd5]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d3536]">Catálogo</p>
            <h2 className="mt-2 text-3xl font-bold text-[#2a363b]">Productos disponibles</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#2a363b]/80">
              Navega, filtra y administra el catálogo con una experiencia más ligera y visual.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="hidden items-center gap-2 rounded-full bg-[#6d3536] px-4 py-2 text-sm font-semibold text-[#e2dbd5] shadow-sm transition hover:bg-[#987b80] active:scale-95 md:inline-flex"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nuevo producto
          </button>
        </div>

        <ProductFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onlyOffers={onlyOffers}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onOnlyOffersChange={setOnlyOffers}
          onClearFilters={clearFilters}
        />

        {feedback.message ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ${
              feedback.type === 'success' ? 'bg-[#c7b6c6]/30 text-[#6d3536]' : 'bg-[#ffbbdd]/50 text-[#6d3536]'
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

        <div className="mt-6 rounded-3xl border border-[#987b80]/15 bg-[#ffeeee] p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#2a363b]">Catálogo</h3>
              <p className="text-sm text-[#2a363b]/70">
                {detailLoading ? 'Cargando detalle...' : `${filteredProducts.length} productos visibles`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[240px] animate-pulse rounded-2xl bg-[#ffccdd]" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#987b80]/30 bg-[#ffeeee] p-6 text-[#6d3536]">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#2a363b]/75">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/70 text-[#2a363b]/40">
                <span className="material-symbols-outlined text-[42px]">search_off</span>
              </div>
              <h4 className="text-lg font-semibold text-[#2a363b]">No se encontraron productos</h4>
              <p className="mt-2 max-w-sm text-sm text-[#2a363b]/75">
                Prueba con otra búsqueda, otra categoría o elimina los filtros activos.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-full bg-[#6d3536] px-4 py-2 text-sm font-semibold text-[#e2dbd5] transition hover:bg-[#987b80]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <ProductList products={filteredProducts} onViewDetail={handleViewDetail} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setCreateOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#6d3536] text-[#e2dbd5] shadow-xl transition hover:bg-[#987b80] active:scale-90 md:bottom-6 md:right-6"
        aria-label="Nuevo producto"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      {createOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#6d3536]/70 px-4 py-6 sm:items-center">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#ffeeee] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#987b80]/15 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d3536]">Nuevo producto</p>
                <h3 className="text-2xl font-bold text-[#2a363b]">Registrar producto</h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-[#6d3536]"
              >
                Cerrar
              </button>
            </div>

            <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-4 sm:p-6">
              <ProductForm onSubmit={handleCreateProduct} loading={creating} />
            </div>
          </div>
        </div>
      ) : null}

      {detailProduct ? <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} /> : null}

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
