import { useCart, CartItem as CartItemType } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
  const itemTotal = itemPrice * item.quantity;

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 flex flex-col sm:flex-row gap-4 transition-colors duration-300`}
    >
      <div
        className={`${darkMode ? 'bg-gradient-to-t from-gray-700 to-gray-800' : 'bg-gradient-to-t from-gray-100 to-white'} rounded-lg w-full sm:w-32 h-32 flex-shrink-0 transition-colors duration-300`}
      >
        <img
          src={`/${item.imgName}`}
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
          >
            {item.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {item.discount ? (
              <>
                <span className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</span>
                <span className="text-primary font-semibold">${itemPrice.toFixed(2)}</span>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                  {Math.round(item.discount * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-primary font-semibold">${item.price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}
          >
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <span aria-hidden="true">-</span>
            </button>
            <span
              className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
              aria-label={`Quantity of ${item.name}`}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
              aria-label={`Increase quantity of ${item.name}`}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
            >
              ${itemTotal.toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
