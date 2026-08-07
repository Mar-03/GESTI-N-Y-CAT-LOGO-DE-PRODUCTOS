export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#987b80]/30 bg-[#5A2C37]/92 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#90a3b1] text-sm font-bold text-[#6d3536] shadow-sm">
            G
          </div>
          <div>
            <h1 className="text-base font-bold text-[#e2dbd5] sm:text-lg">Gestión y Catálogo de Productos</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#e2dbd5] transition hover:bg-white/10 hover:text-white"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c7b6c6] text-[#6d3536] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
