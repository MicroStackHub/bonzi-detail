
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        return;
      }

      // Create and add the script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // Initialize Google Translate
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur', // Indian languages only
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    };

    const removeGoogleTranslateElements = () => {
      // Remove the translate widget iframe and elements
      const translateElements = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
      translateElements.forEach(el => el.remove());
      
      // Clean up body styles added by Google Translate
      document.body.style.top = '0px';
      document.body.style.position = 'static';
    };

    // Add script on mount
    addGoogleTranslateScript();

    // Cleanup on unmount
    return () => {
      removeGoogleTranslateElements();
    };
  }, [pathname]); // Re-run when pathname changes to handle route changes

  return (
    <div id="google_translate_element" className="inline-block"></div>
  );
}
