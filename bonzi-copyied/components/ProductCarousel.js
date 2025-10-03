
import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products, linkText = "View All" }) {
  const [visibleRows, setVisibleRows] = useState(4); // Start with 4 rows (20 products)
  const itemsPerRow = 5; // 5 products per row
  const rowsPerLoad = 2; // Load 2 rows at a time when scrolling
  
  const totalVisibleProducts = visibleRows * itemsPerRow;
  const hasMoreProducts = totalVisibleProducts < products.length;
  const visibleProducts = products.slice(0, totalVisibleProducts);
  
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreProducts) {
          setIsVisible(true);
          // Auto-load more content when component comes into view
          setTimeout(() => {
            setVisibleRows(prev => Math.min(prev + rowsPerLoad, Math.ceil(products.length / itemsPerRow)));
          }, 500); // Small delay for better UX
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '50px' // Start loading 50px before the component comes into view
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMoreProducts, products.length, itemsPerRow, rowsPerLoad]);

  const loadMore = () => {
    setVisibleRows(prev => prev + rowsPerLoad);
  };

  return (
    <div ref={observerRef} className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
        <a href="#" className="text-orange-500 hover:text-orange-600 text-sm font-medium hidden sm:block">
          {linkText} →
        </a>
      </div>

      {/* Products Grid - Fully responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {visibleProducts.map((product, index) => (
          <div key={index} className="flex-none">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Loading indicator when auto-loading */}
      {isVisible && hasMoreProducts && (
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center text-orange-500">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm sm:text-base">Loading more products...</span>
          </div>
        </div>
      )}

      {/* Manual Show More Button (fallback) */}
      {hasMoreProducts && !isVisible && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition-colors font-medium text-sm sm:text-base"
          >
            Show More ({products.length - totalVisibleProducts} more items)
          </button>
        </div>
      )}

      {/* Show All Loaded Message */}
      {!hasMoreProducts && products.length > itemsPerRow * 2 && (
        <div className="text-center text-gray-500 text-xs sm:text-sm">
          All {products.length} items loaded
        </div>
      )}
    </div>
  );
}