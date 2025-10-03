import { useState, useEffect } from 'react';
import PostQuestionModal from './PostQuestionModal';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-orange-500 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-4 px-6 text-gray-600 text-sm leading-relaxed bg-gray-50">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ product }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openItems, setOpenItems] = useState(new Set());
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    if (product?.id) {
      fetchFAQs();
    }
  }, [product?.id]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.glst.in/api/v1/get-product-faq?product_id=${product.id}&limit=15&page=1`);
      const data = await response.json();
      if (data.success) {
        setFaqs(data.data.data);
        // Open first FAQ if available
        if (data.data.data.length > 0) {
          setOpenItems(new Set([0]));
        }
      } else {
        setError('Failed to load FAQs');
      }
    } catch (err) {
      setError('Error loading FAQs');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handlePostSubmit = (text) => {
    // TODO: replace with real API call - for now just log
    console.log('Posted question:', text);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.faq_question}
              answer={faq.faq_answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No FAQs available for this product.</p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2">Still have questions?</h4>
          <p className="text-sm text-gray-600 mb-3">Our customer support team is here to help you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold">
              Contact Support
            </button>
            <button onClick={() => setShowPostModal(true)} className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors text-sm font-semibold">
              Post Question
            </button>
          </div>
        </div>
      </div>
      <PostQuestionModal open={showPostModal} onClose={() => setShowPostModal(false)} onSubmit={handlePostSubmit} />
    </div>
  );
};

export default FAQ;
