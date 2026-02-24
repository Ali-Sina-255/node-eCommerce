import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-500 text-white shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="ProShop" className="h-8 w-auto" />
            <span className="text-xl font-bold">ProShop</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-3 bg-white border border-gray-200 hover:border-indigo-300 px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative">
                <FaShoppingCart className="text-gray-500 group-hover:text-indigo-600 text-xl transition-colors duration-300" />

                {/* Animated badge */}
                {cartItems.reduce((total, item) => total + item.qty, 0) > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                    {cartItems.reduce((total, item) => total + item.qty, 0)}
                  </span>
                )}

                {/* Pulse effect when items are added */}
                {cartItems.reduce((total, item) => total + item.qty, 0) > 0 && (
                  <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20"></span>
                )}
              </div>
            </Link>

            {/* Sign In Link */}
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaUser />
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"} pb-4`}>
          <div className="flex flex-col space-y-3">
            <Link
              to="/cart"
              className="flex items-center space-x-2 hover:text-gray-200"
              onClick={toggleMenu}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-gray-200"
              onClick={toggleMenu}
            >
              <FaUser />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
