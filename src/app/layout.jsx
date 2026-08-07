import './globals.css';

export const metadata = {
  title: 'Gestión y Catálogo de Productos',
  description: 'Frontend en Next.js para consumir BackService y administrar productos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
