'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ product }) {
  const [selectedMedia, setSelectedMedia] = useState(
    product.media && product.media.length > 0 ? product.media[0] : null
  );

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center">
      {/* Main Image Container */}
      <div className="w-full bg-white rounded-lg overflow-hidden mb-3 sm:mb-4">
        <div className="relative pb-[100%]">
          {selectedMedia ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="group relative w-full h-full">
                  <Image 
                    src={selectedMedia.url} 
                    alt={product.name} 
                    fill
                    className="object-contain transition-transform duration-300 ease-out hover:scale-105"
                    priority
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-sm">No image available</div>
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="Share product"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                  });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="Add to favorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative w-full">
        <div className="flex gap-2 sm:gap-3 justify-start items-center overflow-x-auto w-full py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {product.media && product.media.length > 0 && product.media.map((media, idx) => (
            <button
              key={idx}
              className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                selectedMedia && selectedMedia.url === media.url 
                  ? 'ring-2 ring-orange-500 scale-105' 
                  : 'ring-1 ring-gray-200 hover:ring-orange-300'
              }`}
              onClick={() => setSelectedMedia(media)}
              aria-label={`View ${media.type === 'video' ? 'video' : 'image'} ${idx + 1} of ${product.media.length}`}
            >
              <div className="relative w-16 sm:w-20 aspect-square">
                {media.type === 'video' ? (
                  <>
                    <Image 
                      src={media.thumbnail} 
                      alt="Video thumbnail"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <Image 
                    src={media.url} 
                    alt={`Product thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}