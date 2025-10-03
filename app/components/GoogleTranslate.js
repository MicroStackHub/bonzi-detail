
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        // If script exists but widget not initialized, reinitialize
        if (window.google && window.google.translate) {
          initializeWidget();
        }
        return;
      }

      // Initialize function
      window.googleTranslateElementInit = () => {
        initializeWidget();
      };

      // Create and add the script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    const initializeWidget = () => {
      // Desktop version
      if (document.getElementById('google_translate_element') && !document.getElementById('google_translate_element').hasChildNodes()) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }

      // Mobile version
      if (document.getElementById('google_translate_element_mobile') && !document.getElementById('google_translate_element_mobile').hasChildNodes()) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element_mobile'
        );
      }
    };

    const removeGoogleTranslateElements = () => {
      // Remove the translate widget iframe and elements but keep the script
      const translateElements = document.querySelectorAll('.goog-te-banner-frame');
      translateElements.forEach(el => el.remove());
      
      // Clean up body styles added by Google Translate
      document.body.style.top = '0px';
      document.body.style.position = 'static';
      
      // Clear the widget containers
      const desktopWidget = document.getElementById('google_translate_element');
      const mobileWidget = document.getElementById('google_translate_element_mobile');
      if (desktopWidget) desktopWidget.innerHTML = '';
      if (mobileWidget) mobileWidget.innerHTML = '';
    };

    // Remove old widgets and reinitialize on route change
    removeGoogleTranslateElements();
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      addGoogleTranslateScript();
    }, 100);

    // Cleanup on unmount
    return () => {
      const desktopWidget = document.getElementById('google_translate_element');
      const mobileWidget = document.getElementById('google_translate_element_mobile');
      if (desktopWidget) desktopWidget.innerHTML = '';
      if (mobileWidget) mobileWidget.innerHTML = '';
    };
  }, [pathname]);

  return null;
}
