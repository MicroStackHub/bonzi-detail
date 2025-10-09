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
      const response = await fetch('https://api.glst.in/api/v1/store/follow-unfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjBjMTIwZS0zY2IwLTQ3OGMtOTY0Yi1hM2ZhZmFjMDFhNGIiLCJqdGkiOiI2Zjc1Y2EwZWQzODQyNTNhYTNjODU2MzFlYzRkMjJlYzIyYjU2NzFkMGE0MzgzYjc4MGNkNWEzODcyNWRjZTAzYWFjM2VjOTczMGU1NjRiNyIsImlhdCI6MTc1OTUzMTk5NC4wMTc5MTcsIm5iZiI6MTc1OTUzMTk5NC4wMTc5MjEsImV4cCI6MTc5MTA2Nzk5My45OTc0NDIsInN1YiI6IjUiLCJzY29wZXMiOlsiKiJdfQ.maL879O50zK45IlcGMZychVDLjIoKotGFZtlIloi1jCJbtLlFaqh7L30VUHrjDbWn9QNHskuwu8w1gTzb3k0f0ZiPJEyo0RButhjqkpQlLrtdGs1QhtirWmx9nZnw31OF5qe8RcJXZ41Wuv_FggkiO4ufVxSYkfSbprnnTV49qrzBQ8PCdNAMGlNdhqJeybC0blgvOF8KAADMNkF04YogxMy_8vRLZDe59mCwurrPg2ZrJEwFLuYcfSEp93aoUbMZYntB6cL3acwONqsURGS7xtpQObaXAFlLvtBMbXP-K-_hHOTBPZrLciAOFcjeEAx5_AelLQkbZvNXeGjfknc-0Tlh1rlHpZj4wwaHa59R2avDLcmJRJjRBoPhNlbTzm7WF51mk0qu1erTj3bxh-sz8RQasw53P3GwHJboSWm25VmhoHQYl9RvaNBTxk1UOFKLNdQPHlB8My5D2bMxa9hVqx0qz35REtkui_xAeenxJsHXfoXuIGfzq_YhdRSET5GW7zCaHKTsgbY_hq_OwszocQ1U_XMcL8_Qz-6g0BKWppC3sQN5OzBJgDGNET6TsnF3JpJ7f3NaxMkggf1yEsYrBYK6qKuI-PBZV0NX34vH4cJC_7pWlz5EavNzQ7TIb3OtW0XBzhl23-xxNPJ0Rnk592syGbMMwTwrpSjmubTGRU`,
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
      <div className="w-full flex flex-col gap-2 ml-auto max-w-[280px]">
        <div className="p-2 max-[360px]:p-1.5 bg-gray-50 rounded-lg flex flex-col gap-1.5">
          <div className="text-[11px] text-gray-600">Sold By</div>
          <div className="font-bold text-orange-600 text-xs max-[360px]:text-[11px]">{product.seller}</div>
          <div className="flex flex-col text-gray-700 gap-0.5">
            <span className='text-[10px] max-[360px]:text-[9px]'>{product.positiveSentiment}% Positive Sentiment</span>
            <span className='text-[10px] max-[360px]:text-[9px]'>{product.followers} Followers</span>
          </div>
          <div className="flex flex-col gap-1.5 mt-0.5">
            <button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 max-[360px]:px-1.5 max-[360px]:py-0.5 rounded font-semibold shadow text-[11px] max-[360px]:text-[10px] cursor-pointer"
              onClick={() => setShowContactModal(true)}
              aria-label="Contact the seller"
            >
              Contact Seller
            </button>
            <div className="flex flex-row gap-1.5">
              <button 
                className={`px-2 py-1 max-[360px]:px-1.5 max-[360px]:py-0.5 rounded shadow text-[11px] max-[360px]:text-[10px] transition-colors cursor-pointer
                  ${
                    isFollowing
                      ? 'bg-red-500 text-white border border-red-500 hover:bg-red-600'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}
                  `}
                onClick={handleFollowToggle}
                disabled={isFollowLoading}
                aria-label={isFollowing ? "Unfollow this seller" : "Follow this seller"}
              >
                {isFollowLoading ? '...' : (isFollowing ? 'Unfollow' : '+ Follow')}
              </button>
              <button 
                onClick={handleVisitStore}
                className="bg-white border border-gray-300 text-gray-700 px-2 py-1 max-[360px]:px-1.5 max-[360px]:py-0.5 rounded shadow text-[10px] max-[360px]:text-[9px] hover:bg-gray-50 transition-colors cursor-pointer"
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
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}