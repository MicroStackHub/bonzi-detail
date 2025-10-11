'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Header styles are applied using Tailwind utility classes to keep styles scoped and predictable.
// Removed CSS module import to avoid style bleed; global or Tailwind classes are used instead.
import Link from 'next/link';
import {
  FaTshirt, FaLaptop, FaMobileAlt, FaMicrochip, FaHome, FaBlender, FaTools, FaGem, FaLightbulb, FaSuitcase, FaShoePrints, FaBook, FaShieldAlt, FaFutbol, FaGamepad
} from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [categoryFacets, setCategoryFacets] = useState([]);
  const debounceTimerRef = useRef(null);
  const router = useRouter();

  const categories = [
    { name: 'Apparel Accessories', icon: <FaTshirt /> },
    { name: 'Computer and Office', icon: <FaLaptop /> },
    { name: 'Consumer Electronics', icon: <FaMobileAlt /> },
    { name: 'Electronic Components', icon: <FaMicrochip /> },
    { name: 'Home & Garden', icon: <FaHome /> },
    { name: 'Home Appliances', icon: <FaBlender /> },
    { name: 'Home Improvement', icon: <FaTools /> },
    { name: 'Jewelry and Accessories', icon: <FaGem /> },
    { name: 'Lights & Lighting', icon: <FaLightbulb /> },
    { name: 'Luggage & Bags', icon: <FaSuitcase /> },
    { name: 'Shoes', icon: <FaShoePrints /> },
    { name: 'Office & School Supplies', icon: <FaBook /> },
    { name: 'Security & Protection', icon: <FaShieldAlt /> },
    { name: 'Sports & Entertainment', icon: <FaFutbol /> },
    { name: 'Toys & Hobbies', icon: <FaGamepad /> },
  ];

  // Fetch cart data on component mount and set up polling
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        // Get bearer token from local storage
        const bearerToken = localStorage.getItem('bearerToken') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjBjMTIwZS0zY2IwLTQ3OGMtOTY0Yi1hM2ZhZmFjMDFhNGIiLCJqdGkiOiJhNGQzOWM5NjEyZjNkMjBiNDMwOThiNmZjNmMwZGY4ZWU5ZGQ2OTk0ZWFiMjVjOGQ2Y2Y3YWViYWE5MmY5NzY4ZjZhZDI0MzNlZmQ5M2FmOSIsImlhdCI6MTc2MDAxODg4OS45MDI2NDEsIm5iZiI6MTc2MDAxODg4OS45MDI2NDQsImV4cCI6MTc5MTU1NDg4OS44NjYwNTgsInN1YiI6IjUiLCJzY29wZXMiOlsiKiJdfQ.Jz0-usKv6r92872cz71UvFbU75Ah0GZEo8RqCts6JmVdnAn5FXU-kWePf8ldB9hMqHvQJfgAFzRjKUDEMqBOo684ISIGVmhdO5b51r4oWLMrHWdpJnPB9MX4UJzVyfgRl0CfgitJcCgsqIVgwl1FdIhVfcKkCptaSEzITgdyhLqCMIys_CaU6CXcGPbO2usSEVGJTDAVCc_1KGXKvnyHTj29ZPcM09EHJR-9hD8OtCUmBuU3CYnhEgHCzkfSuost-5ropuSJ51QmKdVYHMQFINRCIZILzuk-hBXaCCvdsh0dFc7ELZ4K_qFE2SYX9AuZVrlR9qgItMkLxaSI6m_ZC3nRKGqLDRDv5Lf85u1liLoEoWMl6VlUz5hSVfyHBikoXMKZja81Zv1AJZ67Xb5cOQUDyc4ozHim2rmoEKAd0YBaPdfgxbLicD6uS5c0Je9GSc9wc381Zy6hOTNFArneU3ydZ4C2SKIyatqMjRxUETpgDL1qeeDtS15ZbXRaHBZqGzBXaub2EHMnVQV81akgiR054XPUViHcf-sbVdzUI-gZF_5JeKIyKuS1fWwxfbNONPTGQFo1FFJyeKsnBG-LHAitAfxBvikkXf0kyUwC2q6XkKie31mUDS46IvU0XrNtrpKn7drV6WEFCpeMuh7OIX1WVsM6KuxeF4WdLF8s6B8';

        const response = await fetch('https://api.glst.in/api/v3/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
          },
        });

        const data = await response.json();

        if (data.success && data.data) {
          setCartCount(data.data.cart_count || 0);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
        setCartCount(0);
      }
    };

    // Initial fetch
    fetchCartCount();

    // Listen for cart update events
    const handleCartUpdate = () => {
      fetchCartCount();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Poll every 5 seconds to keep cart count updated
    const interval = setInterval(fetchCartCount, 5000);

    // Cleanup interval and event listener on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // --- Typesense integration for search/autocomplete (client-side) ---
  useEffect(() => {
    // fetch category facets once on mount
    const fetchCategories = async () => {
      try {
        const typesenseHost = 'https://search.bonzicart.com';
        const apiKey = 'Surat';
        const collectionName = 'bnz-product';
        const params = new URLSearchParams({ q: '*', query_by: 'name', facet_by: 'categories', per_page: '0' });
        const url = `${typesenseHost}/collections/${collectionName}/documents/search?${params.toString()}`;
        console.debug('[Typesense] categories GET ->', url);
        const res = await fetch(url, { method: 'GET', headers: { 'X-TYPESENSE-API-KEY': apiKey } });
        if (!res.ok) {
          const text = await res.text();
          console.warn('Typesense categories fetch not ok', res.status, text);
          return;
        }
        const json = await res.json();
        const categories = json.facet_counts?.find(f => f.field_name === 'categories');
        if (categories) {
          setCategoryFacets(categories.counts || []);
        }
      } catch (err) {
        // surface errors to console for debugging
        console.debug('Typesense categories fetch failed', err);
      }
    };
    fetchCategories();
  }, []);

  // Debounced suggestions fetch
  const fetchSuggestions = (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    // debounce
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const typesenseHost = 'https://search.bonzicart.com';
        const apiKey = 'Surat';
        const collectionName = 'bnz-product';
        const params = new URLSearchParams({
          q: query,
          query_by: 'name,brand',
          prefix: 'true',
          per_page: '10',
          facet_by: 'brand,categories'
        });
        const url = `${typesenseHost}/collections/${collectionName}/documents/search?${params.toString()}`;
        console.debug('[Typesense] suggestions GET ->', url);
        const res = await fetch(url, { method: 'GET', headers: { 'X-TYPESENSE-API-KEY': apiKey } });
        if (!res.ok) {
          const txt = await res.text();
          console.warn('Typesense suggestions fetch not ok', res.status, txt);
          setSuggestions([]);
          return;
        }
        const json = await res.json();
        console.debug('[Typesense] suggestions response', json);
        const suggestionsArr = generateCompletionSuggestions(query, json);
        setSuggestions(suggestionsArr);
      } catch (err) {
        console.debug('Typesense suggestions fetch failed', err);
        setSuggestions([]);
      }
    }, 250);
  };

  // ported suggestion generator (sanitizes and extracts next-word completions)
  const generateCompletionSuggestions = (query, response) => {
    const suggestionsSet = new Set();
    const lowerQuery = (query || '').toLowerCase();

    const cleanText = (text) => {
      return (text || '')
        .replace(/[^a-zA-Z0-9\s%\-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const queryWords = lowerQuery.split(/\s+/).filter(Boolean);
    const lastWord = queryWords[queryWords.length - 1] || '';

    (response.hits || []).forEach(hit => {
      const name = hit.document?.name || '';
      const words = name.split(/\s+/);
      if (name.toLowerCase().startsWith(lowerQuery)) {
        const remaining = words.slice(queryWords.length);
        if (remaining.length > 0) suggestionsSet.add(cleanText(query + ' ' + remaining[0]));
        if (remaining.length > 1) suggestionsSet.add(cleanText(query + ' ' + remaining.slice(0,2).join(' ')));
      }

      for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase().startsWith(lastWord)) {
          if (i < words.length - 1) {
            suggestionsSet.add(cleanText((queryWords.slice(0, -1).join(' ') + ' ' + words.slice(i, i + 2).join(' ')).trim()));
          }
          if (i < words.length - 2) {
            suggestionsSet.add(cleanText((queryWords.slice(0, -1).join(' ') + ' ' + words.slice(i, i + 3).join(' ')).trim()));
          }
        }
      }
    });

    const brandFacet = response.facet_counts?.find(f => f.field_name === 'brand');
    if (brandFacet) {
      brandFacet.counts.forEach(b => {
        if (b.value.toLowerCase().startsWith(lowerQuery)) suggestionsSet.add(cleanText(b.value));
      });
    }

  const catFacet = response.facet_counts?.find(f => f.field_name === 'categories');
    if (catFacet) {
      catFacet.counts.forEach(c => {
        if (c.value.toLowerCase().startsWith(lowerQuery)) suggestionsSet.add(cleanText(c.value));
      });
    }

    return Array.from(suggestionsSet).filter(s => s.length > 0).slice(0, 10);
  };

  // perform search (navigate)
  const performSearch = (explicitQuery) => {
    // prefer explicitQuery, fall back to searchQuery, then empty string
    const q = (explicitQuery ?? searchQuery ?? '').trim();
    let link = '/search';
    if (selectedCategory) link += '/' + encodeURIComponent(selectedCategory);
    link = `${link}?query=${encodeURIComponent(q)}`;
    // use router to navigate
    router.push(link);
  };

  useEffect(() => {
    const handleDocClick = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setCategoryOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);
  return (
    <header className={`site-header w-full z-50 bg-white transition-all duration-300 sticky top-0`}>
      <div className="w-full py-2 px-0 sm:py-4">
        <div className="sm:max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-0 sm:px-4">
          <div className="flex items-center justify-between sm:flex-shrink-0">
            <div className="flex-shrink-0 min-w-[120px] max-[360px]:min-w-[96px]">
              {scrolled ? (
                <div className="relative flex items-center justify-center min-w-[120px] min-h-[40px] max-[360px]:min-w-[96px] max-[360px]:min-h-[36px]">
                  <div
                    className="inline-block"
                    onMouseEnter={() => setShowCategoriesDropdown(true)}
                    onMouseLeave={() => setShowCategoriesDropdown(false)}
                  >
                    <button
                      className="flex flex-col space-y-1 p-2 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Open categories menu"
                    >
                      <div className="w-6 h-0.5 bg-gray-600"></div>
                      <div className="w-6 h-0.5 bg-gray-600"></div>
                      <div className="w-6 h-0.5 bg-gray-600"></div>
                    </button>

                    {showCategoriesDropdown && (
                      <div className="absolute top-full left-0 sm:left-0 -mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[200px] w-auto">
                        <div className="p-3 max-h-[70vh] overflow-y-auto">
                          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Categories
                          </h3>

                          <div className="grid grid-cols-1 gap-1">
                            {categories.map((category, index) => (
                              <a
                                key={index}
                                href="#"
                                className="flex items-center py-1.5 px-2 text-gray-600 hover:bg-gray-100 hover:text-orange-500 rounded-md transition-colors text-xs whitespace-nowrap"
                              >
                                <span className="mr-2 text-base flex-shrink-0">{category.icon}</span>
                                <span className="text-xs">{category.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link href="/" className="flex items-center bg-white rounded-md px-2 py-1 min-w-[120px] min-h-[40px] max-[360px]:min-w-[96px] max-[360px]:min-h-[36px]">
                  <img
                    src="/BonziLogo.png"
                    alt="BonziCart Logo"
                    className="h-8 sm:h-10 w-auto object-contain max-[360px]:h-7"
                  />
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:hidden max-[360px]:space-x-1">
              <button
                className="relative"
                aria-label="View wishlist"
              >
                <svg className="w-5 h-5 max-[360px]:w-4 max-[360px]:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs max-[360px]:text-[10px] rounded-full px-1">0</span>
              </button>

              <Link href="https://www.bonzicart.com/shopping-cart" className="relative" aria-label="View shopping cart">
                <svg className="w-5 h-5 max-[360px]:w-4 max-[360px]:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs max-[360px]:text-[10px] rounded-full px-1">{cartCount}</span>
              </Link>

              {/* <div className="sm:hidden">
                <LanguageSelector />
              </div> */}

              <button
                className="text-gray-600"
                aria-label="User account menu"
              >
                <svg className="w-5 h-5 max-[360px]:w-4 max-[360px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 sm:flex-1 sm:max-w-xl sm:mx-6">
            <div className="relative flex w-full rounded-md overflow-visible shadow-sm max-[360px]:text-[12px] border border-gray-200">
              {/* Custom dynamic-width category dropdown near search */}
              <div className="relative" ref={categoryRef}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={categoryOpen}
                  onClick={() => setCategoryOpen((v) => !v)}
                  className="px-2 py-2 h-10 max-[360px]:h-9 text-sm max-[360px]:text-xs md:text-md bg-white hover:bg-orange-50 focus:outline-none focus:ring-0 focus:border-gray-300 active:outline-none active:ring-0 active:border-gray-300 whitespace-nowrap flex items-center gap-1.5 w-auto min-w-[6rem] max-[360px]:min-w-[5rem] max-w-[50%] md:max-w-[18rem]"
                >
                  <span className="text-gray-800">{selectedCategory}</span>
                  <svg className="w-4 h-4 max-[360px]:w-3.5 max-[360px]:h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {categoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-50 w-auto min-w-0 inline-block">
                    <ul role="listbox" className="py-1 max-h-[70vh] overflow-auto">
                      <li>
                        <button
                          type="button"
                          role="option"
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white whitespace-nowrap"
                          onClick={() => { setSelectedCategory('All Categories'); setCategoryOpen(false); }}
                        >
                          All Categories
                        </button>
                      </li>
                      {categories.map((category, idx) => (
                        <li key={idx}>
                          <button
                            type="button"
                            role="option"
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white whitespace-nowrap"
                            onClick={() => { setSelectedCategory(category.name); setCategoryOpen(false); }}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative flex-1 flex">
                <label htmlFor="search-input" className="sr-only">Search</label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); fetchSuggestions(e.target.value); }}
                  spellCheck="false"
                  autoComplete="off"
                  className="pl-3 pr-10 max-[360px]:pr-9 py-2.5 max-[360px]:py-2 focus:outline-none focus:ring-0 focus:border-0 block w-full text-sm max-[360px]:text-xs text-gray-700 h-10 max-[360px]:h-9"
                />
                {/* Suggestions dropdown rendered from outer container to span category + input + button */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 max-[360px]:px-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4 max-[360px]:w-3.5 max-[360px]:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              {suggestions && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-8 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto text-sm">
                  {suggestions.map((s, idx) => (
                    <li key={idx} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => { setSearchQuery(s); setSuggestions([]); performSearch(s); }}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <button
              className="relative"
              aria-label="View wishlist"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </button>

            <Link href="https://www.bonzicart.com/shopping-cart" className="relative" aria-label="View shopping cart">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>
            </Link>

            <div className="relative">
              <button
                className="focus:outline-none"
                onClick={() => setShowUserDropdown((v) => !v)}
                tabIndex={0}
                aria-label="User account menu"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-0.5"
                     onMouseLeave={() => setShowUserDropdown(false)}>
                  <div className="divide-y divide-gray-200">
                    <div className="py-2">
                      <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 text-sm transition-colors">
                        <span className="mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span> My Account
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 text-sm transition-colors">
                        <span className="mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg></span> My Orders
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 text-sm transition-colors">
                        <span className="mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg></span> My Message
                      </a>
                    </div>
                    <div className="py-2 px-4">
                      <div className="text-black text-center font-semibold mb-2 text-sm">Buyer Central</div>
                      <Link href="/register" className="w-full block border border-orange-400 text-orange-600 rounded py-1 mb-2 font-semibold hover:bg-orange-50 text-sm text-center">
                        Register
                      </Link>
                      <Link href="/login" className="w-full block bg-orange-500 text-white rounded py-1 font-semibold hover:bg-orange-600 text-sm text-center">
                        Login
                      </Link>
                    </div>
                    <div className="py-2 px-4">
                      <div className="text-gray-700 text-center font-semibold mb-2 text-sm">Seller Central</div>
                      <Link href="/login" className="w-full block border border-orange-400 text-orange-600 rounded py-1 mb-2 font-semibold hover:bg-orange-50 text-sm text-center">
                        Login
                      </Link>
                      <button className="w-full bg-orange-500 text-white rounded py-1 font-semibold hover:bg-orange-600 text-sm">Create Account</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECOND ROW - Quick Links */}
        <div className="mt-3 px-0 sm:px-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-center flex-1 overflow-hidden">
              {/* Always scrollable - unified approach for all screens */}
              <div className="overflow-x-auto scrollbar-hide w-full" aria-label="Quick links">
                <div className="flex justify-start sm:justify-center space-x-3 sm:space-x-4 lg:space-x-6 min-w-max text-xs sm:text-sm px-2 sm:px-0">
                  <a href="https://www.bonzicart.com/sales/deals-special-offers" className="text-gray-600 hover:text-orange-500 bg-gray-100 hover:bg-orange-50 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded transition-colors whitespace-nowrap">Deals & Special Offers</a>
                  <a href="https://www.bonzicart.com/sales/exclusive-sales" className="text-gray-600 hover:text-orange-500 bg-gray-100 hover:bg-orange-50 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded transition-colors whitespace-nowrap">Exclusive Sales</a>
                  <a href="https://www.bonzicart.com/sales/diy" className="text-gray-600 hover:text-orange-500 bg-gray-100 hover:bg-orange-50 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded transition-colors whitespace-nowrap">DIY</a>
                  <a href="https://www.bonzicart.com/sales/smart-home" className="text-gray-600 hover:text-orange-500 bg-gray-100 hover:bg-orange-50 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded transition-colors whitespace-nowrap">SMART HOME</a>
                </div>
              </div>
            </div>

            <div className="ml-4 hidden sm:block">
              <LanguageSelector />
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}