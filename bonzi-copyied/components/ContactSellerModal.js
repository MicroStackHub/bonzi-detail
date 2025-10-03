import React from "react";

export default function ContactSellerModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Contact Seller</h2>
        <div className="flex flex-row gap-6 justify-center mb-4">
          <div className="flex flex-col items-center">
            <img src="https://img.icons8.com/color/96/phone.png" alt="Phone" className="w-16 h-16 mb-2" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold text-sm">Phone Call to Seller</button>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://img.icons8.com/color/96/sms.png" alt="Message" className="w-16 h-16 mb-2" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold text-sm">Message to Seller</button>
          </div>
        </div>
        <p className="text-xs text-gray-700 text-center mt-2">
          <strong>Note:</strong> Call Seller only if you have any enquiry for Stock, Bulk Buy, Discount for Bulk Buy. If you call for any other matter apart from the above mentioned, your number will be listed under spam and you will not be able to call any sellers.
        </p>
      </div>
    </div>
  );
}
