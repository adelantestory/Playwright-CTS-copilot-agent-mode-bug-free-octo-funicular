import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function Cart() {
  const { items, totalItems } = useCart();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}
        >
          Shopping Cart
          {totalItems > 0 && (
            <span className={`ml-3 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center text-center py-20 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            role="status"
            aria-live="polite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-16 w-16 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className={`${darkMode ? 'text-light' : 'text-gray-800'} text-2xl font-semibold mb-2`}>
              Your cart is empty
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Start adding some products to your cart!
            </p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
