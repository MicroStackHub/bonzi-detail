'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerInfo({ product }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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
          status: !isFollowing
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsFollowing(!isFollowing);
        toast.success(`Successfully ${!isFollowing ? 'followed' : 'unfollowed'} seller`);
      } else {
        toast.error(`Failed to ${!isFollowing ? 'follow' : 'unfollow'} seller: ${data.message}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsFollowLoading(false);
    }
  };

  return (
    <>
      <div className="w-full xl:w-64 flex flex-col gap-1 sm:gap-1">
        <div className="p-3 md:p-4 bg-gray-50 rounded-lg flex flex-col gap-2" style={{ height: 'auto' }}>
          <div className="sm:text-[12px] sm:text-sm text-gray-600">Sold By</div>
          <div className="font-bold text-[14px] text-orange-600 text-sm md:text-base">{product.seller}</div>
          <div className="flex flex-col text-xs sm:text-sm text-gray-700 gap-1">
            <span className='text-[10px]'>{product.positiveSentiment}% Positive Sentiment</span>
            <span className='text-[10px]'>{product.followers} Followers</span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 sm:px-1 sm:py-2 rounded-lg font-semibold shadow text-xs sm:text-sm"
              onClick={() => setShowContactModal(true)}
              aria-label="Contact the seller"
            >
              Contact Seller
            </button>
            <div className="flex flex-row gap-2">
              <button 
                className={`flex-1 px-1 py-1 sm:px-1 sm:py-1 rounded shadow text-xs sm:text-[10px] transition-colors ${
                  isFollowing 
                    ? 'bg-red-500 text-white border border-red-500 hover:bg-red-600' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                } ${isFollowLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleFollowToggle}
                disabled={isFollowLoading}
                aria-label={isFollowing ? "Unfollow this seller" : "Follow this seller"}
              >
                {isFollowLoading ? '...' : (isFollowing ? 'Unfollow' : '+ Follow')}
              </button>
              <button 
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-1 py-1 sm:px-1 sm:py-1 rounded shadow text-xs sm:text-[10px]" 
                onClick={handleVisitStore}
                aria-label="Visit seller's store"
              >
                Visit Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Contact Seller</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Contact details and messaging feature coming soon!
            </p>
            <button 
              onClick={() => setShowContactModal(false)}
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