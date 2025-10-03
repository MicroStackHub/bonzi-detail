'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiChevronDown, FiUser } from 'react-icons/fi';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Row */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <span>📞 Support: 1800-000-0000</span>
              <span>📧 help@bonzicart.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/seller" className="hover:underline text-sm">
                Sell on BonziCart
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:underline text-sm">
                  <FiUser className="w-4 h-4" />
                  <span>Account</span>
                  <FiChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
                  <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                    Login
                  </Link>
                  <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                    Register
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <Link href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">
                    Wishlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/BonziLogo.png"
              alt="BonziCart"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Categories Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 font-medium">
                <span>Categories</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl border border-gray-200 py-2">
                  <Link href="/category/electronics" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500">
                    Electronics
                  </Link>
                  <Link href="/category/fashion" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500">
                    Fashion
                  </Link>
                  <Link href="/category/home" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500">
                    Home & Kitchen
                  </Link>
                  <Link href="/category/beauty" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500">
                    Beauty & Personal Care
                  </Link>
                  <Link href="/category/sports" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500">
                    Sports & Fitness
                  </Link>
                </div>
              )}
            </div>

            <Link href="/deals" className="text-gray-700 hover:text-orange-500 font-medium">
              Deals
            </Link>
            <Link href="/exclusive" className="text-gray-700 hover:text-orange-500 font-medium">
              Exclusive Sales
            </Link>
            <Link href="/diy" className="text-gray-700 hover:text-orange-500 font-medium">
              DIY
            </Link>
            <Link href="/smart-home" className="text-gray-700 hover:text-orange-500 font-medium">
              Smart Home
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/wishlist" className="relative text-gray-700 hover:text-orange-500">
              <FiHeart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-orange-500">
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-700 hover:text-orange-500"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <FiX className="w-6 h-6" />
              </button>
              <nav className="mt-8 space-y-4">
                <Link href="/" className="block text-gray-700 hover:text-orange-500 font-medium">
                  Home
                </Link>
                <Link href="/categories" className="block text-gray-700 hover:text-orange-500 font-medium">
                  Categories
                </Link>
                <Link href="/deals" className="block text-gray-700 hover:text-orange-500 font-medium">
                  Deals
                </Link>
                <Link href="/exclusive" className="block text-gray-700 hover:text-orange-500 font-medium">
                  Exclusive Sales
                </Link>
                <Link href="/diy" className="block text-gray-700 hover:text-orange-500 font-medium">
                  DIY
                </Link>
                <Link href="/smart-home" className="block text-gray-700 hover:text-orange-500 font-medium">
                  Smart Home
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}