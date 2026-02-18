'use client';
import Link from 'next/link';
import { useState } from 'react';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sample data
  const categories = [
    { name: 'All', icon: '🌿' },
    { name: 'Sarees', icon: '🧣' },
    { name: 'Kurtas', icon: '👘' },
    { name: 'Jewelry', icon: '💍' },
    { name: 'Home Decor', icon: '🏺' },
    { name: 'Accessories', icon: '👜' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: 8999,
      originalPrice: 12999,
      image: '/products/saree1.jpg',
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: 'Handcrafted Pearl Necklace',
      price: 5999,
      originalPrice: 8999,
      image: '/products/jewelry1.jpg',
      rating: 4.9,
      isNew: false
    },
    {
      id: 3,
      name: 'Printed Cotton Kurta Set',
      price: 2499,
      originalPrice: 3499,
      image: '/products/kurta1.jpg',
      rating: 4.5,
      isNew: true
    },
    {
      id: 4,
      name: 'Brass Pooja Thali',
      price: 1799,
      originalPrice: 2499,
      image: '/products/decor1.jpg',
      rating: 4.7,
      isNew: false
    },
  ];

  const saleProducts = featuredProducts.filter(product => product.originalPrice > product.price);
  const newArrivals = featuredProducts.filter(product => product.isNew);

  return (
    <div className="min-h-screen bg-amber-50">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <section className="mb-12 relative rounded-xl overflow-hidden">
          <div className="bg-amber-700 h-64 md:h-96 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Festive Season Sale</h1>
              <p className="text-xl mb-6">Upto 50% off on traditional wear</p>
              <button className="bg-white text-amber-800 px-6 py-2 rounded-full font-medium hover:bg-amber-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(c => c.name !== 'All').map((category) => (
              <Link 
                key={category.name} 
                href={`/category/${category.name.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-900">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-amber-700 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Sale Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-900">Hot Deals</h2>
            <Link href="/sale" className="text-red-600 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} isOnSale />
            ))}
          </div>
        </section>

        {/* Featured Artisans */}
        <section className="mb-12 bg-amber-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Meet Our Artisans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Weaver', craft: 'Banarasi Silk', location: 'Varanasi', years: '15+ years' },
              { name: 'Meena Potter', craft: 'Terracotta Art', location: 'Kolkata', years: '10+ years' },
              { name: 'Arjun Jeweler', craft: 'Kundan Jewelry', location: 'Jaipur', years: '20+ years' }
            ].map((artisan, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-40 bg-amber-200 rounded-lg mb-4 flex items-center justify-center text-5xl">
                  {['🧵', '🏺', '💎'][index]}
                </div>
                <h3 className="font-bold text-lg">{artisan.name}</h3>
                <p className="text-gray-600">{artisan.craft} Specialist</p>
                <p className="text-sm mt-2 text-gray-500">
                  From {artisan.location} • {artisan.years} experience
                </p>
                <button className="mt-4 text-amber-700 hover:underline text-sm">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-amber-800 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Get Traditional Styling Tips</h2>
          <p className="mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive offers and heritage fashion inspiration</p>
          <form className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l text-gray-800 focus:outline-none"
              required
            />
            <button 
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-r font-medium"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, isOnSale = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-amber-800">₹{product.price.toLocaleString()}</span>
          {isOnSale && (
            <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;