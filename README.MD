# Gestión y Catálogo de Productos

Aplicación web Frontend que consume el servicio BackService para administrar un catálogo de productos. Permite listar, consultar, crear, editar y eliminar productos, con búsqueda en tiempo real, filtros por categoría y ofertas, todo con una interfaz responsive.

## Stack Tecnológico

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## API BackService

- URL base: `https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto`
- Métodos consumidos: `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`
- Encabezado obligatorio en `POST` y `PUT`: `Content-Type: application/json`

### Estructura del objeto Producto

```json
{
  "id": 101,
  "nombre": "Auriculares Bluetooth",
  "descripcion": "Auriculares inalámbricos con cancelación de ruido.",
  "precio": 45.99,
  "enOferta": true,
  "precioOferta": 35.99,
  "imagen": "https://placehold.co/300x200?text=Auriculares",
  "categoriaId": 1,
  "categoriaNombre": "Electrónica"
}
```

## Módulos del Sistema

| Módulo | Descripción |
| ------ | ----------- |
| CRUD de Productos | Listado general, consulta por ID, creación, edición y eliminación. |
| Categorías Dinámicas | Extracción de valores únicos (`categoriaId`, `categoriaNombre`) desde los productos para construir el menú, sin API adicional. |
| Búsqueda y Filtros | Búsqueda reactiva por nombre, filtro por categoría, filtro por oferta y combinación de criterios. |
| UX/UI | Diseño responsive, estados de carga, manejo de errores y alertas visuales. |

## Estructura del Repositorio

```
src/
│
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── products/
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ProductFilters.jsx
│   │   └── ConfirmDelete.jsx
│   │
│   └── ui/
│       ├── Loader.jsx
│       ├── Alert.jsx
│       ├── Button.jsx
│       └── Modal.jsx
│
├── services/
│   └── api.js
│
├── hooks/
│   └── useProducts.js
│
├── utils/
│   ├── filters.js
│   └── categories.js
│
└── types/
    └── product.js
```

## Integrantes y Responsabilidades

| Integrante | Responsabilidades |
| ---------- | ----------------- |
| **María Fajardo** | Configuración del proyecto (Next.js + Tailwind), estructura de carpetas, consumo `GET` para listar productos, componentes `ProductCard`, `ProductList`, `Navbar`. |
| **Josué Hichos** | Formulario de creación (`POST`), validaciones, consulta por ID (`GET /{id}`), modal de detalle y mensajes de éxito/error. |
| **Yamilet Lindo** | Formulario de edición (`PUT /{id}`), botón y confirmación de eliminación (`DELETE /{id}`), actualización automática del listado. |
| **Madelin Cerón** | Categorías dinámicas (DISTINCT), búsqueda por nombre, filtro por categoría, filtro de ofertas y combinación de filtros. |
| **Cindy Ruano** | Diseño responsive, loader, manejo de errores, alertas, Navbar y Footer finales, integración de todos los módulos, README y capturas. |

## Ramas del Repositorio

Cada integrante trabaja en su propia rama:

```
feature/integrante-1-maria-fajardo
feature/integrante-2-josue-hichos
feature/integrante-3-yamilet-lindo
feature/integrante-4-madelin-ceron
feature/integrante-5-cindy-ruano
```

## Requisitos Previos

- Node.js 18 o superior
- npm

## Instalación y Ejecución

```bash
npm install
npm run dev
```

Abrir en el navegador: http://localhost:3000

## Scripts Disponibles

```bash
npm run dev        # Entorno de desarrollo
npm run build      # Compilación de producción
npm run start      # Servidor de producción
npm run lint       # Verificación de código con ESLint
```
