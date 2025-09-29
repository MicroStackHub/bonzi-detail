import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import ContactSellerModal from '../../components/ContactSellerModal';
import ProductTabs from '../../components/product/ProductTabs';
import { useCart } from '../../contexts/CartContext';

import RelatedProducts from '../../components/product/RelatedProducts';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [feedbackSubTab, setFeedbackSubTab] = useState('product');
  const [quantity, setQuantity] = useState(1);
  const [showBulkPrice, setShowBulkPrice] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart, cartLoading } = useCart();

  // Store access token in localStorage
  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
    localStorage.setItem('access_token', accessToken);
  }, []);

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      
      // Fetch product details
      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/product?product_id=${id}`);
      const productData = await productResponse.json();
      
      if (!productData.success) {
        throw new Error(productData.message || 'Failed to fetch product data');
      }

      // Fetch product description
      const descriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product-description/${id}`);
      const descriptionData = await descriptionResponse.json();

      if (descriptionData.success) {
        setProductDescription(descriptionData.data);
      }

      // Transform API data to match component structure
      const transformedProduct = transformApiData(productData.data);
      setProduct(transformedProduct);
      
      // Set initial selected media
      if (transformedProduct.media && Array.isArray(transformedProduct.media) && transformedProduct.media.length > 0) {
        setSelectedMedia(transformedProduct.media[0]);
      }

      // Fetch initial price data with quantity 1
      await fetchPriceData(1);

    } catch (err) {
      setError(err.message);
      console.error('Error fetching product data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceData = async (qty = quantity) => {
    if (!id) return;
    
    try {
      setPriceLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/get-product-price?product_id=${id}&product_qty=${qty}`);
      const data = await response.json();
      
      if (data.success) {
        setPriceData(data.data);
      } else {
        console.error('Price API Error:', data.message);
        toast.error('Failed to load price information');
      }
    } catch (error) {
      console.error('Price fetch error:', error);
      toast.error('Failed to load price information');
    } finally {
      setPriceLoading(false);
    }
  };

  const transformApiData = (apiData) => {
    // Transform API data structure to match existing component expectations
    const media = [];
    
    // Add product images as media
    if (apiData.product_image && apiData.product_image.length > 0) {
      apiData.product_image.forEach((img, index) => {
        media.push({
          type: 'image',
          url: img.ImageLink,
          thumbnail: img.ImageLink
        });
      });
    }

    // Create specifications object
    const specifications = {};
    if (apiData.product_specification && apiData.product_specification.length > 0) {
      apiData.product_specification.forEach(spec => {
        specifications[spec.PropertyName] = spec.PropertyValue;
      });
    }

    // Calculate bulk pricing from API data
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
      name: apiData.product_name,
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
      positiveSentiment: 95, // Default value since not in API
      followers: 1200, // Default value since not in API
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
      relatedProducts: [] // This would need a separate API call for related products
    };
  };

  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Loading Product... | BonziCart</title>
        </Head>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <div className="text-sm sm:text-lg ml-3">Loading product details...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Head>
          <title>Error | BonziCart</title>
        </Head>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-sm sm:text-lg text-red-600">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Head>
          <title>Product Not Found | BonziCart</title>
        </Head>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-sm sm:text-lg">Product not found</div>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, Math.min(product.stock || 999, quantity + amount));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!product || !product.id) return;

    const result = await addToCart(
      product.id,
      quantity,
      selectedColor,
      selectedSize
    );

    if (result.success) {
      toast.success('Product added to cart successfully!');
    } else {
      toast.error(`Failed to add to cart: ${result.message}`);
    }
  };

  const handleVisitStore = () => {
    if (product && product.store_id) {
      window.open(`https://www.bonzicart.com/store?store=${product.store_id}`, '_blank');
    }
  };

  const handleFollowToggle = async () => {
    if (!product || !product.store_id) return;
    
    setIsFollowLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('https://api.glst.in/api/v1/store/follow-unfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          store_id: product.store_id,
          status: !isFollowing // Toggle the current status
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsFollowing(!isFollowing);
        // Optional: Show success message
        console.log(data.message || 'Follow status updated successfully');
      } else {
        console.error('API Error:', data.message);
        toast.error(`Failed to ${!isFollowing ? 'follow' : 'unfollow'} seller: ${data.message}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsFollowLoading(false);
    }
  };

  const getSavePercentage = () => {
    const { mrp, finalPrice } = product.priceDetails;
    if (mrp && finalPrice) {
      return Math.round(((mrp - finalPrice) / mrp) * 100);
    }
    return product.discount_percentage || 0;
  };

  return (
    <>
      <Head>
        <title>{product.name} | BonziCart</title>
        <meta name="description" content={product.description || `Buy ${product.name} at best price from ${product.seller}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.media && Array.isArray(product.media) && product.media[0]?.url} />
        <meta property="og:type" content="product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://bonzicart.com/product/${id}`} />
      </Head>

      <Layout>
        <div className="bg-gray-100 py-1 sm:py-2 md:py-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28 mx-auto">
          <div className="max-w-6xl mx-auto px-1 sm:px-2 md:px-4 lg:px-8">
            
            {/* Main Product Section */}
            <div className="bg-white p-1 sm:p-2 md:p-3 lg:p-4 rounded-lg shadow-sm flex flex-col lg:flex-row gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {/* Left: Product Gallery */}
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                <div className="w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md aspect-square bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden mb-1 sm:mb-2 md:mb-3 relative">
                  {selectedMedia ? (
                    selectedMedia.type === 'video' ? (
                      <video src={selectedMedia.url} controls autoPlay muted loop className="w-full h-full object-contain" />
                    ) : (
                      <Image 
                        src={selectedMedia.url} 
                        alt={product.name} 
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                        priority
                        quality={75}
                      />
                    )
                  ) : (
                    <div className="text-gray-400 text-xs sm:text-sm">No image available</div>
                  )}
                  
                  {/* Share Button */}
                  <button
                    className="absolute top-2 right-2 p-2 sm:p-1.5 rounded hover:bg-gray-100 text-orange-500 border border-gray-200 bg-white shadow-sm"
                    aria-label="Share product"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: product.description,
                          url: window.location.href
                        });
                      } else {
                        alert('Sharing is not supported on this browser.');
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-1 sm:gap-1.5 justify-start overflow-x-auto w-full py-0.5 sm:py-1 px-0.5 sm:px-1 scrollbar-hide -mx-0.5 sm:-mx-1 px-0.5 sm:px-1">
                  {product.media && product.media.length > 0 && product.media.map((media, idx) => (
                    <button
                      key={idx}
                      className={`border-2 rounded-lg w-8 h-8 sm:w-10 md:w-14 lg:w-16 flex items-center justify-center overflow-hidden flex-shrink-0 ${selectedMedia && selectedMedia.url === media.url ? 'border-orange-500' : 'border-gray-200'}`}
                      onClick={() => setSelectedMedia(media)}
                      aria-label={`View ${media.type === 'video' ? 'video' : 'image'} ${idx + 1} of ${product.media.length}`}
                    >
                      {media.type === 'video' ? (
                        <Image 
                          src={media.thumbnail} 
                          alt="Video thumbnail" 
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image 
                          src={media.url} 
                          alt="Thumbnail" 
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="w-full lg:w-1/2 flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mt-0.5 sm:mt-1">
                <div className="flex items-start justify-between">
                  <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 leading-tight flex-1 pr-1 sm:pr-2">{product.name}</h1>
                  <button
                    className="p-1.5 sm:p-2 rounded hover:bg-gray-100 text-orange-500 border border-gray-200 flex-shrink-0"
                    aria-label="Share product"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: product.description,
                          url: window.location.href
                        });
                      } else {
                        alert('Sharing is not supported on this browser.');
                      }
                    }}
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
                  <span className="text-[8px] sm:text-[10px] md:text-xs">{product.rating} ({product.reviews} feedbacks)</span>
                  <span className="text-[8px] sm:text-[10px] md:text-xs">{product.orders} orders</span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5">
                  <div className="bg-gray-50 p-2.5 rounded-md flex-1 w-full">
                    {priceLoading ? (
                      <div className="flex items-center justify-center h-16">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                      </div>
                    ) : priceData ? (
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                          <span className="line-through text-gray-500 text-xs sm:text-sm">MRP: ₹{priceData.mrp}</span>
                          <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Save {priceData.save_percentage}%</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-base sm:text-lg md:text-xl font-bold text-orange-600">Price: ₹{priceData.sale_price ? parseFloat(priceData.sale_price.replace('INR ', '')).toFixed(2) : 'N/A'}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">(Exclusive of all taxes)</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-sm sm:text-base font-bold text-red-600">₹{priceData.sale_price_with_tax ? parseFloat(priceData.sale_price_with_tax.replace('INR ', '')).toFixed(2) : 'N/A'} / Piece</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">(Inclusive of all taxes)</span>
                        </div>
                        {priceData.stock < 10 && (
                          <div className="text-xs text-red-600 mt-1.5 font-semibold">
                            Only {priceData.stock} left in stock!
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                          <span className="line-through text-gray-500 text-xs sm:text-sm">MRP: ₹{product.priceDetails.mrp.toFixed(2)}</span>
                          <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Save {getSavePercentage()}%</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-base sm:text-lg md:text-xl font-bold text-orange-600">Price: ₹{product.priceDetails.price.toFixed(2)}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">(Exclusive of all taxes)</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-sm sm:text-base font-bold text-red-600">₹{product.priceDetails.finalPrice.toFixed(2)} / Piece</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">(Inclusive of all taxes)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className="relative w-full sm:w-auto"
                    onMouseEnter={() => setShowBulkPrice(true)}
                    onMouseLeave={() => setShowBulkPrice(false)}
                  >
                    <button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors duration-200 text-xs sm:text-sm w-full"
                      aria-label="View bulk pricing options"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Bulk Price
                    </button>
                    {showBulkPrice && (
                      <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white border rounded-lg shadow-lg z-10 p-3">
                        <h4 className="font-bold text-xs sm:text-sm mb-2 text-gray-900">Seller Bulk Price Details:</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px] sm:text-xs text-left text-black">
                              <thead className="bg-gray-100">
                                  <tr>
                                      <th className="p-1.5 sm:p-2 font-semibold text-black text-[10px] sm:text-xs">From</th>
                                      <th className="p-1.5 sm:p-2 font-semibold text-black text-[10px] sm:text-xs">To</th>
                                      <th className="p-1.5 sm:p-2 font-semibold text-black text-[10px] sm:text-xs">Bulk Price (₹)</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {(priceData?.bulk_price || product.bulkPricing).map((tier, index) => (
                                      <tr key={index} className="border-b">
                                          <td className="p-1.5 sm:p-2 text-black text-[10px] sm:text-xs">{tier.bulk_price_from || tier.from}</td>
                                          <td className="p-1.5 sm:p-2 text-black text-[10px] sm:text-xs">{tier.bulk_price_to || tier.to}</td>
                                          <td className="p-1.5 sm:p-2 text-black text-[10px] sm:text-xs">₹ {tier.bulk_price_amount || tier.price}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                        </div>
                        <p className="text-[10px] sm:text-xs text-black mt-2">
                            <strong>Note:</strong> Once you adjust the quantity in BonziCart, the price will automatically update according to the bulk pricing offer by seller. BonziCart always suggests purchasing in bulk under a business name with a registered GST number to avail the GST benefits.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 text-center text-xs border-y py-2.5 overflow-x-auto scrollbar-hide md:grid md:grid-cols-5 md:gap-1">
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
                <div className="flex flex-col xl:flex-row gap-3 sm:gap-4">
                  {/* Left Column */}
                  <div className="w-full">
                    <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-3 text-xs sm:text-sm">
                      {/* Color - Only show if colors exist and are not just 'Default' */}
                      {product.colors && Array.isArray(product.colors) && product.colors.length > 0 && (
                        <>
                          <span className="font-medium text-gray-500">Color</span>
                          <div className="flex flex-wrap gap-2 sm:gap-2.5 overflow-x-auto">
                            {product.colors.map((color) => (
                              <button 
                                key={color.id} 
                                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gray-100 rounded border text-gray-700 hover:bg-orange-100 text-xs sm:text-sm flex-shrink-0 ${
                                  selectedColor === color.id ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-200' : 'border-gray-300'
                                }`}
                                onClick={() => {
                                  setSelectedColor(color.id);
                                  if (color.image) {
                                    setSelectedMedia({ type: 'image', url: color.image, thumbnail: color.image });
                                  }
                                }}
                                aria-label={`Select ${color.name} color`}
                              >
                                {color.name}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Quantity */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">Quantity</span>
                      <div className="flex flex-wrap items-center">
                        <div className="flex items-center">
                          <button 
                            className="px-2.5 sm:px-3 py-1.5 bg-gray-200 text-black rounded-l text-xs sm:text-sm" 
                            onClick={() => handleQuantityChange(-1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-4 sm:px-5 py-1.5 border-t border-b text-xs sm:text-sm">{quantity}</span>
                          <button 
                            className="px-2.5 sm:px-3 py-1.5 bg-gray-200 text-black rounded-r text-xs sm:text-sm" 
                            onClick={() => handleQuantityChange(1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-green-600 text-[10px] sm:text-xs ml-2 sm:ml-3">(Stock {priceData?.stock || product.stock} pieces)</span>
                      </div>

                      {/* Empty cell for alignment */}
                      <span></span> 
                      <div className="text-[10px] sm:text-xs text-orange-600">Want to buy in bulk? <a href="#" className="underline font-semibold">Learn about bulk pricing options</a></div>

                      {/* Shipping */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">Shipping</span>
                      <span className="text-green-600 font-semibold text-xs sm:text-sm">Free Shipping</span>

                      {/* COD */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">COD</span>
                      <span className="text-gray-500 font-semibold text-xs sm:text-sm">{product.codAvailable ? 'Available' : 'Not Available'}</span>

                      {/* Total Price */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">Total Price</span>
                      <div className="flex flex-col">
                        {priceData ? (
                          <div className="flex flex-col">
                            {(() => {
                              try {
                                const unitPriceWithTax = priceData.sale_price_with_tax ? parseFloat(priceData.sale_price_with_tax.replace('INR ', '')) : 0;
                                const totalPrice = (quantity * unitPriceWithTax).toFixed(2);
                                return (
                                  <>
                                    <span className="text-green-600 font-bold text-xs sm:text-sm">
                                      ₹{totalPrice} 
                                      <span className="text-gray-600 font-normal ml-1 text-[10px] sm:text-xs">(incl. tax)</span>
                                    </span>
                                  </>
                                );
                              } catch (error) {
                                return (
                                  <span className="text-green-600 font-bold text-xs sm:text-sm">
                                    ₹{(product.priceDetails.finalPrice * quantity).toFixed(2)}
                                    <span className="text-gray-600 font-normal ml-1 text-[10px] sm:text-xs">(Qty: {quantity})</span>
                                  </span>
                                );
                              }
                            })()}
                          </div>
                        ) : (
                          <span className="text-green-600 font-bold text-xs sm:text-sm">
                            ₹{(product.priceDetails.finalPrice * quantity).toFixed(2)}
                            <span className="text-gray-600 font-normal ml-1 text-[10px] sm:text-xs">(Qty: {quantity})</span>
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">Action</span>
                      <div className="flex flex-row flex-wrap gap-2.5 items-center">
                        <button 
                          className="flex-1 bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-semibold shadow hover:bg-orange-600 text-xs text-center min-w-[90px]"
                          aria-label="Buy this product now"
                        >
                          Buy Now
                        </button>
                        <button 
                          className="flex-1 bg-white border border-orange-500 text-orange-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded font-semibold shadow hover:bg-orange-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed text-center min-w-[90px]"
                          onClick={handleAddToCart}
                          disabled={cartLoading}
                          aria-label="Add this product to cart"
                        >
                          {cartLoading ? 'Adding...' : 'Add To Cart'}
                        </button>
                        <button 
                          className="text-orange-500 text-base sm:text-lg hover:text-orange-600 p-1.5"
                          aria-label="Add to wishlist"
                        >
                          ♡
                        </button>
                      </div>

                      {/* Promotions */}
                      <span className="font-medium text-gray-500 text-xs sm:text-sm">Promotions</span>
                      <button 
                        className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm flex items-center gap-1.5 sm:gap-2 text-xs hover:bg-gray-200 w-fit"
                        aria-label="View available seller coupons"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        Get Seller Coupons
                      </button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-full xl:w-64 flex flex-col gap-2 sm:gap-3">
                    <div className="p-3 md:p-4 bg-gray-50 rounded-lg flex flex-col gap-2" style={{ height: 'auto' }}>
                      <div className="text-xs sm:text-sm text-gray-600">Sold By</div>
                      <div className="font-bold text-orange-600 text-sm md:text-base">{product.seller}</div>
                      <div className="flex flex-col text-xs sm:text-sm text-gray-700 gap-1">
                        <span>{product.positiveSentiment}% Positive Sentiment</span>
                        <span>{product.followers} Followers</span>
                      </div>
                      <div className="flex flex-col gap-2 mt-1">
                        <button 
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-semibold shadow text-xs sm:text-sm"
                          onClick={() => setShowContactModal(true)}
                          aria-label="Contact the seller"
                        >
                          Contact Seller
                        </button>
                        <div className="flex flex-row gap-2">
                          <button 
                            className={`flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded shadow text-xs sm:text-sm transition-colors ${
                              isFollowing 
                                ? 'bg-red-500 text-white border border-red-500 hover:bg-red-600' 
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            } ${isFollowLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleFollowToggle}
                            disabled={isFollowLoading}
                            aria-label={isFollowing ? "Unfollow this seller" : "Follow this seller"}
                          >
                            {isFollowLoading ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                ...
                              </span>
                            ) : (
                              isFollowing ? 'Unfollow' : '+ Follow'
                            )}
                          </button>
                          <button 
                            className="flex-1 bg-white border border-gray-300 text-gray-700 px-2 py-1.5 sm:px-3 sm:py-2 rounded shadow text-xs sm:text-sm" 
                            onClick={handleVisitStore}
                            aria-label="Visit seller's store"
                          >
                            Visit Store
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-xs sm:text-sm border-t pt-2 justify-between">
                  <span className="text-orange-600 font-semibold text-xs sm:text-sm">Seller Return Policy</span>
                  <span className="text-blue-600 font-semibold text-xs sm:text-sm">Buyer Protection</span>
                </div>
              </div>
            </div>

            <ProductTabs
              product={product}
              productDescription={productDescription}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              feedbackSubTab={feedbackSubTab}
              setFeedbackSubTab={setFeedbackSubTab}
            />

            {/* <RelatedProducts relatedProducts={product.relatedProducts} /> */}

          </div>
          <ContactSellerModal open={showContactModal} onClose={() => setShowContactModal(false)} />
        </div>
      </Layout>
    </>
  );
}

// Static Generation for better performance
export async function getStaticPaths() {
  // You can pre-generate pages for popular products
  return {
    paths: [], // No pre-generated paths, will be generated on-demand
    fallback: 'blocking' // Enable ISR (Incremental Static Regeneration)
  };
}

export async function getStaticProps({ params }) {
  try {
    // Fetch product data at build time for better performance
    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/product?product_id=${params.id}`);
    const productData = await productResponse.json();
    
    if (!productData.success) {
      return {
        notFound: true,
      };
    }

    // Fetch product description
    const descriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product-description/${params.id}`);
    const descriptionData = await descriptionResponse.json();

    return {
      props: {
        productId: params.id,
        initialProductData: productData.data,
        initialDescription: descriptionData.success ? descriptionData.data : '',
      },
      revalidate: parseInt(process.env.REVALIDATION_TIME || '3600') // Use env variable for revalidation time
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
