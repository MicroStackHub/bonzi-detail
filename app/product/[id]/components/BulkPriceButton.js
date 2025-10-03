'use client';

import { useState } from 'react';

export default function BulkPriceButton({ product, priceData }) {
  const [showBulkPrice, setShowBulkPrice] = useState(false);

  return (
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
            <strong>Note:</strong> Once you adjust the quantity in BonziCart, the price will automatically update according to the bulk pricing offer by seller.
          </p>
        </div>
      )}
    </div>
  );
}