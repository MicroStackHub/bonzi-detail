
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterest, FaCcVisa, FaCcAmex, FaCcMastercard, FaGooglePlay, FaAppStoreIos } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="w-full py-4 sm:py-6 md:py-12 bg-white border-t border-gray-200 mt-4 sm:mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {/* Download Our App */}
            <div className="col-span-2 xs:col-span-2 sm:col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">Download Our App</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Fancy Shopping on the go</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-1.5 sm:p-2 md:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-orange-500 p-1 sm:p-1.5 md:p-2 rounded">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div>
                    <div className="text-[10px] xs:text-xs text-gray-500">Get it on</div>
                    <div className="text-xs font-semibold text-gray-800">Google Play</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-1.5 sm:p-2 md:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-black p-1 sm:p-1.5 md:p-2 rounded">
                    <span className="text-white text-xs font-bold">🍎</span>
                  </div>
                  <div>
                    <div className="text-[10px] xs:text-xs text-gray-500">Download on the</div>
                    <div className="text-xs font-semibold text-gray-800">App Store</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Updated */}
            <div className="col-span-2 xs:col-span-2 sm:col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">Stay Updated</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Subscribe to get the latest deals</p>
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-t-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button className="bg-orange-500 text-white px-2 py-1.5 text-xs rounded-b-md hover:bg-orange-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* About Us */}
            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">About Us</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/about_us/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">About Bonzi Cart</a></li>
                <li><a href="https://www.bonzicart.com/Intellectual_property_claims/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Intellectual Property</a></li>
                <li><a href="https://www.bonzicart.com/terms_and_condition/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/privacy_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* For Sellers */}
            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">For Sellers</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/seller/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Become a Seller</a></li>
                <li><a href="https://www.bonzicart.com/seller/eligibility_to_sell/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Eligibility to Sell</a></li>
                <li><a href="https://www.bonzicart.com/seller/seller_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Seller Policy</a></li>
                <li><a href="https://www.bonzicart.com/contact-us" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* For Buyers */}
            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">For Buyers</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/buyer/terms_and_conditions/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/buyer/protection/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Buyer Protection</a></li>
                <li><a href="https://www.bonzicart.com/buyer/policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Buyer Policy</a></li>
                <li><a href="https://www.bonzicart.com/buyer/return_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>
          </div>
          
          {/* Social Media and Payment Icons - Added for better footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <a href="#" className="text-gray-500 hover:text-orange-500"><FaFacebookF size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-orange-500"><FaInstagram size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-orange-500"><FaTwitter size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-orange-500"><FaLinkedinIn size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-orange-500"><FaYoutube size={16} /></a>
              </div>
              <div className="flex space-x-3">
                <FaCcVisa size={24} className="text-blue-700" />
                <FaCcMastercard size={24} className="text-red-500" />
                <FaCcAmex size={24} className="text-blue-500" />
              </div>
            </div>
            <div className="mt-4 text-center text-[10px] xs:text-xs text-gray-500">
              © {new Date().getFullYear()} Bonzi Cart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
