import { Link } from "react-router-dom";
import Rating from "./Rating";

const Products = ({ product }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Product Image with Link */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name with Link */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-indigo-600 line-clamp-1 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Rating Component */}
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color="#FFD700"
        />
        {/* Product Meta Information */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
            {product.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
            {product.brand}
          </span>
        </div>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        {product.price && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-3 rounded-lg transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
