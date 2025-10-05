'use client';

import { useState, useEffect, useRef } from 'react';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false);
  const dropdownRef = useRef(null);

  // Language options - all names in English for consistency
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
  ];

  // Load Google Translate script
  useEffect(() => {
    // Check if Google Translate is already loaded
    if (window.google && window.google.translate) {
      setIsGoogleTranslateReady(true);
      return;
    }

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr,gu,ta,te,kn,ml,pa,bn,or,as',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
        
        setIsGoogleTranslateReady(true);
        
        // Hide Google banners after initialization
        setTimeout(() => {
          const banners = document.querySelectorAll('.goog-te-banner-frame, #goog-gt-banner, .goog-te-banner');
          banners.forEach(banner => {
            banner.style.display = 'none';
            banner.style.visibility = 'hidden';
            banner.style.opacity = '0';
          });
          
          // Force body positioning
          document.body.style.top = '0';
          document.body.style.position = 'static';
        }, 100);
      }
    };

    return () => {
      // Cleanup
      delete window.googleTranslateElementInit;
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Monitor for banner appearance and hide it
  useEffect(() => {
    const hideBanners = () => {
      // More comprehensive selector list for Google Translate elements
      const selectors = [
        '.goog-te-banner-frame',
        '#goog-gt-banner',
        '.goog-te-banner',
        '.goog-te-banner-frame.skiptranslate',
        'iframe[src*="translate.google.com"]',
        'iframe[src*="translate.googleapis.com"]',
        'iframe[src*="clients5.google.com"]',
        'iframe[name*="goog"]',
        'iframe[id*="goog"]',
        'iframe[src*="translate"]',
        'iframe[src*="google"]',
        'iframe[title*="Google Translate"]',
        'iframe[title*="google translate"]',
        'iframe[title*="மொழி"]',
        'iframe[title*="Language"]',
        'iframe[title*="translation"]',
        'iframe[title*="translate"]',
        'iframe[class*="VIpgJd"]',
        'iframe[class*="skiptranslate"]',
        '.VIpgJd-ZVi9od-xl07Ob-OEVmcd',
        '.skiptranslate iframe',
        'iframe.skiptranslate',
        'iframe[name="goog-te-banner-frame"]',
        'iframe[name="goog-te-ftab-frame"]',
        'iframe[name="goog-te-menu-frame"]',
        '[id*="goog-gt"]',
        '[class*="goog-te-banner"]',
        '[class*="goog-te-ftab"]',
        '.goog-te-ftab-frame',
        '.goog-te-menu-frame',
        '.goog-te-balloon-frame',
        '[id*="google_translate"]',
        '[class*="google_translate"]'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.style.display = 'none';
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
          element.style.height = '0';
          element.style.position = 'absolute';
          element.style.top = '-9999px';
          element.style.left = '-9999px';
          element.style.zIndex = '-1';
          
          // Remove the element completely if it's a banner or specific iframe
          if (element.classList.contains('goog-te-banner-frame') || 
              element.id === 'goog-gt-banner' ||
              element.classList.contains('goog-te-banner') ||
              element.classList.contains('VIpgJd-ZVi9od-xl07Ob-OEVmcd') ||
              element.classList.contains('skiptranslate') ||
              element.tagName === 'IFRAME') {
            element.remove();
          }
        });
      });
      
      // Force body positioning and remove any top margin/padding
      document.body.style.top = '0';
      document.body.style.position = 'static';
      document.body.style.marginTop = '0';
      document.body.style.paddingTop = '0';
      
      // Remove any injected styles that might be causing the banner
      const styleTags = document.querySelectorAll('style');
      styleTags.forEach(style => {
        if (style.textContent && style.textContent.includes('goog-te-banner')) {
          style.remove();
        }
      });
    };

    // Hide banners immediately and set up observer
    hideBanners();
    
    // Use multiple observers for better coverage
    const observer = new MutationObserver((mutations) => {
      let shouldHide = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              if (node.classList && (
                node.classList.contains('goog-te-banner-frame') ||
                node.classList.contains('goog-te-banner') ||
                node.id === 'goog-gt-banner'
              )) {
                shouldHide = true;
              }
            }
          });
        }
      });
      if (shouldHide) {
        setTimeout(hideBanners, 0);
      }
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['class', 'id', 'style']
    });

    // Set up interval to continuously check and hide banners
    const interval = setInterval(hideBanners, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isGoogleTranslateReady]);

  // Detect current language from URL and ensure English is default
  useEffect(() => {
    const detectCurrentLanguage = () => {
      const hash = window.location.hash;
      if (hash.includes('#googtrans(')) {
        const match = hash.match(/#googtrans\(en\|([a-z]{2})\)/);
        if (match && match[1]) {
          setCurrentLanguage(match[1]);
        } else {
          setCurrentLanguage('en'); // Default to English
        }
      } else {
        setCurrentLanguage('en'); // Default to English
      }
    };

    detectCurrentLanguage();
    window.addEventListener('hashchange', detectCurrentLanguage);
    
    return () => window.removeEventListener('hashchange', detectCurrentLanguage);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle language change with improved English reset
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setIsOpen(false);

    // Method 1: Try to trigger Google Translate directly
    if (isGoogleTranslateReady && window.google && window.google.translate) {
      try {
        // Try to find and click the Google Translate select element
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
          googleSelect.value = langCode;
          googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
          return;
        }
      } catch (error) {
        console.log('Direct Google Translate trigger failed:', error);
      }
    }

    // Method 2: Use URL parameter method as fallback
    if (langCode === 'en') {
      // Clear Google Translate cookie and hash
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Remove the hash and reload to return to original English
      const currentUrl = window.location.href.split('#googtrans(')[0];
      if (window.location.href !== currentUrl || window.location.hash) {
        window.location.replace(currentUrl);
      } else {
        window.location.reload();
      }
    } else {
      // For other languages, set the Google Translate hash
      const currentUrl = window.location.href.split('#googtrans(')[0];
      window.location.href = currentUrl + '#googtrans(en|' + langCode + ')';
      window.location.reload();
    }
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'English'; // Default to English if not found
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none', visibility: 'hidden', opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
      
      {/* Inline styles to hide Google banners */}
      <style jsx global>{`
        iframe[name*="goog"],
        iframe[id*="goog"],
        iframe[src*="translate"],
        iframe[src*="google"],
        iframe[title*="Google Translate"],
        iframe[title*="google translate"],
        iframe[title*="மொழி"],
        iframe[title*="Language"],
        iframe[title*="translation"],
        iframe[title*="translate"],
        iframe[class*="VIpgJd"],
        iframe[class*="skiptranslate"],
        .VIpgJd-ZVi9od-xl07Ob-OEVmcd,
        .skiptranslate iframe,
        iframe.skiptranslate,
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        #goog-gt-banner,
        .goog-te-banner,
        iframe[src*="translate.google.com"],
        iframe[src*="translate.googleapis.com"],
        iframe[src*="clients5.google.com"],
        [id*="goog-gt"],
        [class*="goog-te-banner"],
        [class*="goog-te-ftab"],
        .goog-te-ftab-frame,
        .goog-te-menu-frame,
        .goog-te-balloon-frame,
        [id*="google_translate"],
        [class*="google_translate"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          z-index: -1 !important;
          overflow: hidden !important;
          pointer-events: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        body.goog-te-compat-mode {
          position: static !important;
          top: 0 !important;
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        html body .goog-te-banner-frame,
        html body #goog-gt-banner,
        html body .goog-te-banner,
        html body iframe[name*="goog"],
        html body iframe[id*="goog"],
        html body iframe[src*="translate"],
        html body iframe[class*="VIpgJd"],
        html body iframe[class*="skiptranslate"],
        html body .VIpgJd-ZVi9od-xl07Ob-OEVmcd {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
      
      {/* Custom Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-orange-500 transition-colors focus:outline-none border border-gray-300 rounded-md hover:border-orange-500"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <svg className="w-3 h-3 text-gray-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-xs font-medium">{getCurrentLanguageName()}</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
              Select Language
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  currentLanguage === lang.code ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="font-medium">{lang.name}</div>
                  {lang.code !== 'en' && (
                    <div className="text-xs text-gray-500">{lang.nativeName}</div>
                  )}
                </div>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}