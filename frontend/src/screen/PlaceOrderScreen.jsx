import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingBag,
  FaUser,
  FaCheckCircle,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";
import { toast } from "react-toastify";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";

import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Calculate prices
  const calculatePrices = () => {
    const itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );

    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices();

  // Redirect if no shipping address or payment method
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const res = await createOrder(orderData).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to place order");
    }
  };

  if (!cart.shippingAddress.address) {
    return null; // Will redirect from useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Shipping Address
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {cart.shippingAddress.address}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">City:</span>{" "}
                  {cart.shippingAddress.city}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {cart.shippingAddress.postalCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Country:</span>{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaCreditCard className="mr-2" /> Payment Method
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Method:</span>{" "}
                  {cart.paymentMethod}
                </p>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaShoppingBag className="mr-2" /> Order Items
                </h2>
              </div>
              <div className="p-6">
                {cart.cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <div className="space-y-4">
                    {cart.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-600 text-sm">
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaDollarSign className="mr-2" /> Order Summary
                </h2>
              </div>
              <div className="p-6">
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Items Price:</span>
                    <span className="font-semibold">
                      ${itemsPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Price:</span>
                    <span className="font-semibold">
                      {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax Price (15%):</span>
                    <span className="font-semibold">${taxPrice}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-indigo-600">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-indigo-800 mb-2">
                    <FaTruck className="mr-2" />
                    <span className="font-semibold">Estimated Delivery</span>
                  </div>
                  <p className="text-sm text-indigo-600">
                    {shippingPrice === 0
                      ? "Free shipping (5-7 business days)"
                      : "Standard shipping (3-5 business days)"}
                  </p>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0 || isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader color="white" />
                  ) : (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Place Order
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4">
                    <Message variant="error">
                      {error?.data?.message ||
                        error?.error ||
                        "Failed to place order"}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
