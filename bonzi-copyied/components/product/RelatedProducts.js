export default function RelatedProducts({ relatedProducts }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {relatedProducts?.map((related) => (
          <div
            key={related.id}
            className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-lg transition-shadow duration-200"
          >
            <div className="w-full h-24 bg-gray-100 rounded-md mb-3 relative overflow-hidden">
              <img
                src={related.media[0].url}
                alt={related.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                -{related.discount}%
              </span>
            </div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1.5 truncate">{related.name}</h4>
            <div className="flex justify-center items-baseline space-x-1.5">
              <span className="text-sm font-bold text-orange-600">₹{related.price.toFixed(2)}</span>
              <span className="text-xs text-gray-500 line-through">₹{related.originalPrice.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}