import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCity, FaFlag, FaMailBulk } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || ""); // Fixed: changed setCounty to setCountry
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );

  const submitHandler = (e) => {
    e.preventDefault();

    // Save shipping address to Redux
    dispatch(saveShippingAddress({ address, city, country, postalCode }));

    // Navigate to payment method page
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <FormContainer>
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
          {/* Header with decorative element */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <FaMapMarkerAlt className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Shipping Address 📦
            </h1>
            <p className="text-indigo-100 text-sm">
              Enter your delivery details below
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Street Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCity className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="New York"
                  />
                </div>
              </div>

              {/* Country Field */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFlag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="United States"
                  />
                </div>
              </div>

              {/* Postal Code Field */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Postal Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMailBulk className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="10001"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default ShippingAddress;
