import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Add Google Translate Script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      const google = window.google;
      if (google && google.translate) {
        new google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,gu,kn,mr,or,pa,ta,te',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Add the script only if it hasn't been added yet
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    return () => {
      // Cleanup
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-md"
    />
  );
};

export default GoogleTranslate;