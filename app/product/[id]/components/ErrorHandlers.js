'use client';

export function GoBackButton() {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
    >
      Go Back Home
    </button>
  );
}

export function ShareButton() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-1.5 sm:p-2 rounded hover:bg-gray-100 text-orange-500 border border-gray-200 flex-shrink-0"
      aria-label="Share product"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="18" cy="5" r="2" fill="currentColor" />
        <circle cx="6" cy="12" r="2" fill="currentColor" />
        <circle cx="18" cy="19" r="2" fill="currentColor" />
        <line x1="8" y1="12" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="12" x2="16" y2="19" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}