import Layout from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import ProductCarousel from '../components/ProductCarousel';
import ProductCard from '../components/ProductCard';
import { 
  FaTshirt, FaLaptop, FaMobileAlt, FaMicrochip, FaHome, FaBlender, FaTools, FaGem, FaLightbulb, FaSuitcase, FaShoePrints, FaBook, FaShieldAlt, FaFutbol, FaGamepad 
} from 'react-icons/fa';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: "HIKMICRO Lightning Digital Scope Wireless Long-Distance...",
    price: 500.00,
    originalPrice: 800.00,
    rating: 4,
    reviews: 125
  },
  {
    id: 2,
    title: "Solar Jet Toy Car Electric Scientific Experiment...",
    price: 299.00,
    originalPrice: 399.00,
    rating: 5,
    reviews: 89
  },
  {
    id: 3,
    title: "114 Intelligent Manual Magnetic Cards Building Vehicle...",
    price: 252.00,
    originalPrice: 350.00,
    rating: 4,
    reviews: 256
  },
  {
    id: 4,
    title: "Mini Excavator Toy Building Vehicle 4-CH Remote...",
    price: 650.00,
    originalPrice: 850.00,
    rating: 5,
    reviews: 143
  },
  {
    id: 5,
    title: "3D Assembly Manual Magnetic Cards Building Vehicle Toys Manual...",
    price: 635.00,
    originalPrice: 835.00,
    rating: 4,
    reviews: 198
  },
  {
    id: 6,
    title: "Virtual Mouse Anti-Sleep Automatic Cursor Move Keep",
    price: 465.00,
    originalPrice: 1200.00,
    rating: 4,
    reviews: 67
  },
  {
    id: 7,
    title: "Itchy Scratcher Portable Extendable Itchy",
    price: 205.00,
    originalPrice: 305.00,
    rating: 5,
    reviews: 34
  },
  {
    id: 8,
    title: "Gold Imitation Floral Drop Earrings Elegant and Fashion",
    price: 465.00,
    originalPrice: 695.00,
    rating: 4,
    reviews: 89
  },
  {
    id: 9,
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 899.00,
    originalPrice: 1299.00,
    rating: 4,
    reviews: 312
  },
  {
    id: 10,
    title: "Smart Fitness Tracker with Heart Rate Monitor",
    price: 1299.00,
    originalPrice: 1799.00,
    rating: 5,
    reviews: 456
  },
  {
    id: 11,
    title: "Professional DSLR Camera with 18-55mm Lens",
    price: 25999.00,
    originalPrice: 32999.00,
    rating: 4,
    reviews: 89
  },
  {
    id: 12,
    title: "Gaming Mechanical Keyboard RGB Backlit",
    price: 3499.00,
    originalPrice: 4999.00,
    rating: 5,
    reviews: 234
  },
  {
    id: 13,
    title: "4K Ultra HD Smart LED Television 55 inch",
    price: 45999.00,
    originalPrice: 59999.00,
    rating: 4,
    reviews: 167
  },
  {
    id: 14,
    title: "Portable Power Bank 20000mAh Fast Charging",
    price: 1299.00,
    originalPrice: 1999.00,
    rating: 4,
    reviews: 523
  },
  {
    id: 15,
    title: "Stainless Steel Electric Kettle 1.7L Capacity",
    price: 1899.00,
    originalPrice: 2499.00,
    rating: 5,
    reviews: 298
  },
  {
    id: 16,
    title: "Cordless Vacuum Cleaner with HEPA Filter",
    price: 15999.00,
    originalPrice: 21999.00,
    rating: 4,
    reviews: 145
  },
  {
    id: 17,
    title: "Wireless Charging Pad with Fast Charge Technology",
    price: 899.00,
    originalPrice: 1299.00,
    rating: 4,
    reviews: 378
  },
  {
    id: 18,
    title: "Professional Hair Dryer with Ionic Technology",
    price: 2499.00,
    originalPrice: 3499.00,
    rating: 5,
    reviews: 201
  },
  {
    id: 19,
    title: "Smart Home Security Camera with Night Vision",
    price: 3499.00,
    originalPrice: 4999.00,
    rating: 4,
    reviews: 412
  },
  {
    id: 20,
    title: "Bluetooth Wireless Speaker Waterproof",
    price: 2999.00,
    originalPrice: 3999.00,
    rating: 5,
    reviews: 567
  },
  {
    id: 21,
    title: "Ergonomic Office Chair with Lumbar Support",
    price: 8999.00,
    originalPrice: 12999.00,
    rating: 4,
    reviews: 189
  },
  {
    id: 22,
    title: "Digital Drawing Tablet with Stylus Pen",
    price: 4999.00,
    originalPrice: 6999.00,
    rating: 5,
    reviews: 156
  },
  {
    id: 23,
    title: "Coffee Maker with Built-in Grinder",
    price: 7999.00,
    originalPrice: 10999.00,
    rating: 4,
    reviews: 234
  },
  {
    id: 24,
    title: "LED Strip Lights RGB with Remote Control",
    price: 799.00,
    originalPrice: 1199.00,
    rating: 4,
    reviews: 445
  },
  {
    id: 25,
    title: "Wireless Gaming Mouse with RGB Lighting",
    price: 1499.00,
    originalPrice: 1999.00,
    rating: 5,
    reviews: 678
  }
];

const exclusiveProducts = [
  {
    id: 9,
    title: "Large Capacity Modular Storage Box",
    price: 2999,
    originalPrice: 6960,
    rating: 4,
    reviews: 145
  },
  {
    id: 10,
    title: "Magnetic Tea Separation Cup",
    price: 3480,
    originalPrice: 7400,
    rating: 5,
    reviews: 78
  }
];

const mostSearchedProducts = [
  {
    id: 11,
    title: "Travel Cosmetic Bags Waterproof Makeup Bag",
    price: 299,
    rating: 4,
    reviews: 234
  },
  {
    id: 12,
    title: "4DRC V17 EPP Foam RC airplane 2.4GHz Remote Control",
    price: 1299,
    rating: 5,
    reviews: 156
  },
  {
    id: 13,
    title: "Handheld Portable 500x Fixed Magnification Microscope",
    price: 899,
    rating: 4,
    reviews: 89
  },
  {
    id: 14,
    title: "Rotatable Grain Storage Box Separated Storage",
    price: 599,
    rating: 5,
    reviews: 123
  },
  {
    id: 15,
    title: "Wall Mounted Iron Board Holder with Steel Hooks",
    price: 399,
    rating: 4,
    reviews: 67
  },
  {
    id: 16,
    title: "Nordic Light Luxury Home Furnishing Astronaut",
    price: 1299,
    rating: 5,
    reviews: 234
  }
];

export default function Home() {
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
    <Layout>
      <div className="pt-20 sm:pt-24 md:pt-28">
        {/* Mobile: Stack layout, Tablet/Desktop: Side-by-side layout */}
        <div className="block lg:flex lg:gap-2 lg:items-stretch">
          {/* Categories Section - Desktop: Sidebar only */}
          <div className="hidden lg:block lg:w-60 lg:flex-shrink-0 min-h-[680px] h-full min-w-[190px]">
            <div className="bg-white rounded-lg shadow-sm p-3 h-full sticky top-24 flex flex-col min-h-0">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center flex-shrink-0">
                <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Categories
              </h3>

              {/* Desktop: Vertical scroll */}
              <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pb-0 px-1">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center py-1.5 px-2 text-gray-600 hover:bg-gray-100 hover:text-orange-500 rounded-md transition-colors text-xs whitespace-normal flex-shrink"
                  >
                    <span className="mr-2 text-base">{category.icon}</span>
                    <span>{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:flex-1 lg:ml-2 lg:space-y-4 lg:h-full">
            {/* Hero Banner + Exclusive Sales - Mobile: Hero only, Tablet+: Side-by-side */}
            <div className="block md:grid md:grid-cols-10 md:gap-6 md:mb-4 space-y-4 md:space-y-0">
              {/* Hero Banner - Full width on mobile, 7/10 on tablet+ */}
              <div className="w-full md:col-span-7">
                <div className="h-64 sm:h-72 md:h-80">
                  <HeroBanner />
                </div>
              </div>

              {/* Exclusive Sales - Hidden on mobile, 3/10 on tablet+ */}
              <div className="hidden md:block md:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-3 h-64 sm:h-72 md:h-80">
                  <h3 className="text-base font-semibold text-orange-500 mb-3">Exclusive Sales</h3>

                  <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                    <div className="animate-scroll-vertical space-y-3">
                      {[...exclusiveProducts, ...exclusiveProducts, ...exclusiveProducts].map((product, index) => (
                        <div key={`${product.id}-${index}`} className="border-b pb-3 last:border-b-0">
                          <div className="w-full h-16 sm:h-18 md:h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Product Image</span>
                          </div>
                          <h4 className="font-medium text-gray-800 text-xs mb-2 line-clamp-2">{product.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 text-xs line-through">₹{product.originalPrice}</span>
                            <span className="text-sm font-bold text-red-500">₹{product.price}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400 text-xs">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deals & Special Offers - Full width below banner and exclusive sales */}
            <div className="bg-white rounded-lg shadow-sm  sm:p-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Deals & Special Offers</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4">
                {mockProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="relative group">
                    {/* Discount Badge */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full z-10 font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>

                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Carousels - Full width */}
        <div className="mt-8 sm:mt-10 lg:mt-10">
          <ProductCarousel 
            title="Fall in Love With Collections"
            products={mockProducts}
          />
        </div>

        <div className="text-center my-4 sm:my-6">
          <button className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-2 rounded-md hover:bg-orange-600 transition-colors text-sm sm:text-base">
            SHOW MORE
          </button>
        </div>

        <div className="mb-6 sm:mb-8">
          <ProductCarousel 
            title="Most Searched Products"
            products={mostSearchedProducts}
          />
        </div>
      </div>
    </Layout>
  );
}