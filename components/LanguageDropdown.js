
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Simple SVG icons as React components
const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const languages = [
  { code: 'en', name: 'English', googleCode: 'en' },
  { code: 'hi', name: 'हिन्दी (Hindi)', googleCode: 'hi' },
  { code: 'bn', name: 'বাংলা (Bengali)', googleCode: 'bn' },
  { code: 'te', name: 'తెలుగు (Telugu)', googleCode: 'te' },
  { code: 'mr', name: 'मराठी (Marathi)', googleCode: 'mr' },
  { code: 'ta', name: 'தமிழ் (Tamil)', googleCode: 'ta' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', googleCode: 'gu' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', googleCode: 'kn' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', googleCode: 'ml' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', googleCode: 'pa' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', googleCode: 'or' },
  { code: 'as', name: 'অসমীয়া (Assamese)', googleCode: 'as' },
  { code: 'ur', name: 'اردو (Urdu)', googleCode: 'ur' },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const router = useRouter();

  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      setIsTranslateReady(true);
    }
  };

  useEffect(() => {
    const id = 'google-translate-script';

    const addScript = () => {
      const existingScript = document.getElementById(id);
      if (!existingScript) {
        const script = document.createElement('script');
        script.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        script.setAttribute('id', id);
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      } else if (window.google && window.google.translate) {
        googleTranslateElementInit();
      }
    };

    const removeScript = () => {
      const script = document.getElementById(id);
      if (script) script.remove();
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) translateElement.innerHTML = '';
      setIsTranslateReady(false);
    };

    // Initial load
    addScript();

    // Handle route changes
    router.events.on('routeChangeStart', removeScript);
    router.events.on('routeChangeComplete', addScript);

    return () => {
      router.events.off('routeChangeStart', removeScript);
      router.events.off('routeChangeComplete', addScript);
    };
  }, [router.events]);

  const translatePage = (languageCode) => {
    if (isTranslateReady && window.google && window.google.translate) {
      const translateElement = window.google.translate.TranslateElement.getInstance();
      if (translateElement) {
        // Get the translate select element
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
          selectElement.value = languageCode;
          selectElement.dispatchEvent(new Event('change'));
        }
      }
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    
    if (language.googleCode !== 'en') {
      // Wait a bit for the translate element to be ready
      setTimeout(() => {
        translatePage(language.googleCode);
      }, 500);
      console.log(`Translating to ${language.name}`);
    } else {
      // Reset to original language
      setTimeout(() => {
        translatePage('en');
      }, 500);
      console.log('Resetting to English');
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
    </>
  );
}
