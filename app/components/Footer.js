
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterest, FaCcVisa, FaCcAmex, FaCcMastercard } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full py-3 sm:py-4 bg-white border-t border-gray-200 mt-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="col-span-2 xs:col-span-2 sm:col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">Download Our App</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Fancy Shopping on the go</p>
            </div>

            <div className="col-span-2 xs:col-span-2 sm:col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">Stay Updated</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Subscribe to get the latest deals</p>
            </div>

            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">About Us</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/about_us/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">About Bonzi Cart</a></li>
                <li><a href="https://www.bonzicart.com/terms_and_condition/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/privacy_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">For Sellers</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/seller/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Become a Seller</a></li>
                <li><a href="https://www.bonzicart.com/seller/seller_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Seller Policy</a></li>
                <li><a href="https://www.bonzicart.com/contact-us" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-2 md:mb-4">For Buyers</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="https://www.bonzicart.com/buyer/terms_and_conditions/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/buyer/protection/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Buyer Protection</a></li>
                <li><a href="https://www.bonzicart.com/buyer/return_policy/" className="text-[10px] xs:text-xs md:text-sm text-gray-600 hover:text-orange-600 transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5">
              <div className="flex items-center space-x-2">
                <a href="https://www.facebook.com/BonziCart4U#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaFacebookF size={12} /></a>
                <a href="https://www.instagram.com/bonzicart/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaInstagram size={12} /></a>
                <a href="https://x.com/BonziCart" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaTwitter size={12} /></a>
                <a href="https://www.linkedin.com/in/bonzi-cart-510646204/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaLinkedinIn size={12} /></a>
                <a href="https://www.youtube.com/channel/UCOgOz_X-Vk-OWvNS9Dy4KoQ" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><FaYoutube size={12} /></a>
              </div>
              <div className="flex items-center space-x-1.5">
                <FaCcVisa size={18} className="text-blue-700" />
                <FaCcMastercard size={18} className="text-red-500" />
                <FaCcAmex size={18} className="text-blue-500" />
              </div>
            </div>
            <div className="mt-2 text-center text-[10px] text-gray-500">
              © {new Date().getFullYear()} Bonzi Cart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
