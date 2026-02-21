import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   const logoutHandler = async () => {
  //     // Logout functionality will go here
  //   };

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
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaShoppingCart />
              <span>Cart</span>
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
