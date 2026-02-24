import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useGetProductDetailsQuery(productId);

  console.log("Product data:", product); // Debug log
  console.log("countInStock:", product?.countInStock); // Debug log
  console.log("Is countInStock === 0?", product?.countInStock === 0); // Debug log

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const quantity = Number(qty) || 1;
    dispatch(addToCart({ ...product, qty: quantity }));
    navigate("/cart");
  };

  // ... rest of the component

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Loader type="spinner" size="xl" fullScreen={false} />
      </div>
    );
  }

  // Show error state
  if (isError || error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Message variant="error">
            {error?.data?.message ||
              error?.message ||
              "Failed to load product details"}
          </Message>
          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Message variant="warning">Product Not Found</Message>
          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="flex justify-center md:justify-start">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#FFD700"
            />
          </div>

          {/* Price */}
          <div className="border-y border-gray-200 py-4">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Meta */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24">
                Category:
              </span>
              <span className="text-gray-600">{product.category}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24">Brand:</span>
              <span className="text-gray-600">{product.brand}</span>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">Price:</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${product.price}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-xl mr-4">Status:</span>
              {product.countInStock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector - FIXED: Added onChange handler */}
            {product.countInStock > 0 && (
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors duration-300 ${
                product.countInStock > 0
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Stock message */}
            {product.countInStock > 0 && product.countInStock < 5 && (
              <Message variant="warning" className="mt-4">
                Only {product.countInStock} left in stock - order soon!
              </Message>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <Rating value={review.rating} text="" color="#FFD700" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
