import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {/* Step 1: Sign In */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step1 ? <FaCheckCircle /> : <FaShoppingCart />}
          </div>
          <span
            className={`text-xs mt-1 ${step1 ? "text-green-600 font-semibold" : "text-gray-500"}`}
          >
            Sign In
          </span>
        </div>

        {/* Connector Line */}
        <div
          className={`w-8 h-0.5 ${step2 ? "bg-green-500" : "bg-gray-300"}`}
        ></div>

        {/* Step 2: Shipping */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step2 ? <FaCheckCircle /> : <FaMapMarkerAlt />}
          </div>
          <span
            className={`text-xs mt-1 ${step2 ? "text-green-600 font-semibold" : "text-gray-500"}`}
          >
            Shipping
          </span>
        </div>

        {/* Connector Line */}
        <div
          className={`w-8 h-0.5 ${step3 ? "bg-green-500" : "bg-gray-300"}`}
        ></div>

        {/* Step 3: Payment */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step3 ? <FaCheckCircle /> : <FaCreditCard />}
          </div>
          <span
            className={`text-xs mt-1 ${step3 ? "text-green-600 font-semibold" : "text-gray-500"}`}
          >
            Payment
          </span>
        </div>

        {/* Connector Line */}
        <div
          className={`w-8 h-0.5 ${step4 ? "bg-green-500" : "bg-gray-300"}`}
        ></div>

        {/* Step 4: Place Order */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step4 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step4 ? <FaCheckCircle /> : <FaShoppingCart />}
          </div>
          <span
            className={`text-xs mt-1 ${step4 ? "text-green-600 font-semibold" : "text-gray-500"}`}
          >
            Place Order
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
