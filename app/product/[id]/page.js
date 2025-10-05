"use server"

import ProductDetail from './components/ProductDetail';
import { fetchProductData, fetchPriceData } from './lib/fetchProduct';

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return <ProductDetail error="Product ID not found" />;
  }

  try {
    const { product, productDescription } = await fetchProductData(id);
    const priceData = await fetchPriceData(id);

    return <ProductDetail 
      product={product} 
      productDescription={productDescription} 
      priceData={priceData} 
      productId={id} 
    />;
  } catch (err) {
    return <ProductDetail error={err.message || 'Failed to load product'} />;
  }
}