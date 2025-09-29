import Link from 'next/link';

export default function ProductCard({ product, showDiscount = true }) {
  const discountPercent = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="w-full h-28 sm:h-32 md:h-36 lg:h-40 xl:h-36 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs sm:text-sm">Product Image</span>
          </div>

          {showDiscount && discountPercent > 0 && (
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold">
              -{discountPercent}%
            </div>
          )}

          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-2 sm:p-3">
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 leading-tight">
            {product.title}
          </h3>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-sm sm:text-base md:text-lg font-bold text-red-500">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center mt-1 sm:mt-2">
              <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}