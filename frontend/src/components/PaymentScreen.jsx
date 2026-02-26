import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  // Redirect if no shipping address
  React.useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <FormContainer>
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 step3 />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
          {/* Header with decorative element */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <FaCreditCard className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Method 💳
            </h1>
            <p className="text-indigo-100 text-sm">
              Select your preferred payment method
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Payment Methods */}
              <div className="space-y-4">
                {/* PayPal Option */}
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "PayPal"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-4 flex items-center space-x-3">
                    <FaPaypal className="text-3xl text-blue-500" />
                    <span className="text-lg font-medium text-gray-700">
                      PayPal
                    </span>
                  </div>
                </label>

                {/* Stripe Option */}
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "Stripe"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Stripe"
                    checked={paymentMethod === "Stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-4 flex items-center space-x-3">
                    <SiStripe className="text-3xl text-purple-600" />
                    <span className="text-lg font-medium text-gray-700">
                      Stripe
                    </span>
                  </div>
                </label>

                {/* Credit Card Option */}
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "Credit Card"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={paymentMethod === "Credit Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-4 flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <FaCcVisa className="text-3xl text-blue-700" />
                      <FaCcMastercard className="text-3xl text-red-500" />
                      <FaCcAmex className="text-3xl text-blue-400" />
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                      Credit Card
                    </span>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-4 flex items-center space-x-3">
                    <FaMoneyBillWave className="text-3xl text-green-600" />
                    <span className="text-lg font-medium text-gray-700">
                      Cash on Delivery
                    </span>
                  </div>
                </label>
              </div>

              {/* Continue Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue to Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
