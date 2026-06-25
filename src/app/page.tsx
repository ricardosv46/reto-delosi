import { Suspense } from 'react';
import { Metadata } from 'next';
import { productRepository } from '@/modules/products/infrastructure/composition/container';
import { ProductCatalogView } from '@/modules/products/presentation/views/ProductCatalogView';
import { CatalogSkeleton } from '@/modules/products/presentation/components/CatalogSkeleton';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Catálogo de Productos | Delosi E-commerce',
  description:
    'Explora nuestra colección de productos premium: filtra por categoría, busca por texto y ordena por precio.',
  openGraph: {
    title: 'Catálogo de Productos | Delosi E-commerce',
    description:
      'Explora nuestra colección de productos premium: filtra por categoría, busca por texto y ordena por precio.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogData />
    </Suspense>
  );
}

async function CatalogData() {
  const [products, categories] = await Promise.all([
    productRepository.getProducts(),
    productRepository.getCategories(),
  ]);

  return <ProductCatalogView initialProducts={products} categories={categories} />;
}
