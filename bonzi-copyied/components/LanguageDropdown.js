import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Simple SVG icons as React components
const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const languages = [
  { code: 'en', name: 'English', googleCode: 'en' },
  { code: 'hi', name: 'Hindi', googleCode: 'hi' },
  { code: 'bn', name: 'Bengali', googleCode: 'bn' },
  { code: 'te', name: 'Telugu', googleCode: 'te' },
  { code: 'mr', name: 'Marathi', googleCode: 'mr' },
  { code: 'ta', name: 'Tamil', googleCode: 'ta' },
  { code: 'gu', name: 'Gujarati', googleCode: 'gu' },
  { code: 'kn', name: 'Kannada', googleCode: 'kn' },
  { code: 'ml', name: 'Malayalam', googleCode: 'ml' },
  { code: 'pa', name: 'Punjabi', googleCode: 'pa' },
  { code: 'or', name: 'Odia', googleCode: 'or' },
  { code: 'as', name: 'Assamese', googleCode: 'as' },
  { code: 'ur', name: 'Urdu', googleCode: 'ur' },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const [translateElement, setTranslateElement] = useState(null);
  const router = useRouter();

  const initializeGoogleTranslate = () => {
    if (typeof window !== 'undefined' && window.google && window.google.translate && window.google.translate.TranslateElement) {
      try {
        // Clear existing element first
        const existingElement = document.getElementById('google_translate_element');
        if (existingElement) {
          existingElement.innerHTML = '';
        }
        
        const element = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setTranslateElement(element);
        setIsTranslateReady(true);
        console.log('Google Translate initialized successfully');
        
        // Hide any banner that might appear
        setTimeout(() => {
          const banners = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate iframe');
          banners.forEach(banner => {
            if (banner && banner.style) {
              banner.style.display = 'none';
              banner.style.visibility = 'hidden';
              banner.style.height = '0';
            }
          });
          // Ensure body stays at top
          if (document.body.style) {
            document.body.style.top = '0px';
            document.body.style.position = 'static';
          }
        }, 100);
        
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
        setIsTranslateReady(false);
      }
    } else {
      console.log('Google Translate not ready yet, retrying...');
      setTimeout(initializeGoogleTranslate, 500);
    }
  };

  const loadGoogleTranslateScript = () => {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        if (window.google && window.google.translate) {
          resolve();
        } else {
          existingScript.onload = resolve;
          existingScript.onerror = reject;
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Google Translate script loaded');
        resolve();
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Google Translate script:', error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    let mounted = true;

    const setupGoogleTranslate = async () => {
      try {
        // Define the callback function globally
        window.googleTranslateElementInit = () => {
          if (mounted) {
            setTimeout(initializeGoogleTranslate, 100);
          }
        };

        await loadGoogleTranslateScript();
        
        // Initialize if not already done
        if (!isTranslateReady && window.google && window.google.translate) {
          initializeGoogleTranslate();
        }
      } catch (error) {
        console.error('Error setting up Google Translate:', error);
      }
    };

    setupGoogleTranslate();

    // Handle route changes
    const handleRouteChangeStart = () => {
      setIsTranslateReady(false);
      setTranslateElement(null);
    };

    const handleRouteChangeComplete = () => {
      // Reinitialize after route change
      setTimeout(() => {
        if (mounted && window.google && window.google.translate) {
          initializeGoogleTranslate();
        }
      }, 1000);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      mounted = false;
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      delete window.googleTranslateElementInit;
    };
  }, [router.events, isTranslateReady]);

  const translatePage = (languageCode) => {
    try {
      if (!isTranslateReady) {
        console.warn('Google Translate not ready yet');
        return;
      }

      // Find the select element
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        console.log(`Translating to ${languageCode}...`);
        
        // Set the value
        selectElement.value = languageCode;
        
        // Trigger change event with all possible methods
        selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        selectElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        
        // Also try manual trigger if available
        if (selectElement.onchange) {
          selectElement.onchange();
        }
        
        console.log(`Translation triggered for ${languageCode}`);
        
        // Hide any banner that appears after translation
        setTimeout(() => {
          const banners = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate iframe');
          banners.forEach(banner => {
            if (banner && banner.style) {
              banner.style.display = 'none';
              banner.style.visibility = 'hidden';
              banner.style.height = '0';
            }
          });
          if (document.body.style) {
            document.body.style.top = '0px';
            document.body.style.position = 'static';
          }
        }, 500);
        
        return;
      } else {
        console.warn('Google Translate select element not found, reinitializing...');
        // Reinitialize if select element is missing
        const element = document.getElementById('google_translate_element');
        if (element) {
          element.innerHTML = '';
          setIsTranslateReady(false);
          setTimeout(() => {
            initializeGoogleTranslate();
            // Try translation again after reinit
            setTimeout(() => translatePage(languageCode), 1000);
          }, 100);
        }
      }
    } catch (error) {
      // Suppress Google Translate fetch errors
      if (error.message && error.message.includes('Failed to fetch')) {
        // This is a Google Translate internal error, ignore it
        return;
      }
      console.error('Error translating page:', error);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    
    console.log(`Switching to ${language.name} (${language.googleCode})`);
    
    if (language.googleCode === 'en') {
      // Reset to original language by removing translation cookie and reloading
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name.trim().indexOf('googtrans') !== -1) {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      }
      window.location.reload();
    } else {
      // For translation, ensure widget is ready
      const attemptTranslate = (retries = 0) => {
        const maxRetries = 10;
        
        if (retries >= maxRetries) {
          console.error('Failed to translate after maximum retries');
          return;
        }
        
        if (isTranslateReady) {
          const selectElement = document.querySelector('.goog-te-combo');
          if (selectElement) {
            translatePage(language.googleCode);
          } else {
            console.log(`Select element not found, retry ${retries + 1}/${maxRetries}`);
            setTimeout(() => attemptTranslate(retries + 1), 500);
          }
        } else {
          console.log(`Translate not ready, retry ${retries + 1}/${maxRetries}`);
          setTimeout(() => attemptTranslate(retries + 1), 500);
        }
      };
      
      attemptTranslate();
    }
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <GlobeIcon />
          <span className="hidden md:inline">{selectedLanguage.name}</span>
          <span className="md:hidden">{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto">
              <div className="py-1" role="listbox">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                      selectedLanguage.code === language.code
                        ? 'bg-orange-100 text-orange-600 font-medium'
                        : 'text-gray-700'
                    }`}
                    role="option"
                    aria-selected={selectedLanguage.code === language.code}
                  >
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Status indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs bg-black text-white p-2 rounded">
          Translate: {isTranslateReady ? '✅' : '❌'}
        </div>
      )}
    </>
  );
}