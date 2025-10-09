'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProductInteractive({ product, initialPriceData, productId, onColorChange }) {
  const [quantity, setQuantity] = useState(1);
  const [showBulkPrice, setShowBulkPrice] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceData, setPriceData] = useState(initialPriceData);
  const [priceLoading, setPriceLoading] = useState(false);
  const stock = priceData?.stock ?? product.stock ?? 0;

  // Fetch price data when quantity changes
  const fetchPriceData = async (qty) => {
    if (!productId) return;
    
    try {
      setPriceLoading(true);
      
      // Prepare request body, only include color_id if it's actually selected
      const requestBody = {
        product_id: parseInt(productId),
        product_qty: qty,
        bulk_price: true
      };

      // Only add color_id if a color is actually selected
      if (selectedColor && selectedColor !== "") {
        requestBody.color_id = selectedColor;
      }
      
      // Try POST method first (as per API documentation)
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/get-product-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // If POST fails with 405, fallback to GET method
      if (!response.ok && response.status === 405) {
        console.log('POST method not supported, falling back to GET');
        const colorParam = selectedColor && selectedColor !== "" ? `&color_id=${selectedColor}` : "";
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/get-product-price?product_id=${productId}&product_qty=${qty}${colorParam}&bulk_price=true`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setPriceData(data.data);
        // Update the maximum quantity based on stock from API response
        if (data.data.stock && qty > data.data.stock) {
          setQuantity(Math.min(qty, data.data.stock));
          toast.warning(`Maximum available quantity is ${data.data.stock}`);
        }
      } else {
        console.error('Price API Error:', data.message);
        // Don't show toast for stock limit exceeded as it's expected behavior
        if (!data.message.toLowerCase().includes('stock limit exceeded')) {
          toast.error(data.message || 'Failed to update price');
        }
      }
    } catch (error) {
      console.error('Price fetch error:', error);
      toast.error('Failed to update price');
    } finally {
      setPriceLoading(false);
    }
  };

  const handleQuantityChange = (amount) => {
    const currentStock = priceData?.stock || product.stock || 999;
    const newQuantity = Math.max(1, Math.min(currentStock, quantity + amount));
    
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
      // Fetch updated price data for new quantity
      fetchPriceData(newQuantity);
    } else if (quantity + amount > currentStock) {
      toast.warning(`Maximum available quantity is ${currentStock}`);
    }
  };

  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    
    // Allow empty string during typing
    if (value === '') {
      setQuantity('');
      return;
    }
    
    const numValue = parseInt(value);
    
    // If it's not a valid number, don't update
    if (isNaN(numValue)) {
      return;
    }
    
    const currentStock = priceData?.stock || product.stock || 999;
    
    // Allow typing but validate on blur or when complete
    if (numValue >= 1 && numValue <= currentStock) {
      setQuantity(numValue);
      fetchPriceData(numValue);
    } else if (numValue > currentStock) {
      setQuantity(currentStock);
      fetchPriceData(currentStock);
      toast.warning(`Maximum available quantity is ${currentStock}`);
    } else if (numValue < 1) {
      setQuantity(1);
      fetchPriceData(1);
    }
  };

  const handleQuantityBlur = (e) => {
    // Ensure we have a valid number when user finishes typing
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
      fetchPriceData(1);
    }
  };

  const handleAddToCart = async () => {
    try {
      // Bearer token to save in localStorage
      const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjBjMTIwZS0zY2IwLTQ3OGMtOTY0Yi1hM2ZhZmFjMDFhNGIiLCJqdGkiOiJhNGQzOWM5NjEyZjNkMjBiNDMwOThiNmZjNmMwZGY4ZWU5ZGQ2OTk0ZWFiMjVjOGQ2Y2Y3YWViYWE5MmY5NzY4ZjZhZDI0MzNlZmQ5M2FmOSIsImlhdCI6MTc2MDAxODg4OS45MDI2NDEsIm5iZiI6MTc2MDAxODg4OS45MDI2NDQsImV4cCI6MTc5MTU1NDg4OS44NjYwNTgsInN1YiI6IjUiLCJzY29wZXMiOlsiKiJdfQ.Jz0-usKv6r92872cz71UvFbU75Ah0GZEo8RqCts6JmVdnAn5FXU-kWePf8ldB9hMqHvQJfgAFzRjKUDEMqBOo684ISIGVmhdO5b51r4oWLMrHWdpJnPB9MX4UJzVyfgRl0CfgitJcCgsqIVgwl1FdIhVfcKkCptaSEzITgdyhLqCMIys_CaU6CXcGPbO2usSEVGJTDAVCc_1KGXKvnyHTj29ZPcM09EHJR-9hD8OtCUmBuU3CYnhEgHCzkfSuost-5ropuSJ51QmKdVYHMQFINRCIZILzuk-hBXaCCvdsh0dFc7ELZ4K_qFE2SYX9AuZVrlR9qgItMkLxaSI6m_ZC3nRKGqLDRDv5Lf85u1liLoEoWMl6VlUz5hSVfyHBikoXMKZja81Zv1AJZ67Xb5cOQUDyc4ozHim2rmoEKAd0YBaPdfgxbLicD6uS5c0Je9GSc9wc381Zy6hOTNFArneU3ydZ4C2SKIyatqMjRxUETpgDL1qeeDtS15ZbXRaHBZqGzBXaub2EHMnVQV81akgiR054XPUViHcf-sbVdzUI-gZF_5JeKIyKuS1fWwxfbNONPTGQFo1FFJyeKsnBG-LHAitAfxBvikkXf0kyUwC2q6XkKie31mUDS46IvU0XrNtrpKn7drV6WEFCpeMuh7OIX1WVsM6KuxeF4WdLF8s6B8';
      
      // Save token to localStorage
      localStorage.setItem('bearerToken', bearerToken);

      const payload = {
        product_id: parseInt(productId),
        product_qty: quantity,
        color_id: selectedColor || "",
        size_id: ""
      };

      const response = await fetch('https://api.glst.in/api/v3/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Product added to cart successfully!');
        // Trigger a custom event to update cart count in header
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        toast.error(data.message || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again later.');
    }
  };

  const getColorCode = (colorName) => {
    const colorMap = {
      'red': '#FF0000', 'blue': '#0000FF', 'green': '#008000', 'yellow': '#FFFF00',
      'black': '#000000', 'white': '#FFFFFF', 'gray': '#808080', 'grey': '#808080',
      'purple': '#800080', 'pink': '#FFC0CB', 'orange': '#FFA500', 'brown': '#A52A2A',
      'navy': '#000080', 'silver': '#C0C0C0', 'gold': '#FFD700', 'maroon': '#800000',
      'beige': '#F5F5DC', 'cream': '#FFFDD0', 'olive': '#808000', 'lightblue': '#ADD8E6',
      'darkblue': '#00008B', 'lightgreen': '#90EE90', 'darkgreen': '#006400',
      'violet': '#EE82EE', 'magenta': '#FF00FF', 'cyan': '#00FFFF', 'teal': '#008080',
      'indigo': '#4B0082', 'coral': '#FF7F50', 'default': '#FFFFFF'
    };
    
    const normalizedColor = colorName.toLowerCase().trim();
    return colorMap[normalizedColor] || colorMap['default'];
  };

  return (
    <div className="space-y-3 text-xs sm:text-sm">
      {/* Color */}
      {product.colors && Array.isArray(product.colors) && product.colors.length > 0 && (
        <div className="flex items-start gap-3">
          <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">Color:</span>
          <div className="flex flex-wrap gap-2 sm:gap-2 overflow-x-auto">
            {product.colors.map((color) => (
              <button 
                key={color.id} 
                className={`w-10 h-10 rounded border-2 flex items-center justify-center relative overflow-hidden ${
                  selectedColor === color.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-300 hover:border-orange-300'
                }`}                
                onClick={() => {
                  setSelectedColor(color.id);
                  // Fetch updated price data for selected color
                  fetchPriceData(quantity);
                  // Notify parent component about color change
                  if (onColorChange && color.image) {
                    onColorChange(color.image);
                  }
                }}
                aria-label={`Select ${color.name} color`}
                title={color.name}
              >
                {color.image ? (
                  <img 
                    src={color.image} 
                    alt={color.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-md"
                    style={{
                      backgroundColor: getColorCode(color.name)
                    }}
                  />
                )}
                {selectedColor === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      {stock > 0 ? (
      <div className="flex items-start gap-4">
        <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">Quantity:</span>
        <div className="flex flex-col items-start">
          <div className="flex items-center border border-gray-200 rounded overflow-hidden">
            <button 
              className="w-9 h-9 max-[360px]:w-8 max-[360px]:h-8 bg-red-500 text-white font-bold flex items-center justify-center border-none rounded-none hover:bg-red-600 transition-colors duration-150"
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInputChange}
              onBlur={handleQuantityBlur}
              min="1"
              max={stock}
              className="w-12 h-9 max-[360px]:w-11 max-[360px]:h-8 text-center font-semibold border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              className="w-9 h-9 max-[360px]:w-8 max-[360px]:h-8 bg-green-500 text-white font-bold flex items-center justify-center border-none rounded-none hover:bg-green-600 transition-colors duration-150"
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <span className="text-green-600 text-[10px] sm:text-xs mt-1">
            ({stock} pieces available)
            {priceData?.stock_invalid && (
              <span className="text-red-500 ml-1">⚠️ Stock limit exceeded</span>
            )}
          </span>
        </div>
      </div>
      ) : (
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-500 w-20 flex-shrink-0">Quantity:</span>
        <span className="text-red-500 font-semibold">Out of Stock</span>
      </div>
      )}

      {/* COD */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">COD:</span>
        <span className={`font-bold text-xs ${product.codAvailable ? 'text-green-600' : 'text-gray-700'}`}>
          {product.codAvailable ? 'Available' : 'Not Available'}
        </span>
      </div>

      {/* Total Price */}
      <div className="flex items-start gap-4">
        <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">Total Price:</span>
        {/* Keep price visible while fetching to avoid layout shift */}
        <div className="relative">
          {priceLoading && (
            <div className="absolute inset-0 bg-gray-200/60 animate-pulse rounded"></div>
          )}
          <div className={`flex flex-col gap-1 ${priceLoading ? 'opacity-50' : ''}`}>
            {priceData ? (
              <div className="text-green-600 font-bold text-xl">
                ₹{priceData.total_sale_price_with_tax ? priceData.total_sale_price_with_tax.replace('INR ', '') : (priceData.total_sale_price || 0).toFixed(2)}
                <span className="text-gray-600 font-normal text-xs ml-1">(incl. tax)</span>
              </div>
            ) : (
              <div className="text-green-600 font-extrabold text-xl">
                ₹{(product.priceDetails.finalPrice * quantity).toFixed(2)}
                <span className="text-gray-600 font-normal text-xs ml-1">(incl. tax)</span>
              </div>
            )}
            {/* Bulk pricing notice */}
            {priceData?.bulk_price && priceData.bulk_price.length > 0 && quantity >= priceData.bulk_price[0].bulk_price_from && (
              <div className="text-xs text-orange-600 font-medium">
                🎉 Bulk pricing applied!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">Action:</span>
        {stock > 0 ? (
          <div className="flex items-center gap-2">
            <button 
              className="px-3 py-1.5 bg-orange-500 text-white font-semibold text-[11px] rounded hover:bg-orange-600 transition cursor-pointer shadow-sm"
              aria-label="Buy this product now"
            >
              Buy Now
            </button>
            <button 
              className="px-3 py-1.5 bg-white border border-orange-500 text-orange-500 font-semibold text-[11px] rounded hover:bg-orange-50 transition cursor-pointer shadow-sm"
              onClick={handleAddToCart}
              aria-label="Add this product to cart"
            >
              Add To Cart
            </button>
            <button 
              className="w-8 h-8 border border-gray-300 text-orange-500 hover:text-orange-600 hover:border-orange-500 text-lg flex items-center justify-center transition cursor-pointer rounded shadow-sm"
              aria-label="Add to wishlist"
            >
              ♡
            </button>
          </div>
        ) : (
          <span className="text-red-500 font-semibold text-sm">Out of Stock</span>
        )}
      </div>

      {/* Promotions */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-500 w-20 max-[360px]:w-16 max-[360px]:text-[11px] flex-shrink-0">Promotions:</span>
        <button 
          className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 sm:px-2 sm:py-2 rounded-lg shadow-sm flex items-center gap-1.5 sm:gap-2 text-xs hover:bg-gray-200 w-fit"
          aria-label="View available seller coupons"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          Get Seller Coupons
        </button>
      </div>

      {/* Bulk pricing info */}
      {(priceData?.bulk_price?.length > 0 || product?.bulkPricing?.length > 0) && stock > 0 && (
        <div className="text-sm sm:text-base font-semibold text-orange-600">
         buy in bulk? <a href="#" className="underline font-semibold"> bulk pricing options</a>
        </div>
      )}
    </div>
  );
}