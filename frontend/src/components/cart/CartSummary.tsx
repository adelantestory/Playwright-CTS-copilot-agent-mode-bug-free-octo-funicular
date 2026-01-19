import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function CartSummary() {
  const { subtotal, totalDiscount, total, clearCart } = useCart();
  const { darkMode } = useTheme();

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 transition-colors duration-300`}
    >
      <h2
        className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}
      >
        Order Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
            Subtotal
          </span>
          <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
              Discount
            </span>
            <span className="text-primary font-medium">
              -${totalDiscount.toFixed(2)}
            </span>
          </div>
        )}

        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3 mt-3`}>
          <div className="flex justify-between">
            <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Total
            </span>
            <span className="text-lg font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-6 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      <button
        onClick={clearCart}
        className={`w-full mt-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-light' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-6 py-3 rounded-lg font-medium transition-colors duration-300`}
        aria-label="Clear cart"
      >
        Clear Cart
      </button>
    </div>
  );
}
