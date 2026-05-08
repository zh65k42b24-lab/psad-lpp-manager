import React from 'react';
import { getProductById } from '@/lib/lpp-database';
import { ProductDetailView } from '@/components/ProductDetailView';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-psad-blue-600">PSAD LPP Manager</h1>
            <a href="/" className="text-gray-600 hover:text-gray-900">
              ← Retour
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailView product={product} />
      </main>
    </div>
  );
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }

  return {
    title: `${product.libelle} - Code LPP ${product.code}`,
    description: product.description,
  };
};
