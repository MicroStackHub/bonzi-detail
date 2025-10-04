export default function ProductSkeleton() {
  return (
    <div className="bg-gray-100 py-1 sm:py-2 md:py-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28 mx-auto animate-pulse">
      <div className="max-w-6xl mx-auto px-2 sm:px-3 md:px-4 lg:px-8">
        
        {/* Main Product Section Skeleton */}
        <div className="bg-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg shadow-sm flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          
          {/* Left: Product Gallery Skeleton */}
          <div className="w-full lg:w-1/2">
            {/* Main Image Skeleton */}
            <div className="bg-gray-300 rounded-lg mb-2 sm:mb-3 md:mb-4" style={{ aspectRatio: '1/1' }}></div>
            
            {/* Thumbnail Images Skeleton */}
            <div className="flex gap-1 sm:gap-2 overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-300 rounded flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"></div>
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-3 mt-1 sm:mt-2">
            
            {/* Title and Share Button Skeleton */}
            <div className="flex items-start justify-between">
              <div className="bg-gray-300 h-4 sm:h-5 md:h-6 lg:h-7 rounded flex-1 mr-2"></div>
              <div className="bg-gray-300 w-8 h-8 sm:w-10 sm:h-10 rounded flex-shrink-0"></div>
            </div>

            {/* Rating and Reviews Skeleton */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gray-300 h-3 sm:h-4 w-20 rounded"></div>
              <div className="bg-gray-300 h-3 sm:h-4 w-24 rounded"></div>
              <div className="bg-gray-300 h-3 sm:h-4 w-16 rounded"></div>
            </div>

            {/* Price Section Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5">
              <div className="bg-gray-100 p-3 sm:p-4 rounded-md flex-1 w-full">
                <div className="space-y-2">
                  <div className="bg-gray-300 h-3 sm:h-4 w-32 rounded"></div>
                  <div className="bg-gray-300 h-5 sm:h-6 md:h-7 w-40 rounded"></div>
                  <div className="bg-gray-300 h-4 sm:h-5 w-36 rounded"></div>
                </div>
              </div>
              
              {/* Bulk Price Button Skeleton */}
              <div className="bg-gray-300 h-10 sm:h-12 w-24 sm:w-28 rounded-md"></div>
            </div>

            {/* Shipping Info Skeleton */}
            <div className="border-y py-2.5 sm:py-3">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto md:grid md:grid-cols-5 md:gap-1">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-20 sm:w-24 md:w-auto text-center">
                    <div className="bg-gray-300 h-4 w-4 sm:h-5 sm:w-5 mx-auto rounded mb-1"></div>
                    <div className="bg-gray-300 h-3 w-12 sm:w-16 mx-auto rounded mb-1"></div>
                    <div className="bg-gray-300 h-3 w-10 sm:w-14 mx-auto rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Section Skeleton */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-5">
              {/* Left Column - Product Interactive Skeleton */}
              <div className="w-full space-y-3 sm:space-y-4">
                {/* Color Selection Skeleton */}
                <div>
                  <div className="bg-gray-300 h-4 w-16 rounded mb-2"></div>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="bg-gray-300 w-8 h-8 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector Skeleton */}
                <div>
                  <div className="bg-gray-300 h-4 w-20 rounded mb-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-300 w-8 h-8 rounded"></div>
                    <div className="bg-gray-300 w-16 h-8 rounded"></div>
                    <div className="bg-gray-300 w-8 h-8 rounded"></div>
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="space-y-2">
                  <div className="bg-gray-300 h-10 sm:h-12 w-full rounded-md"></div>
                  <div className="bg-gray-300 h-10 sm:h-12 w-full rounded-md"></div>
                </div>
              </div>

              {/* Right Column - Seller Info Skeleton */}
              <div className="w-full xl:w-80 space-y-3">
                <div className="bg-gray-100 p-3 sm:p-4 rounded-md">
                  <div className="bg-gray-300 h-5 w-24 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-300 h-4 w-32 rounded"></div>
                    <div className="bg-gray-300 h-4 w-28 rounded"></div>
                    <div className="bg-gray-300 h-4 w-36 rounded"></div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <div className="bg-gray-300 h-8 w-20 rounded"></div>
                    <div className="bg-gray-300 h-8 w-20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Policies Skeleton */}
            <div className="bg-gray-100 p-3 sm:p-4 rounded-md">
              <div className="bg-gray-300 h-5 w-32 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="bg-gray-300 h-3 w-full rounded"></div>
                <div className="bg-gray-300 h-3 w-4/5 rounded"></div>
                <div className="bg-gray-300 h-3 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs Skeleton */}
        <div className="bg-white rounded-lg shadow-sm mt-4 sm:mt-5 md:mt-6">
          {/* Tab Headers Skeleton */}
          <div className="border-b border-gray-200 p-3 sm:p-4">
            <div className="flex gap-4 sm:gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-300 h-4 w-16 sm:w-20 rounded"></div>
              ))}
            </div>
          </div>
          
          {/* Tab Content Skeleton */}
          <div className="p-3 sm:p-4 space-y-3">
            <div className="bg-gray-300 h-4 w-full rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
            <div className="bg-gray-300 h-4 w-4/5 rounded"></div>
            <div className="bg-gray-300 h-4 w-full rounded"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}