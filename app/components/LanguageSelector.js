
'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
];

export default function LanguageSelector({ isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);

    // Trigger Google Translate
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = language.code;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${
          isMobile 
            ? 'px-2 py-1.5 text-xs' 
            : 'px-3 py-2 text-sm'
        } bg-white border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
        aria-label="Select language"
      >
        <FaGlobe className={`${isMobile ? 'text-sm' : 'text-base'} text-orange-500`} />
        <span className="font-medium text-gray-700">{selectedLanguage.native}</span>
        <svg
          className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            isMobile ? 'right-0 top-full mt-1' : 'right-0 top-full mt-2'
          } w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto`}
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Select Language
            </div>
            <div className="space-y-1">
              {INDIAN_LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors ${
                    selectedLanguage.code === language.code
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{language.native}</span>
                    <span className="text-xs text-gray-500">{language.name}</span>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <FaCheck className="text-orange-500 text-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
