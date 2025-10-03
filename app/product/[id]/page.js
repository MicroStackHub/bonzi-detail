import ProductGallery from './components/ProductGallery';
import ProductInteractive from './components/ProductInteractive';
import SellerInfo from './components/SellerInfo';
import ProductTabs from './components/ProductTabs';
import BulkPriceButton from './components/BulkPriceButton';
import ProductPolicies from './components/ProductPolicies';

async function fetchProductData(productId) {
  try {
    const [productResponse, descriptionResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/product?product_id=${productId}`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product-description/${productId}`)
    ]);

    if (!productResponse.ok) {
      throw new Error(`HTTP error! status: ${productResponse.status}`);
    }

    const [productData, descriptionData] = await Promise.all([
      productResponse.json(),
      descriptionResponse.json()
    ]);

    if (!productData.success) {
      throw new Error(productData.message || 'Failed to fetch product data');
    }

    let productDescription = '';
    if (descriptionData.success) {
      productDescription = descriptionData.data;
    }

    const transformedProduct = transformApiData(productData.data);
    return { product: transformedProduct, productDescription };
  } catch (err) {
    console.error('Error fetching product data:', err);
    throw err;
  }
}

async function fetchPriceData(productId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/get-product-price?product_id=${productId}&product_qty=1`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.error('Price API Error:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Price fetch error:', error);
    return null;
  }
}

function transformApiData(apiData) {
  const media = [];

  if (apiData.product_image && apiData.product_image.length > 0) {
    apiData.product_image.forEach((img) => {
      media.push({
        type: 'image',
        url: img.ImageLink,
        thumbnail: img.ImageLink
      });
    });
  }

  if (apiData.has_video) {
    media.push({
      type: 'video',
      url: apiData.has_video,
      thumbnail: apiData.display_image || (apiData.product_image && apiData.product_image[0]?.ImageLink)
    });
  }

  const specifications = {};
  if (apiData.product_specification && apiData.product_specification.length > 0) {
    apiData.product_specification.forEach(spec => {
      specifications[spec.PropertyName] = spec.PropertyValue;
    });
  }

  const bulkPricing = apiData.bulk_price && apiData.bulk_price.length > 0
    ? apiData.bulk_price.map(bulk => ({
        from: bulk.min_qty || 0,
        to: bulk.max_qty || 999,
        price: parseFloat(bulk.price || 0)
      }))
    : [
        { from: 20, to: 49, price: parseFloat(apiData.display_min_price) * 0.95 },
        { from: 50, to: 99, price: parseFloat(apiData.display_min_price) * 0.90 }
      ];

  return {
    id: apiData.product_id,
    store_id: apiData.store_id,
    name: apiData.product_name || apiData.product?.ProductName,
    media: media,
    productImages: apiData.product_image ? apiData.product_image.map(img => img.ImageLink) : [],
    rating: parseFloat(apiData.feedback_rating?.avg_rate || 0),
    reviews: parseInt(apiData.feedback_rating?.total_feedback || 0),
    orders: parseInt(apiData.saleCount || 0),
    priceDetails: {
      mrp: parseFloat(apiData.display_min_mrp || 0),
      price: parseFloat(apiData.display_min_price || 0),
      finalPrice: parseFloat(apiData.display_min_price_with_tax || apiData.display_min_price || 0),
    },
    bulkPricing: bulkPricing,
    seller: apiData.business_detail?.CompanyName || 'Unknown Seller',
    positiveSentiment: 95,
    followers: 1200,
    shippingInfo: {
      Replacement: apiData.product?.product_return_period || '7 Days',
      Processing: apiData.product?.ProcessingTimeInDays ? `${apiData.product.ProcessingTimeInDays} days` : '15 days',
      Shipping: apiData.product?.shipping_template?.shipping_days ? `${apiData.product.shipping_template.shipping_days} days` : '4 days',
      Seller: apiData.business_detail?.state_detail?.name || 'India',
      Warranty: apiData.product?.HasWarranty === 'Yes' ? 'Available' : 'No',
    },
    stock: parseInt(apiData.stock || 0),
    codAvailable: apiData.isCOD === 1,
    specifications: specifications,
    productSpecifications: apiData.product_specification || [],
    feedbackRating: apiData.feedback_rating || {},
    description: apiData.short_desc || '',
    colors: apiData.product_color ? apiData.product_color.map(color => ({
      id: color.product_variation_colorid,
      name: color.color,
      image: color.image
    })) : [],
    discount_percentage: parseInt(apiData.discount_percentage || 0),
    refundPolicy: apiData.product?.refund_policy_template || 'No refund policy available',
    relatedProducts: []
  };
}

function getSavePercentage(priceData, product) {
  if (priceData && priceData.save_percentage) {
    return Math.round(priceData.save_percentage);
  }
  const { mrp, finalPrice } = product.priceDetails;
  if (mrp && finalPrice) {
    return Math.round(((mrp - finalPrice) / mrp) * 100);
  }
  return product.discount_percentage || 0;
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-lg sm:text-xl text-red-600 mb-4">Product ID not found</div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  try {
    const { product, productDescription } = await fetchProductData(id);
    const priceData = await fetchPriceData(id);

    return (
      <div className="bg-gray-100 py-1 sm:py-2 md:py-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28 mx-auto">
        <div className="max-w-6xl mx-auto px-2 sm:px-3 md:px-4 lg:px-8">

          {/* Main Product Section */}
          <div className="bg-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg shadow-sm flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* Left: Product Gallery */}
            <ProductGallery product={product} />

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-3 mt-1 sm:mt-2">
              <div className="flex items-start justify-between">
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 leading-tight flex-1 pr-1 sm:pr-2">{product.name}</h1>
                <button
                  className="p-1.5 sm:p-2 rounded hover:bg-gray-100 text-orange-500 border border-gray-200 flex-shrink-0"
                  aria-label="Share product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="18" cy="5" r="2" fill="currentColor" />
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="18" cy="19" r="2" fill="currentColor" />
                    <line x1="8" y1="12" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="12" x2="16" y2="19" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center flex-wrap gap-x-2 sm:gap-x-3 gap-y-0.5 sm:gap-y-1 text-gray-600">
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-[8px] sm:text-[10px] md:text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                  ))}
                </span>
                <span className="text-[10px] sm:text-xs">{product.rating} ({product.reviews} feedbacks)</span>
                <span className="text-[10px] sm:text-xs">{product.orders} orders</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-md flex-1 w-full">
                  {priceData ? (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="line-through text-gray-500 text-xs sm:text-sm">MRP: ₹{priceData.mrp}</span>
                        <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Save {Math.round(priceData.save_percentage)}%</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-orange-600">Price: ₹{priceData.sale_price ? parseFloat(priceData.sale_price.replace('INR ', '')).toFixed(2) : 'N/A'}</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">(Exclusive of all taxes)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-red-600">₹{priceData.sale_price_with_tax ? parseFloat(priceData.sale_price_with_tax.replace('INR ', '')).toFixed(2) : 'N/A'} / Piece</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">(Inclusive of all taxes)</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="line-through text-gray-500 text-xs sm:text-sm">MRP: ₹{product.priceDetails.mrp.toFixed(2)}</span>
                        <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Save {getSavePercentage(priceData, product)}%</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-orange-600">Price: ₹{product.priceDetails.price.toFixed(2)}</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">(Exclusive of all taxes)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-red-600">₹{product.priceDetails.finalPrice.toFixed(2)} / Piece</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">(Inclusive of all taxes)</span>
                      </div>
                    </div>
                  )}
                </div>

                <BulkPriceButton product={product} priceData={priceData} />
              </div>

              <div className="flex gap-2 sm:gap-3 text-center text-xs sm:text-sm border-y py-2.5 sm:py-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-5 md:gap-1">
                {[{
                  icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696a8.25 8.25 0 00-11.664 0l-3.181 3.183",
                  title: "Replacement",
                  value: product.shippingInfo.Replacement,
                  color: "orange"
                }, {
                  icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Processing",
                  value: product.shippingInfo.Processing,
                  color: "blue"
                }, {
                  icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-9l5.25-5.25h9l5.25 5.25m-17.25 0h17.25",
                  title: "Shipping",
                  value: product.shippingInfo.Shipping,
                  color: "yellow"
                }, {
                  icon: "M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H10.5a2.25 2.25 0 00-2.25 2.25V21M3 3h18M5.25 3v18m13.5-18v18M9 6.75h6.375a.75.75 0 01.75.75v3.375a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75z",
                  title: "Seller",
                  value: product.shippingInfo.Seller,
                  color: "orange"
                }, {
                  icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z",
                  title: "Warranty",
                  value: product.shippingInfo.Warranty,
                  color: "green"
                }
                ].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-20 sm:w-24 md:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 mx-auto text-${item.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <div className={`font-semibold text-${item.color}-500 mt-1 text-[10px] sm:text-xs`}>{item.title}</div>
                    <div className="text-gray-600 text-[10px] sm:text-xs">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Two-column layout starts here */}
              <div className="flex flex-col xl:flex-row gap-4 sm:gap-5">
                {/* Left Column */}
                <div className="w-full">
                  <ProductInteractive product={product} initialPriceData={priceData} productId={id} />
                </div>

                <SellerInfo product={product} />
              </div>

              <ProductPolicies product={product} />
            </div>
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} productDescription={productDescription} />

        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-lg sm:text-xl text-red-600 mb-4">Error: {error.message || 'Product not found'}</div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Go Back Home
        </button>
      </div>
    );
  }
}