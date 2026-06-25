# Delosi E-commerce — Evaluación Técnica Frontend Senior

Catálogo y detalle de producto construido sobre Next.js 16 (App Router), consumiendo la API pública [Fake Store API](https://fakestoreapi.com), bajo una arquitectura **Vertical Slice + Hexagonal (Ports & Adapters)**.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript** estricto
- **Zustand** — estado global del carrito
- **Axios** — cliente HTTP
- **Tailwind CSS 4**
- **Jest + React Testing Library** — testing unitario/integración

## Cómo correr el proyecto

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run start     # sirve el build de producción
npm test          # corre la suite de tests
npm run test:watch
npm run test:coverage
npm run lint      # ESLint (eslint-config-next + eslint-config-prettier)
npm run format    # Prettier — formatea todo el repo
npm run format:check
```

No requiere variables de entorno: la URL base de la API (`https://fakestoreapi.com`) está en `src/shared/infrastructure/api/apiClient.ts`.

## Arquitectura

```
src/
├── app/                          # Rutas (App Router) — shells delgados, sin lógica de negocio
│   ├── page.tsx                  # PLP: fetch server-side + Suspense/Skeleton
│   ├── products/[id]/page.tsx    # PDP: fetch + generateMetadata (SEO/OG)
│   ├── error.tsx / not-found.tsx
│
├── shared/                       # Kernel compartido (técnico, no de dominio)
│   ├── infrastructure/api/       # apiClient (axios) centralizado
│   └── presentation/             # Header, Footer, Skeleton, useMounted, estilos globales
│
└── modules/                      # Slices de negocio
    ├── products/
    │   ├── domain/                # Product.model, ProductRepository (puerto)
    │   ├── application/use-cases/ # filterAndSortProducts (función pura)
    │   ├── infrastructure/        # ApiProductRepository, MockProductRepository, composition root
    │   └── presentation/          # views, components, hooks (filtros vía URL)
    │
    └── cart/
        ├── domain/                # CartItem.model
        ├── application/use-cases/ # addItemToCart, removeItemFromCart, updateCartItemQuantity (funciones puras)
        ├── infrastructure/store/  # cart.store (Zustand + persist), cartDrawer.store
        └── presentation/          # CartButton, CartDrawer
```

Cada módulo separa **domain** (reglas e interfaces, sin dependencias externas) → **application** (casos de uso: las reglas de negocio, en funciones puras sin React ni librerías de estado) → **infrastructure** (implementaciones concretas: HTTP, localStorage, el propio Zustand) → **presentation** (UI). Las vistas importadas en `src/app/**/page.tsx` son las únicas piezas que tocan el framework de rutas; el resto del dominio es agnóstico a Next.js.

### Dónde sí se aplica Ports & Adapters, y dónde no

La arquitectura hexagonal se aplicó con fuerza en la **frontera con el backend** — `products/domain/ports/ProductRepository.interface.ts` + dos implementaciones reales (`ApiProductRepository`, `MockProductRepository`) — porque ahí sí existe una razón real para abstraer: la fuente de datos puede cambiar, y se necesita poder simularla en tests sin red. `products/application/use-cases/filterAndSortProducts.ts` extrae la regla de negocio del filtro/búsqueda/orden de la PLP a una función pura, testeable sin renderizar nada — antes vivía mezclada en un `useMemo` del componente.

`cart` sigue el mismo principio para sus reglas de negocio (`addItemToCart`, `removeItemFromCart`, `updateCartItemQuantity` en `application/use-cases/`, funciones puras sin Zustand ni React), pero **deliberadamente no abstrae el estado global detrás de un puerto**. La librería de estado (Zustand) no es una frontera con el mundo exterior como sí lo es una API — es, en la práctica de la industria, un detalle de la capa de presentación/UI, y abstraerla "por si algún día se cambia de librería" no es lo que hacen la mayoría de equipos de frontend (Zustand se usa directo, sin ceremonia, esa es justamente su propuesta de valor). `cart.store.ts` (`infrastructure/store/`) usa el `persist` de Zustand sin envolverlo en una capa adicional.

## Justificación: gestión de estado del carrito

Se eligió **Zustand con persistencia en localStorage** (estado de cliente puro) en lugar de estado de servidor o Context API:

- **Predictibilidad**: el store expone acciones explícitas (`addItem`, `removeItem`, `updateQuantity`, `clearCart`) con actualizaciones inmutables — el estado del carrito es trazable y testeable sin mocks de red.
- **Impacto en memoria**: Zustand no re-renderiza el árbol completo en cada cambio (a diferencia de Context), y el store completo pesa unos pocos KB; los ítems del carrito son referencias a productos ya cacheados, no copias pesadas.
- **No se eligió estado de servidor** porque el carrito no requiere persistencia multi-dispositivo para el alcance de este reto — el requisito mínimo (botón "Agregar al carrito" reflejando el conteo en el Header) no exige un backend de carrito. El badge de `CartButton` y el panel de `CartDrawer` con gestión de cantidades es una iniciativa propia que excede el mínimo pedido, pensada para mostrar un flujo de e-commerce más completo (ver sección de alcance abajo).

## Alcance: qué pide el reto vs. qué se implementó de más

El documento de evaluación pide en la PDP únicamente: _"botón funcional de Agregar al carrito que interactúe con un estado global, reflejando el incremento de ítems en el Header"_. Eso está cubierto por `useCartStore` + `CartButton`.

Como iniciativa adicional (sección "Factor Proactividad" del reto) se implementó además:

- Un `CartDrawer` completo: gestión de cantidades, eliminar ítems, vaciar carrito y un botón de checkout simulado.
- Streaming SSR real con Suspense + Skeletons en PLP y PDP: el fetch de datos vive en un componente hijo async (`CatalogData`, `ProductDetailData`) dentro del `<Suspense>`, no antes de él, así el shell/skeleton se manda en el primer byte y el contenido real llega después por streaming (verificado con `curl`: `Transfer-Encoding: chunked`, primer byte en ~80ms vs. respuesta completa varios segundos después).
- `error.tsx` / `not-found.tsx` para resiliencia ante fallos de la API.
- `revalidate` + `React.cache()` para control de caché/revalidación.
- Optimización de imágenes externas con `next/image` (`remotePatterns` para `fakestoreapi.com`).
- Metadata propia (título, descripción, Open Graph) también en la PLP, no solo en la PDP — el documento solo exige metadata dinámica en la PDP, esto evita que el catálogo herede el título genérico del layout al compartirse en redes.

## Testing

Suite con Jest + React Testing Library, tests nombrados en estilo BDD (`describe`/`it` como especificación de comportamiento), cubriendo los flujos críticos de negocio:

- `addItemToCart.test.ts` / `updateCartItemQuantity.test.ts` — reglas de negocio del carrito (merge de duplicados, clamp de cantidad ≥ 1) como funciones puras, sin Zustand ni React.
- `cart.store.test.ts` (infrastructure) — el store orquesta correctamente esos use-cases y persiste el resultado.
- `useProductFilterParams.test.ts` — sincronización de los parámetros de filtro con la URL (search params).
- `filterAndSortProducts.test.ts` — regla de negocio de filtrado/búsqueda/orden de la PLP como función pura, sin renderizar nada.
- `ProductCatalogView.test.tsx` — integración: el componente orquesta esa regla correctamente y muestra el estado vacío.
- `ProductCard.test.tsx` — agregar al carrito desde la PLP actualiza el store sin abrir el drawer (no interrumpe la navegación del catálogo).
- `CartButton.test.tsx` — el contador del Header refleja la cantidad total de ítems.
- `CartDrawer.test.tsx` — completar la compra muestra la confirmación y vacía el carrito; eliminar un ítem actualiza el store.

```bash
npm test
npm run test:coverage
```

`collectCoverageFrom` está limitado a `src/modules/**` (modelos e interfaces excluidos, son solo tipos). No se persigue 100% de cobertura — se priorizaron los flujos de negocio críticos (PLP, carrito, PDP) por sobre detalles de UI de bajo riesgo (`SearchBar`, `CategoryFilters`) o I/O que requeriría mockear axios (`ApiProductRepository`).

## Pendientes / siguientes pasos

- Tests E2E (Playwright) del flujo completo catálogo → filtro → detalle → carrito.
- Web Vitals (`useReportWebVitals`) para métricas de performance orientadas a e-commerce.
- Deploy público (Vercel).
