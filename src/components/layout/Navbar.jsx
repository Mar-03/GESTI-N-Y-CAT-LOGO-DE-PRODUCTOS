export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Proyecto Frontend</p>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Gestión y Catálogo de Productos</h1>
        </div>
      </div>
    </header>
  );
}
