import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import ContactSellerModal from '../../components/ContactSellerModal';
import ProductTabs from '../../components/product/ProductTabs';
import { useCart } from '../../contexts/CartContext';
import RelatedProducts from '../../components/product/RelatedProducts';

export default function ProductDetail({ product, description }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.media && product.media[0]?.url,
        size: selectedSize
      };
      addToCart(cartItem);
      toast.success('Added to cart successfully!');
    }
  };

  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Head>
        <title>{`${product.name} | BonziCart`}</title>
        <meta name="description" content={product.description || `Buy ${product.name} at best price from ${product.seller}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.media && Array.isArray(product.media) && product.media.length > 0 ? product.media[0].url : ''} />
        <meta property="og:type" content="product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://bonzicart.com/product/${product.id}`} />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                {product.media && product.media[selectedImage] && (
                  <Image
                    src={product.media[selectedImage].url}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.media && product.media.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">by {product.seller}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      <span className="text-green-600 font-semibold">{product.discount}% off</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>

          <ProductTabs
            description={description}
            specifications={product.specifications}
          />

          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>

        <ContactSellerModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          sellerName={product.seller}
          sellerContact={product.sellerContact}
          productName={product.name}
        />
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  try {
    const { id } = params;

    const [productResponse, descriptionResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/product?product_id=${id}`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product-description/${id}`)
    ]);

    const [productData, descriptionData] = await Promise.all([
      productResponse.json(),
      descriptionResponse.json()
    ]);

    if (!productData.success || !productData.data) {
      return {
        notFound: true,
      };
    }

    // Transform the API data with null safety
    const apiProduct = productData.data;
    
    // Ensure all required fields have valid values
    const transformedProduct = {
      id: apiProduct.product_id || id,
      name: apiProduct.name || apiProduct.title || 'Product Name',
      seller: apiProduct.seller_name || 'Unknown Seller',
      sellerContact: apiProduct.seller_contact || '',
      price: apiProduct.price || 0,
      originalPrice: apiProduct.original_price || apiProduct.price || 0,
      discount: apiProduct.discount_percentage || 0,
      rating: apiProduct.rating || 4.5,
      reviewCount: apiProduct.review_count || 0,
      inStock: apiProduct.in_stock !== false,
      description: apiProduct.description || '',
      specifications: Array.isArray(apiProduct.specifications) ? apiProduct.specifications : [],
      media: Array.isArray(apiProduct.media) ? apiProduct.media : [],
      category: apiProduct.category || '',
      subcategory: apiProduct.subcategory || '',
      tags: Array.isArray(apiProduct.tags) ? apiProduct.tags : []
    };

    return {
      props: {
        product: transformedProduct,
        description: descriptionData.success ? descriptionData.data : '',
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    console.error('Product ID:', id);
    return {
      notFound: true,
    };
  }
}