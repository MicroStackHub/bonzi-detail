
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function CopyrightStrip() {
  return (
    <div className="w-screen bg-gray-900 text-white py-3 sm:py-6 fixed-full-width">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <img src="/BonziLogo.png" alt="BonziCart Logo" className="h-6 w-6 sm:h-8 sm:w-auto" />
            <span className="text-xs sm:text-sm">© 2022–2025 BonziCart.com. All rights reserved.</span>
          </div>
          <div className="flex space-x-3 sm:space-x-4">
            <span className="text-xs sm:text-sm text-gray-300">Follow Us</span>
            <div className="flex space-x-2 sm:space-x-4">
              <a href="https://www.facebook.com/BonziCart4U#" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.instagram.com/bonzicart/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://x.com/BonziCart" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.linkedin.com/in/bonzi-cart-510646204/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaLinkedinIn className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCOgOz_X-Vk-OWvNS9Dy4KoQ?guided_help_flow=5" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                <FaPinterest className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
