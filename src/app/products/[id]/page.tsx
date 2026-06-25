import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { productRepository } from '@/modules/products/infrastructure/composition/container';
import { ProductDetailView } from '@/modules/products/presentation/views/ProductDetailView';
import { ProductDetailSkeleton } from '@/modules/products/presentation/components/ProductDetailSkeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const product = await productRepository.getProductById(id);

    if (!product) {
      return {
        title: 'Producto no encontrado | Delosi E-commerce',
        description: 'El artículo solicitado no existe o no está disponible en este momento.',
      };
    }

    return {
      title: `${product.title} | Delosi E-commerce`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image, alt: product.title }],
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Detalle del Producto | Delosi E-commerce',
      description: 'Carga de detalles del producto de la evaluación de Delosi.',
    };
  }
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailData params={params} />
    </Suspense>
  );
}

async function ProductDetailData({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const product = await productRepository.getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
