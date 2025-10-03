
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getProductData(id) {
  try {
    const [productResponse, descriptionResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/product?product_id=${id}`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product-description/${id}`, {
        cache: 'no-store'
      })
    ]);

    const [productData, descriptionData] = await Promise.all([
      productResponse.json(),
      descriptionResponse.json()
    ]);

    if (!productData.success) {
      return null;
    }

    return {
      product: productData.data,
      description: descriptionData.success ? descriptionData.data : ''
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const data = await getProductData(id);
  
  if (!data) {
    return {
      title: 'Product Not Found | BonziCart'
    };
  }

  const product = data.product;
  
  return {
    title: `${product.name} | BonziCart`,
    description: product.description || `Buy ${product.name} at best price from ${product.seller_name || 'BonziCart'}`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.media && product.media[0]?.url ? [product.media[0].url] : [],
      type: 'product'
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const data = await getProductData(id);

  if (!data) {
    notFound();
  }

  const { product, description } = data;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <ProductGallery product={product} />

        {/* Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} description={description} />

      {/* Related Products */}
      <RelatedProducts productId={id} category={product.category} />
    </div>
  );
}

function ProductGallery({ product }) {
  const media = product.media || [];
  const firstMedia = media[0] || { url: '/placeholder.jpg' };

  return (
    <div className="space-y-4">
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={firstMedia.url}
          alt={product.name}
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {media.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300"
          >
            <Image
              src={image.url}
              alt={`${product.name} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductInfo({ product }) {
  const price = product.price || 0;
  const originalPrice = product.original_price || product.price;
  const discount = product.discount_percentage || 0;
  const rating = product.rating || 4.5;
  const reviewCount = product.review_count || 0;
  const inStock = product.in_stock !== false;
  const seller = product.seller_name || 'Unknown Seller';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600">by {seller}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-gray-700">{rating}</span>
        </div>
        <span className="text-gray-500">({reviewCount} reviews)</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">₹{price}</span>
          {originalPrice > price && (
            <>
              <span className="text-lg text-gray-500 line-through">₹{originalPrice}</span>
              <span className="text-green-600 font-semibold">{discount}% off</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          disabled={!inStock}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Add to Cart
        </button>
        <button className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
          Contact Seller
        </button>
      </div>
    </div>
  );
}

function ProductTabs({ product, description }) {
  const specifications = product.specifications || [];

  return (
    <div className="mt-12 bg-white p-4 rounded-lg shadow-sm">
      <div className="border-b border-gray-200 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 pb-4">Product Details</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-orange-500 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specifications.map((spec, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-blue-600 mb-2">
                  {spec.PropertyName}
                </div>
                <div className="text-sm text-gray-800 font-semibold">
                  {spec.PropertyValue}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-800 mb-3">Description</h3>
          {description ? (
            <div 
              className="text-gray-600 leading-relaxed text-sm prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

async function RelatedProducts({ productId, category }) {
  // In a real app, you'd fetch related products here
  // For now, returning empty to keep it simple
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
      <div className="text-gray-500 text-center py-8">
        No related products available
      </div>
    </div>
  );
}
