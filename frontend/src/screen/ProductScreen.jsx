import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import products from "../products";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
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
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
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

            <button
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors duration-300 ${
                product.countInStock > 0
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section (Optional) */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.name}
                  </span>
                  <Rating value={review.rating} />
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
