import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Simple SVG icons as React components (These were removed in the edited snippet, so they are omitted here)
// const GlobeIcon = () => (...)
// const ChevronDownIcon = ({ className }) => (...)

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
  const [mounted, setMounted] = useState(false); // Added state to track mounting
  const dropdownRef = useRef(null); // Ref for the dropdown element
  const router = useRouter();

  // Set mounted to true after initial render to handle client-side logic
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);

    // Ensure this runs only on the client
    if (typeof window === 'undefined') return;

    // Attempt to use a global widget if it exists
    if (window.googleTranslateWidget && typeof window.googleTranslateWidget.translate === 'function') {
      const success = window.googleTranslateWidget.translate(language.googleCode);
      if (success) {
        return; // Exit if the global widget handled the translation
      }
    }

    // Fallback: try to find and change the Google Translate select element
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = language.googleCode;
      // Dispatch a 'change' event to trigger Google Translate's internal logic
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  // Prevent hydration mismatch by rendering a placeholder until mounted
  if (!mounted) {
    return (
      <div className="relative">
        {/* Placeholder button to prevent hydration errors */}
        <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span>English</span> {/* Default text */}
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  }

  // Render the actual dropdown once mounted
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true" // Changed from 'listbox' to generic 'true' as the role isn't strictly listbox
      >
        {/* Display selected language name */}
        <span className="hidden md:inline">{selectedLanguage.name}</span>
        {/* Display selected language code on smaller screens */}
        <span className="md:hidden">{selectedLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto">
            <div className="py-1" role="listbox">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    selectedLanguage.code === language.code
                      ? 'bg-orange-100 text-orange-600 font-medium' // Styling for selected language
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600' // Styling for other languages
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
      
      {/* The hidden Google Translate element and status indicator are removed as per the edited snippet */}
    </div>
  );
}