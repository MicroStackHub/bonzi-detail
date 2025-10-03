'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProductInteractive({ product, initialPriceData, productId }) {
  const [quantity, setQuantity] = useState(1);
  const [showBulkPrice, setShowBulkPrice] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceData, setPriceData] = useState(initialPriceData);
  const [priceLoading, setPriceLoading] = useState(false);

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, Math.min(product.stock || 999, quantity + amount));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    toast.success('Product added to cart successfully!');
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
    <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-2 gap-y-3 sm:gap-y-2 text-xs sm:text-sm">
      {/* Color */}
      {product.colors && Array.isArray(product.colors) && product.colors.length > 0 && (
        <>
          <span className="font-medium text-gray-500">Color</span>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 overflow-x-auto">
            {product.colors.map((color) => (
              <button 
                key={color.id} 
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative ${
                  selectedColor === color.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-300 hover:border-orange-300'
                }`}
                style={{
                  backgroundColor: getColorCode(color.name),
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedColor(color.id);
                }}
                aria-label={`Select ${color.name} color`}
                title={color.name}
              >
                {selectedColor === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Quantity */}
      <span className="font-medium text-gray-500">Quantity</span>
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <button 
            className="px-2.5 sm:px-2 py-1.5 bg-gray-200 text-black rounded-l text-xs sm:text-sm" 
            onClick={() => handleQuantityChange(-1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 sm:px-3 py-1.5 border-t border-b text-xs sm:text-sm">{quantity}</span>
          <button 
            className="px-2.5 sm:px-3 py-1.5 bg-gray-200 text-black rounded-r text-xs sm:text-sm" 
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="text-green-600 text-[10px] sm:text-xs">({priceData?.stock || product.stock} pieces)</span>
      </div>

      {/* COD */}
      <span className="font-medium text-gray-500">COD</span>
      <span className={`font-bold text-sm ${product.codAvailable ? 'text-green-600' : 'text-gray-700'}`}>
        {product.codAvailable ? 'Available' : 'Not Available'}
      </span>

      {/* Total Price */}
      <span className="font-medium text-gray-500">Total Price</span>
      <div>
        {priceLoading ? (
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        ) : priceData ? (
          (() => {
            try {
              const unitPriceWithTax = priceData.sale_price_with_tax ? parseFloat(priceData.sale_price_with_tax.replace('INR ', '')) : 0;
              const totalPrice = (quantity * unitPriceWithTax).toFixed(2);
              return (
                <div className="text-green-600 font-bold text-base">
                  ₹{totalPrice} <span className="text-gray-600 font-normal text-xs">(incl. tax)</span>
                </div>
              );
            } catch (error) {
              return (
                <div className="text-green-600 font-bold text-base">
                  ₹{(product.priceDetails.finalPrice * quantity).toFixed(2)} <span className="text-gray-600 font-normal text-xs">(incl. tax)</span>
                </div>
              );
            }
          })()
        ) : (
          <div className="text-green-600 font-bold text-base">
            ₹{(product.priceDetails.finalPrice * quantity).toFixed(2)} <span className="text-gray-600 font-normal text-xs">(incl. tax)</span>
          </div>
        )}
      </div>

      {/* Action */}
      <span className="font-medium text-gray-500">Action</span>
      <div className="flex flex-row flex-wrap gap-2.5 items-center">
        <button 
          className="flex-1 bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-semibold shadow hover:bg-orange-600 text-xs text-center min-w-[90px]"
          aria-label="Buy this product now"
        >
          Buy Now
        </button>
        <button 
          className="flex-1 bg-white border border-orange-500 text-orange-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded font-semibold shadow hover:bg-orange-50 text-xs text-center min-w-[90px]"
          onClick={handleAddToCart}
          aria-label="Add this product to cart"
        >
          Add To Cart
        </button>
        <button 
          className="text-orange-500 text-base sm:text-lg hover:text-orange-600 p-1.5"
          aria-label="Add to wishlist"
        >
          ♡
        </button>
      </div>

      {/* Promotions */}
      <span className="font-medium text-gray-500">Promotions</span>
      <button 
        className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 sm:px-2 sm:py-2 rounded-lg shadow-sm flex items-center gap-1.5 sm:gap-2 text-xs hover:bg-gray-200 w-fit"
        aria-label="View available seller coupons"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        Get Seller Coupons
      </button>

      {/* Bulk pricing info */}
      <span></span>
      <div className="text-[10px] sm:text-[10px] text-orange-600 col-span-2">Want to buy in bulk? <a href="#" className="underline font-semibold">Learn about bulk pricing options</a></div>
    </div>
  );
}