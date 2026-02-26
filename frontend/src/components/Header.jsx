import { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const cartItemsCount =
    cartItems?.reduce((total, item) => total + item.qty, 0) || 0;

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="ProShop"
              className="h-8 w-auto transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">
              ProShop
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none hover:bg-white/10 p-2 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 group"
            >
              <div className="relative">
                <FaShoppingCart className="text-white group-hover:text-gray-100 text-xl transition-colors" />
                {cartItemsCount > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                      {cartItemsCount}
                    </span>
                    <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>
                  </>
                )}
              </div>
              <span className="ml-2 text-white font-medium">Cart</span>
            </Link>

            {/* User Menu - Conditional Rendering */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <FaUserCircle className="text-white text-xl" />
                  <span className="text-white font-medium">
                    {userInfo.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown when clicking outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 transform transition-all duration-200 animate-fadeIn">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUserCircle className="mr-3 text-indigo-500" />
                        <span className="font-medium">Your Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCog className="mr-3 text-indigo-500" />
                        <span className="font-medium">Settings</span>
                      </Link>

                      <hr className="my-2 border-gray-200" />

                      <button
                        onClick={() => {
                          logoutHandler();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaSignOutAlt className="mr-3 text-red-500" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-white text-indigo-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaUser />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col space-y-2 pb-4 pt-2">
            {/* Cart Link - Mobile */}
            <Link
              to="/cart"
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-3">
                <FaShoppingCart className="text-white" />
                <span className="text-white font-medium">Cart</span>
              </div>
              {cartItemsCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu - Mobile */}
            {userInfo ? (
              <>
                <div className="bg-white/10 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaUserCircle className="text-white text-2xl" />
                    <span className="text-white font-medium">
                      {userInfo.name}
                    </span>
                  </div>
                  <div className="pl-8 space-y-2">
                    <Link
                      to="/profile"
                      className="block text-white/80 hover:text-white py-2 transition-colors"
                      onClick={toggleMenu}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block text-white/80 hover:text-white py-2 transition-colors"
                      onClick={toggleMenu}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandler();
                        toggleMenu();
                      }}
                      className="flex items-center space-x-2 text-white/80 hover:text-white py-2 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 bg-white text-indigo-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-semibold transition-colors"
                onClick={toggleMenu}
              >
                <FaUser />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Add this to your global CSS or in a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
