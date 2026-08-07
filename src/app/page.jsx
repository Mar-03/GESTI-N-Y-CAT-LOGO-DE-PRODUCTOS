import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Integrante 1</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Base inicial del proyecto</h2>
          <p className="mt-4 text-slate-600">
            Configuración de Next.js, Tailwind CSS y estructura inicial para listar productos desde la API.
          </p>
        </div>
      </section>
    </main>
  );
}
