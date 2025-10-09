

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
    // Use GET method for server-side initial load
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/get-product-price?product_id=${productId}&product_qty=1&bulk_price=true`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return { data: data.data, warning: null };
    } else {
      console.error('Price API Error:', data.message);
      // If stock limit exceeded, return a warning so the client can surface a toast
      if (data.message && data.message.toLowerCase().includes('stock limit exceeded')) {
        console.log('Stock limit exceeded for initial load, will use product default pricing');
        return { data: null, warning: data.message };
      }
      return { data: null, warning: null };
    }
  } catch (error) {
    console.error('Price fetch error:', error);
    return { data: null, warning: null };
  }
}

function transformApiData(apiData) {
  const media = [];

  // Utility to canonicalize URLs/paths for deduplication
  const canonicalize = (u) => {
    if (!u || typeof u !== 'string') return '';
    try {
      if (u.startsWith('http')) {
        const parsed = new URL(u);
        return (parsed.origin + parsed.pathname).toLowerCase();
      }
    } catch (e) {
      // ignore
    }
    // strip query params if any and normalize
    return u.split('?')[0].toLowerCase();
  };

  const seen = new Set();

  // Add video first if available (use thumbnail if provided)
  if (apiData.has_video) {
    const url = apiData.has_video;
    const key = canonicalize(url);
    if (url && !seen.has(key)) {
      media.push({
        type: 'video',
        url,
        thumbnail: apiData.display_image || (apiData.product_image && apiData.product_image[0]?.ImageLink)
      });
      seen.add(key);
    }
  }

  // Then add images (product_image)
  if (apiData.product_image && apiData.product_image.length > 0) {
    apiData.product_image.forEach((img) => {
      const url = img.ImageLink;
      const key = canonicalize(url);
      if (url && !seen.has(key)) {
        media.push({ type: 'image', url, thumbnail: url });
        seen.add(key);
      }
    });
  }

  // Include color variant images in the media list (deduplicate)
  if (apiData.product_color && apiData.product_color.length > 0) {
    apiData.product_color.forEach((c) => {
      const url = c.image;
      const key = canonicalize(url);
      if (url && !seen.has(key)) {
        media.push({ type: 'image', url, thumbnail: url });
        seen.add(key);
      }
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

export { fetchProductData, fetchPriceData, transformApiData, getSavePercentage };