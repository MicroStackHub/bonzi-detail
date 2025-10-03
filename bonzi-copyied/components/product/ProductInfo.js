import React, { useState } from 'react';

const BulkPricePopover = ({ bulkPricing }) => (
  <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-10 p-3">
    <h4 className="font-bold text-sm mb-2 text-gray-900">Seller Bulk Price Details:</h4>
    <table className="w-full text-xs text-left text-black">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 font-semibold text-black">From</th>
          <th className="p-2 font-semibold text-black">To</th>
          <th className="p-2 font-semibold text-black">Bulk Price (₹)</th>
        </tr>
      </thead>
      <tbody>
        {bulkPricing.map((tier, index) => (
          <tr key={index} className="border-b">
            <td className="p-2 text-black">{tier.from}</td>
            <td className="p-2 text-black">{tier.to}</td>
            <td className="p-2 text-black">₹ {tier.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-xs text-black mt-2">
      <strong>Note:</strong> Once you adjust the quantity in BonziCart, the price will automatically update according to the bulk pricing offer by seller. BonziCart always suggests purchasing in bulk under a business name with a registered GST number to avail the GST benefits.
    </p>
  </div>
);

export default function ProductInfo({ product, quantity, handleQuantityChange, getSavePercentage }) {
  const [showBulkPrice, setShowBulkPrice] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h1 className="text-lg font-semibold text-gray-800 leading-snug">{product.name}</h1>
      
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span className="flex items-center">⭐⭐⭐⭐⭐</span>
        <span>{product.rating} ({product.reviews} feedbacks)</span>
        <span>{product.orders} orders</span>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="bg-gray-50 p-2 rounded-md">
          <div className="flex items-center gap-3">
              <div>
                  <span className="line-through text-gray-500 text-sm">₹{product.priceDetails.mrp.toFixed(2)}</span>
                  <span className="ml-2 text-green-600 font-semibold">Save {getSavePercentage()}%</span>
              </div>
              <div className="text-xl font-bold text-orange-600">₹{product.priceDetails.price.toFixed(2)}</div>
          </div>
          <div className="text-md font-bold text-red-600">₹{product.priceDetails.finalPrice.toFixed(2)} <span className="text-sm font-normal text-gray-600">/ Piece</span></div>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setShowBulkPrice(true)}
          onMouseLeave={() => setShowBulkPrice(false)}
        >
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Bulk Price
          </button>
          {showBulkPrice && <BulkPricePopover bulkPricing={product.bulkPricing} />}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 text-center text-xs border-y py-2">
        {/* Icons and Info */}
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696a8.25 8.25 0 00-11.664 0l-3.181 3.183" /></svg>
            <div className="font-semibold text-orange-500 mt-1">Replacement</div>
            <div className="text-gray-600">{product.shippingInfo.Replacement}</div>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div className="font-semibold text-blue-500 mt-1">Processing</div>
            <div className="text-gray-600">{product.shippingInfo.Processing}</div>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-9l5.25-5.25h9l5.25 5.25m-17.25 0h17.25" /></svg>
            <div className="font-semibold text-yellow-500 mt-1">Shipping</div>
            <div className="text-gray-600">{product.shippingInfo.Shipping}</div>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H10.5a2.25 2.25 0 00-2.25 2.25V21M3 3h18M5.25 3v18m13.5-18v18M9 6.75h6.375a.75.75 0 01.75.75v3.375a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75z" /></svg>
            <div className="font-semibold text-orange-700 mt-1">Seller</div>
            <div className="text-gray-600">{product.shippingInfo.Seller}</div>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
            <div className="font-semibold text-green-500 mt-1">Warranty</div>
            <div className="text-gray-600">{product.shippingInfo.Warranty}</div>
        </div>
      </div>

      <div className="flex flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-3">
          <div>
            <span className="font-medium text-xs">Color</span>
            <div className="flex gap-2 mt-1">
                {['White', 'Warm yellow', 'Yellow'].map((size) => (
                <button key={size} className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300 text-gray-700 hover:bg-orange-100 text-xs">{size}</button>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-xs">Quantity</span>
            <div className="flex items-center">
                <button className="px-2 py-0.5 bg-gray-200 text-black rounded-l text-sm" onClick={() => handleQuantityChange(-1)}>-</button>
                <span className="px-3 py-0.5 border-t border-b text-sm">{quantity}</span>
                <button className="px-2 py-0.5 bg-gray-200 text-black rounded-r text-sm" onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <span className="text-green-600 text-xs">(Stock {product.stock} pieces)</span>
          </div>
          
          <div className="text-xs text-orange-600">Want to buy in bulk? <a href="#" className="underline font-semibold">Click here</a></div>
          
          <div className="flex gap-3 text-xs">
            <span className="text-green-600 font-semibold">✓ Free Shipping</span>
            <span className="text-gray-500 font-semibold">{product.codAvailable ? '✓ COD Available' : 'COD Not Available'}</span>
          </div>
          
          <div className="flex flex-row gap-2 mt-1">
            <button className="flex-1 bg-orange-500 text-white px-4 py-2 rounded font-bold shadow hover:bg-orange-600 text-sm">Buy Now</button>
            <button className="flex-1 bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-bold shadow hover:bg-orange-50 text-sm">Add To Cart</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded shadow hover:bg-gray-100">♡</button>
          </div>

          <div className="mt-1">
            <button className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg shadow-sm flex items-center gap-2 text-xs hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                Get Seller Coupons
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-48 flex flex-col gap-2">
          <div className="p-2 bg-gray-50 rounded-lg flex flex-col gap-1 h-full">
            <div className="text-sm text-gray-600">Sold By</div>
            <div className="font-bold text-orange-600">{product.seller}</div>
            <div className="flex flex-col text-sm text-gray-700">
              <span>{product.positiveSentiment}% Positive Sentiment</span>
              <span>{product.followers} Followers</span>
            </div>
            <div className="flex flex-col gap-1 mt-auto">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-2 rounded-lg font-bold shadow text-sm">Contact Seller</button>
              <div className="flex gap-1">
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded shadow text-sm">+ Follow</button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded shadow text-sm">Visit Store</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-2 text-sm border-t pt-2 justify-between">
        <span className="text-orange-600 font-semibold">Seller Return Policy</span>
        <span className="text-blue-600 font-semibold">Buyer Protection</span>
      </div>
    </div>
  );
}
