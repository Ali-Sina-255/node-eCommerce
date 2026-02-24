import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const updateQuantityHandler = (item, newQty) => {
    dispatch(addToCart({ ...item, qty: Number(newQty) }));
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-12">
            <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">
          You have {cartItems.reduce((acc, item) => acc + item.qty, 0)} items in
          your cart
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Product Info */}
                <div className="md:col-span-6 flex items-center space-x-4">
                  <Link to={`/product/${item._id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex items-center justify-center">
                  <span className="md:hidden font-medium mr-2">Price:</span>
                  <span className="text-gray-800 font-medium">
                    ${item.price}
                  </span>
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex items-center justify-center">
                  <div className="flex items-center">
                    <span className="md:hidden font-medium mr-2">Qty:</span>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        updateQuantityHandler(item, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total & Remove */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <div>
                    <span className="md:hidden font-medium mr-2">Total:</span>
                    <span className="text-indigo-600 font-bold">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="p-4 bg-gray-50">
              <Link
                to="/"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary - Right Column */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            {/* Summary Items - Using Redux state */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {Number(shippingPrice) === 0 ? "Free" : `$${shippingPrice}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (15%)</span>
                <span>${taxPrice}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-indigo-600 text-xl">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label
                htmlFor="promo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter code"
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={checkoutHandler}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Payment Methods */}
            <div className="text-center text-sm text-gray-500">
              <p>We accept:</p>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="px-2 py-1 bg-gray-100 rounded">Visa</span>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Mastercard
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message when item is removed - Optional */}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <Message variant="info">
            Items in your cart are not reserved - check out now to secure them!
          </Message>
        </div>
      )}

      {/* Recently Viewed or Recommendations */}
      {cartItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Add recommended products here */}
            {/* This is a placeholder - you'd typically fetch this from your API */}
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-gray-500">Recommendations</p>
              <p className="text-sm text-gray-400 mt-2">Coming soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
