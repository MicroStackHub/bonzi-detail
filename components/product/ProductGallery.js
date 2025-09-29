import React from 'react';

export default function ProductGallery({ media, selectedMedia, setSelectedMedia, productName }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-md aspect-square bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden mb-4">
        {selectedMedia.type === 'video' ? (
          <video src={selectedMedia.url} controls autoPlay muted loop className="w-full h-full object-contain" />
        ) : (
          <img src={selectedMedia.url} alt={productName} className="w-full h-full object-contain" />
        )}
      </div>
      <div className="flex gap-2 justify-center">
        {media.map((mediaItem, idx) => (
          <button
            key={idx}
            className={`border-2 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden ${selectedMedia.url === mediaItem.url ? 'border-orange-500' : 'border-gray-200'}`}
            onClick={() => setSelectedMedia(mediaItem)}
          >
            {mediaItem.type === 'video' ? (
              <img src={mediaItem.thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
            ) : (
              <img src={mediaItem.url} alt="Thumbnail" className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
