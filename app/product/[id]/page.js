"use server"

import ProductDetail from './components/ProductDetail';
import { fetchProductData, fetchPriceData } from './lib/fetchProduct';

// Helper to strip HTML tags for meta descriptions
function stripHtml(html = '') {
  try {
    return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
  } catch {
    return html;
  }
}

// Dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!id) {
    return {
      title: 'Product | BonziCart',
      description: 'Discover quality products on BonziCart.'
    };
  }

  try {
    const { product, productDescription } = await fetchProductData(id);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bonzicart.com';
    const url = `${baseUrl}/product/${id}`;
    const images = (product?.media || [])
      .filter(m => m?.type === 'image' && !!m?.url)
      .map(m => m.url);
    const ogImages = images.length > 0 ? images.slice(0, 3) : ['/BonziLogo.png'];

    const rawDesc = productDescription || product?.description || '';
    const metaDesc = stripHtml(rawDesc).slice(0, 160) || `Buy ${product?.name || 'product'} online at BonziCart.`;

    return {
      title: `${product?.name || 'Product'} | BonziCart`,
      description: metaDesc,
      keywords: [product?.name, product?.seller, 'BonziCart', 'Buy Online', 'Best Price']
        .filter(Boolean),
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: `${product?.name || 'Product'} | BonziCart`,
        description: metaDesc,
        type: 'website',
        url,
        images: ogImages
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product?.name || 'Product'} | BonziCart`,
        description: metaDesc,
        images: ogImages?.[0] || '/BonziLogo.png'
      }
    };
  } catch (err) {
    return {
      title: 'Product | BonziCart',
      description: 'Explore products on BonziCart.'
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return <ProductDetail error="Product ID not found" />;
  }

  try {
    const { product, productDescription } = await fetchProductData(id);
  const priceResult = await fetchPriceData(id);
  const priceData = priceResult && priceResult.data ? priceResult.data : null;
  const priceWarning = priceResult && priceResult.warning ? priceResult.warning : null;

    // Fetch FAQs server-side for this product
    let faqList = [];
    try {
      const faqUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.glst.in'}/api/v1/get-product-faq?product_id=${id}&limit=15&page=1`;
      const faqRes = await fetch(faqUrl);
      const faqJson = await faqRes.json();
      faqList = (faqJson && faqJson.data && Array.isArray(faqJson.data.data)) ? faqJson.data.data : [];
    } catch (faqErr) {
      // silently continue with empty faqList
      faqList = [];
    }

    // Build Product JSON-LD schema
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bonzicart.com';
    const url = `${baseUrl}/product/${id}`;
    const images = (product?.media || [])
      .filter(m => m?.type === 'image' && !!m?.url)
      .map(m => m.url);
    const currentStock = (priceData && typeof priceData.stock === 'number') ? priceData.stock : (typeof product?.stock === 'number' ? product.stock : 0);
    const price = (typeof priceData?.total_sale_price === 'number' && priceData.total_sale_price > 0)
      ? priceData.total_sale_price
      : (product?.priceDetails?.finalPrice || 0);
    const description = stripHtml(productDescription || product?.description || '');

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product?.name,
      image: images.length > 0 ? images : undefined,
      description: description || undefined,
      sku: String(product?.id || id),
      brand: product?.seller ? { '@type': 'Brand', name: product.seller } : undefined,
      aggregateRating: (product?.rating && product.rating > 0) ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product?.reviews || 0
      } : undefined,
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'INR',
        price: typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.]/g, '')) || 0,
        availability: currentStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition'
      }
    };

    return (
      <>
        <ProductDetail 
          product={product} 
          productDescription={productDescription} 
          priceData={priceData} 
          productId={id}
          faq={faqList}
          priceWarning={priceWarning}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema, (_k, v) => v === undefined ? undefined : v) }}
        />
      </>
    );
  } catch (err) {
    return <ProductDetail error={err.message || 'Failed to load product'} />;
  }
}