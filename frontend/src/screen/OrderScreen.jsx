import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaPaypal,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
  FaShoppingBag,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <Message variant="error">
          {error?.data?.message || error?.error || "Failed to load order"}
        </Message>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <Message variant="info">Order not found</Message>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order._id?.substring(0, 8)}...
          </h1>
        </div>

        {/* Order Status Banner */}
        <div
          className={`mb-6 p-4 rounded-lg ${
            order.isPaid
              ? order.isDelivered
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center">
            {order.isPaid ? (
              order.isDelivered ? (
                <>
                  <FaCheckCircle className="mr-3 text-2xl" />
                  <div>
                    <p className="font-semibold">Order Delivered</p>
                    <p className="text-sm">
                      Delivered on{" "}
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <FaTruck className="mr-3 text-2xl" />
                  <div>
                    <p className="font-semibold">
                      Order Paid - Awaiting Delivery
                    </p>
                    <p className="text-sm">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </p>
                  </div>
                </>
              )
            ) : (
              <>
                <FaTimesCircle className="mr-3 text-2xl" />
                <div>
                  <p className="font-semibold">Payment Pending</p>
                  <p className="text-sm">
                    Please complete payment to process your order
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {order.shippingAddress?.address}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">City:</span>{" "}
                  {order.shippingAddress?.city}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {order.shippingAddress?.postalCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Country:</span>{" "}
                  {order.shippingAddress?.country}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 flex items-center">
                    <FaUser className="mr-2 text-indigo-600" />
                    <span className="font-semibold mr-2">Customer:</span>{" "}
                    {order.user?.name || "N/A"} ({order.user?.email || "N/A"})
                  </p>
                </div>
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
                <div className="flex items-center">
                  {order.paymentMethod === "PayPal" ? (
                    <FaPaypal className="text-3xl text-blue-500 mr-3" />
                  ) : (
                    <FaCreditCard className="text-3xl text-indigo-600 mr-3" />
                  )}
                  <span className="text-gray-700 font-medium">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {order.isPaid ? (
                      <span className="text-green-600 flex items-center">
                        <FaCheckCircle className="mr-1" /> Paid on{" "}
                        {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <FaTimesCircle className="mr-1" /> Not Paid
                      </span>
                    )}
                  </p>
                </div>
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
                {order.orderItems?.length === 0 ? (
                  <Message variant="info">No items in this order</Message>
                ) : (
                  <div className="space-y-4">
                    {order.orderItems?.map((item, index) => (
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
                            to={`/product/${item.product}`}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-600 text-sm">
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
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
                      ${order.itemsPrice?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Price:</span>
                    <span className="font-semibold">
                      {order.shippingPrice === 0
                        ? "Free"
                        : `$${order.shippingPrice}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax Price:</span>
                    <span className="font-semibold">
                      ${order.taxPrice?.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-indigo-600">
                        ${order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Status */}
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    order.isDelivered ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  <div className="flex items-center text-gray-700 mb-2">
                    <FaBoxOpen
                      className={`mr-2 ${
                        order.isDelivered ? "text-green-600" : "text-yellow-600"
                      }`}
                    />
                    <span className="font-semibold">Delivery Status</span>
                  </div>
                  <p
                    className={`text-sm ${
                      order.isDelivered ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {order.isDelivered
                      ? `Delivered on ${new Date(
                          order.deliveredAt,
                        ).toLocaleDateString()}`
                      : "Not yet delivered"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
