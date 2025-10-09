'use client';

import { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInteractive from './ProductInteractive';
import SellerInfo from './SellerInfo';
import ProductTabs from './ProductTabs';
import BulkPriceButton from './BulkPriceButton';
import ProductPolicies from './ProductPolicies';
import { GoBackButton, ShareButton } from './ErrorHandlers';
import { getSavePercentage } from '../lib/fetchProduct';

export default function ProductDetail({ product, productDescription, priceData, productId, error }) {
  const [selectedColorImage, setSelectedColorImage] = useState(null);
  // Derive stock from API-like shape (priceData.stock or product.stock per product_detail.txt)
  const stock = (priceData && typeof priceData.stock === 'number') ? priceData.stock : (typeof product?.stock === 'number' ? product.stock : 0);
  const hasBulkTiers = (priceData?.bulk_price && priceData.bulk_price.length > 0) || (product?.bulkPricing && product.bulkPricing.length > 0);

  const handleColorChange = (colorImage) => {
    setSelectedColorImage(colorImage);
  };
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-lg sm:text-xl text-red-600 mb-4">Error: {error}</div>
        <GoBackButton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-lg sm:text-xl text-red-600 mb-4">Product not found</div>
        <GoBackButton />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-2 mx-auto">
      <div className="w-full sm:max-w-7xl sm:mx-auto px-0 sm:px-4 ">

        {/* Main Product Section */}
  <div className="bg-white p-2 sm:p-4 md:p-5 rounded-none sm:rounded-lg shadow-none sm:shadow-sm flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-6 max-[360px]:p-2 max-[360px]:gap-2">
          {/* Left: Product Gallery */}
          <ProductGallery product={product} selectedColorImage={selectedColorImage} />

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-2 sm:gap-3 mt-0">
            <div className="flex items-start justify-between">
              <h1 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight flex-1 pr-1">{product.name}</h1>
              <ShareButton />
            </div>

            {/* Ratings and quick stats */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-gray-600 max-[360px]:text-[11px]">
              <span className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[8px] sm:text-[10px] ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                ))}
              </span>
              <span className="text-[10px] sm:text-xs">{product.rating} ({product.reviews} feedbacks)</span>
              <span className="text-[10px] sm:text-xs">{product.orders} orders</span>
              {stock <= 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-red-100 text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price Section - Improved Layout */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">MRP:</span>
                <span className="text-lg line-through text-gray-500">
                  ₹{priceData?.product_mrp ? priceData.product_mrp.replace('INR ', '') : product.priceDetails.mrp}
                </span>
                {getSavePercentage(priceData, product) && (
                  <span className="text-sm text-green-600 font-semibold">Save {getSavePercentage(priceData, product)}%</span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-2xl font-bold text-orange-600">
                  ₹{priceData?.product_amount ? priceData.product_amount.replace('INR ', '') : product.priceDetails.price}
                </span>
                <span className="text-xs text-gray-500">(Exclusive of all taxes)</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-orange-600">
                  ₹{priceData?.product_sale_amount ? priceData.product_sale_amount.replace('INR ', '') : product.priceDetails.finalPrice}
                </span>
                <span className="text-sm text-gray-600">/ Piece</span>
                <span className="text-xs text-gray-500">(Inclusive of all taxes)</span>
              </div>

              {hasBulkTiers && stock > 0 && (
                <div className="pt-2">
                  <BulkPriceButton priceData={priceData} product={product} />
                </div>
              )}
            </div>

            {/* Shipping Info with Icons */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center">
                  <div className="text-orange-500 text-2xl mb-1">
                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Replacement</div>
                  <div className="text-xs text-gray-500">{product.replacementDays || 7} Days</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 text-2xl mb-1">
                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Processing</div>
                  <div className="text-xs text-gray-500">{product.processingDays || 3} days</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-600 text-2xl mb-1">
                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Shipping</div>
                  <div className="text-xs text-gray-500">{product.shippingDays || 12} days</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 text-2xl mb-1">
                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Seller</div>
                  <div className="text-xs text-gray-500">{product.sellerLocation || 'India'}</div>
                </div>
                <div className="text-center">
                  <div className="text-teal-500 text-2xl mb-1">
                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Warranty</div>
                  <div className="text-xs text-gray-500">{product.warrantyMonths || 6} Months</div>
                </div>
              </div>
            </div>

            {/* Two-column layout starts here */}
            <div className="flex flex-col xl:flex-row gap-2 sm:gap-4">
              {/* Left Column */}
              <div className="w-full">
                <ProductInteractive 
                  product={product} 
                  initialPriceData={priceData} 
                  productId={productId} 
                  onColorChange={handleColorChange}
                />
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
}