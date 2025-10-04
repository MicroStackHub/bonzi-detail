import ProductDetailClient from './components/ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  return <ProductDetailClient productId={id} />;
}