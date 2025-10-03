
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaTshirt, FaLaptop, FaMobileAlt, FaMicrochip, FaHome, FaBlender, FaTools, FaGem, FaLightbulb, FaSuitcase, FaShoePrints, FaBook, FaShieldAlt, FaFutbol, FaGamepad
} from 'react-icons/fa';

const cartCount = 1;

export default function Header({ scrolled = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <div className="block sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:flex-shrink-0">
            <div className="flex-shrink-0" style={{ minWidth: 120 }}>
              <Link href="/" className="flex items-center bg-white rounded-md px-2 py-1" style={{ minWidth: 120, minHeight: 40 }}>
                <img
                  src="/BonziLogo.png"
                  alt="BonziCart Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:hidden">
              <button className="relative" aria-label="View wishlist">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
              </button>

              <button className="relative" aria-label="View shopping cart">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>
              </button>

              <button className="text-gray-600" aria-label="User account menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 sm:flex-1 sm:max-w-xl sm:mx-6">
            <div className="flex w-full">
              <div className="relative group">
                <label htmlFor="category-select" className="sr-only">Select category</label>
                <select
                  id="category-select"
                  className="px-1 sm:px-2 py-1 sm:py-1.5 pr-5 sm:pr-7 border border-r-0 border-gray-300 bg-gray-50 text-gray-800 text-xs sm:text-sm min-w-0 focus:outline-none focus:bg-white focus:border-orange-500 w-10 sm:w-14 md:w-20 appearance-none"
                >
                  <option value="">All</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                id="search-input"
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-1 sm:px-2 md:px-3 py-1 sm:py-1.5 border border-gray-300 focus:outline-none focus:border-orange-500 text-xs sm:text-sm text-black"
              />
              <button className="px-1.5 sm:px-2.5 md:px-4 py-1 sm:py-1.5 bg-orange-500 text-white hover:bg-orange-600" aria-label="Search">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <button className="relative" aria-label="View wishlist">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </button>

            <button className="relative" aria-label="View shopping cart">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>
            </button>

            <div className="relative">
              <button className="focus:outline-none" onClick={() => setShowUserDropdown((v) => !v)} aria-label="User account menu">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
