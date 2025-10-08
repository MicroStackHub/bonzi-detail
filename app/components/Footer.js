import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterest, FaCcVisa, FaCcAmex, FaCcMastercard, FaGooglePlay } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-2">
      <div className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Download Our App</h3>
              <p className="text-xs text-gray-600 mb-3">Fancy Shopping on the go</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="block rounded-md p-2 bg-orange-500 text-white flex items-center gap-2 w-40">
                  <FaGooglePlay className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-xs text-white">Get it on <span className="font-semibold">Google Play</span></span>
                </a>
                <a href="#" className="block border rounded-md p-2 bg-white shadow-sm flex items-center gap-2 w-40">
                  <Image src="/BonziLogo.png" alt="Bonzi Logo" width={20} height={20} className="flex-shrink-0" />
                  <span className="text-xs text-gray-500">Download on the <span className="font-semibold">App Store</span></span>
                </a>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Stay Updated</h3>
              <p className="text-xs text-gray-600 mb-3">Subscribe to get the latest deals</p>
              <div className="flex w-full max-w-[160px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-l px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button className="bg-orange-500 text-white px-2 py-1.5 rounded-r text-xs font-medium hover:bg-orange-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">About Us</h3>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/about_us/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">About Bonzi Cart</a></li>
                <li><a href="https://www.bonzicart.com/terms_and_condition/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/privacy_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">For Sellers</h3>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/seller/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Become a Seller</a></li>
                <li><a href="https://www.bonzicart.com/seller/seller_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Seller Policy</a></li>
                <li><a href="https://www.bonzicart.com/contact-us" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">For Buyers</h3>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/buyer/terms_and_conditions/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/buyer/protection/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Buyer Protection</a></li>
                <li><a href="https://www.bonzicart.com/buyer/return_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center space-x-4">
                <a href="https://www.facebook.com/BonziCart4U#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaFacebookF size={14} /></a>
                <a href="https://www.instagram.com/bonzicart/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaInstagram size={14} /></a>
                <a href="https://x.com/BonziCart" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaTwitter size={14} /></a>
                <a href="https://www.linkedin.com/in/bonzi-cart-510646204/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaLinkedinIn size={14} /></a>
                <a href="https://www.youtube.com/channel/UCOgOz_X-Vk-OWvNS9Dy4KoQ" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaYoutube size={14} /></a>
              </div>
              <div className="flex items-center space-x-3">
                <FaCcVisa size={20} className="text-blue-700" />
                <FaCcMastercard size={20} className="text-red-500" />
                <FaCcAmex size={20} className="text-blue-500" />
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Bonzi Cart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
