export default function Home() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BonziCart
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted e-commerce platform for quality products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse thousands of products across multiple categories</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">💯</div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">100% authentic products with buyer protection</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Special Deals & Offers</h2>
          <p className="text-lg mb-6">Get up to 70% off on selected items</p>
          <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}