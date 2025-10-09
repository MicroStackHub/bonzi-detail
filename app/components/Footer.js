// Simple, clean footer inspired by the provided design screenshot

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: promo + subscribe */}
          <div className="lg:col-span-3">
            <div>
              <div className="text-sm font-semibold text-gray-800">Fancy Shopping on the go</div>
              <div className="mt-2 flex items-center gap-2">
                <a href="#" className="inline-flex items-center rounded-md bg-black text-white px-2.5 py-1.5 text-xs shadow-sm hover:opacity-90 transition">
                  <span className="font-medium">Get it on</span>
                  <span className="ml-1 font-semibold">Google Play</span>
                </a>
                <a href="#" className="inline-flex items-center rounded-md bg-black text-white px-2.5 py-1.5 text-xs shadow-sm hover:opacity-90 transition">
                  <span className="font-medium">Download on the</span>
                  <span className="ml-1 font-semibold">App Store</span>
                </a>
              </div>
            </div>

            <hr className="my-2 border-gray-200" />

            <div>
              <div className="text-sm text-gray-700">Subscribe to get the latest deals and more</div>
              <div className="mt-2 flex w-full max-w-xs sm:max-w-sm">
                <input
                  type="email"
                  placeholder="Enter email to subscribe"
                  className="flex-1 border border-gray-300 rounded-l-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <button className="rounded-r-md bg-green-500 text-white px-3.5 py-1.5 text-sm font-medium hover:bg-green-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider on large screens */}
          <div className="hidden lg:flex lg:col-span-1 lg:items-stretch lg:justify-center">
            <div className="w-px bg-gray-200" />
          </div>

          {/* Right: link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-800 mb-3">About Us</div>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/about_us/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">About Bonzi Cart</a></li>
                <li><a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Intellectual property claims</a></li>
                <li><a href="https://www.bonzicart.com/terms_and_condition/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/privacy_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800 mb-3">Seller</div>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/seller/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Become a Seller</a></li>
                <li><a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Eligibility to sell</a></li>
                <li><a href="https://www.bonzicart.com/seller/seller_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Seller policy</a></li>
                <li><a href="https://www.bonzicart.com/contact-us" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800 mb-3">Buyer</div>
              <ul className="space-y-2">
                <li><a href="https://www.bonzicart.com/buyer/terms_and_conditions/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Buyer Terms & Conditions</a></li>
                <li><a href="https://www.bonzicart.com/buyer/protection/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Buyer Protection</a></li>
                <li><a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Buyer policy</a></li>
                <li><a href="https://www.bonzicart.com/buyer/return_policy/" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">Shipping & Return Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Bonzi Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
