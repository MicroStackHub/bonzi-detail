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
    <div className="bg-gray-100 py-0 sm:py-4 md:py-6 pt-16 sm:pt-24 md:pt-28 lg:pt-32 mx-auto">
      <div className="w-full sm:max-w-7xl sm:mx-auto px-0 sm:px-4 md:px-6 lg:px-10">

        {/* Main Product Section */}
        <div className="bg-white p-2 sm:p-5 md:p-6 lg:p-8 rounded-none sm:rounded-xl shadow-none sm:shadow-md flex flex-col lg:flex-row gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Left: Product Gallery */}
          <ProductGallery product={product} selectedColorImage={selectedColorImage} />

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-2 sm:gap-4 md:gap-4 lg:gap-5 mt-1 sm:mt-3">
            <div className="flex items-start justify-between">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 leading-tight flex-1 pr-1 sm:pr-2">{product.name}</h1>
              <ShareButton />
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

            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-5 rounded-md sm:rounded-lg flex-1 w-full">
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

            <div className="flex gap-2 sm:gap-4 text-center text-xs sm:text-sm border-y py-3 sm:py-5 overflow-x-auto scrollbar-hide md:grid md:grid-cols-5 md:gap-2">
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
            <div className="flex flex-col xl:flex-row gap-3 sm:gap-6">
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