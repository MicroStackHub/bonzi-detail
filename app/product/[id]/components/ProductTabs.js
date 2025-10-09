'use client';

import { useState } from 'react';

export default function ProductTabs({ product, productDescription, faq = [] }) {
  const [activeTab, setActiveTab] = useState('details');
  const [feedbackSubTab, setFeedbackSubTab] = useState('product');
  const [showSpecifications, setShowSpecifications] = useState(false);

  return (
    <div className="mt-6 bg-white p-1 sm:p-4 rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('details')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'details'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'feedback'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQ
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-orange-500">Specification</h3>
                <button
                  onClick={() => setShowSpecifications(!showSpecifications)}
                  className="sm:hidden flex items-center gap-2 text-orange-600 font-medium text-sm"
                >
                  <span>{showSpecifications ? 'Hide' : 'Show'} Specifications</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${showSpecifications ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="hidden sm:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {product.productSpecifications && product.productSpecifications
                    .filter(spec => spec.PropertyValue && spec.PropertyValue.trim() !== '' && spec.PropertyValue !== 'null' && spec.PropertyValue !== 'undefined')
                    .map((spec, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="mb-3">
                        <img 
                          src={spec.image} 
                          alt={spec.PropertyName}
                          className="w-8 h-8 object-contain mx-auto"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPgo8cGF0aCBkPSJNMjQgMTJMMzIgMjhIMTZMMjQgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                            e.target.style.display = 'block';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-600 mb-2">
                          {spec.PropertyName}
                        </div>
                        <div className="text-sm text-gray-800 font-semibold">
                          {spec.PropertyValue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sm:hidden">
                <div className={`overflow-hidden transition-all duration-300 ${showSpecifications ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-1 gap-4 pt-4 max-h-80 overflow-y-auto">
                    {product.productSpecifications && product.productSpecifications
                      .filter(spec => spec.PropertyValue && spec.PropertyValue.trim() !== '' && spec.PropertyValue !== 'null' && spec.PropertyValue !== 'undefined')
                      .map((spec, index) => (
                      <div key={index} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="mr-3 flex-shrink-0">
                          <img 
                            src={spec.image} 
                            alt={spec.PropertyName}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPgo8cGF0aCBkPSJNMjQgMTJMMzIgMjhIMTZMMjQgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                              e.target.style.display = 'block';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-blue-600 mb-1">
                            {spec.PropertyName}
                          </div>
                          <div className="text-sm text-gray-800 font-semibold">
                            {spec.PropertyValue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-3">Description</h3>
              {productDescription ? (
                <div 
                  className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: productDescription }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description}
                </p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'feedback' && (
          <div className="bg-white">
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-orange-600 font-semibold text-base">
                  {product.feedbackRating?.avg_rate || 0} ({product.feedbackRating?.total_feedback || 0} feedback)
                </div>
                <span className="text-gray-400">|</span>
                <div className="text-orange-600 font-semibold text-base">
                  {product.orders || 0} Orders
                </div>
              </div>
              
              <div className="font-bold text-gray-800 mb-4 text-lg">
                {product.feedbackRating?.avg_rate || 0} Out Of 5 Stars
              </div>
              
              <div className="space-y-2 mb-6">
                {[5,4,3,2,1].map(star => {
                  const rateKey = `rate${star}`;
                  const count = product.feedbackRating?.[rateKey] || 0;
                  const total = product.feedbackRating?.total_feedback || 1;
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  
                  return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-12 text-right font-medium text-black">{star} stars</span>
                      <span className="text-black">:</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                        <div 
                          className="h-full bg-orange-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-center font-medium text-black">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex border-t border-orange-200">
              <button 
                onClick={() => setFeedbackSubTab('product')}
                className={`flex-1 text-center py-4 font-semibold text-base transition-colors ${
                  feedbackSubTab === 'product' 
                    ? 'text-orange-600 bg-white border-b-2 border-orange-600' 
                    : 'text-orange-400 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                Product Feedback
              </button>
              <button 
                onClick={() => setFeedbackSubTab('all')}
                className={`flex-1 text-center py-4 font-semibold text-base transition-colors ${
                  feedbackSubTab === 'all' 
                    ? 'text-orange-600 bg-white border-b-2 border-orange-600' 
                    : 'text-orange-400 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                All FeedBack
              </button>
            </div>
            
            {feedbackSubTab === 'product' && (
              <div className="p-4">
                <div className="text-center text-gray-500 py-8">
                  No product feedback available yet.
                </div>
              </div>
            )}
            
            {feedbackSubTab === 'all' && (
              <div className="p-4">
                <div className="text-center text-gray-500 py-8">
                  No feedback available yet.
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'faq' && (
          <div className="p-4">
            {faq && faq.length > 0 ? (
              <div className="space-y-4">
                {faq.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-2">{item.faq_question}</div>
                    <div className="text-gray-600 text-sm">{item.faq_answer}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">No FAQs available yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}