'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductPolicies({ product }) {
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-xs sm:text-sm border-t pt-2 justify-between">
        <button
          onClick={() => setShowRefundModal(true)}
          className="text-orange-600 font-semibold text-xs sm:text-sm hover:underline cursor-pointer"
        >
          Seller Return Policy
        </button>
        <Link
          href="https://www.bonzicart.com/buyer/protection/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline"
        >
          Buyer Protection
        </Link>
      </div>

      {/* Refund Policy Modal */}
      {showRefundModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Seller Return Policy</h3>
              <button
                onClick={() => setShowRefundModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-700 mb-4 whitespace-pre-line">
              {product.refundPolicy}
            </div>
            <button
              onClick={() => setShowRefundModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}