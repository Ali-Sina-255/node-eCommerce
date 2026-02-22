import React from "react";

const Products = ({ product }) => {
  return (
    <div
      className="w-full rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
      key={product._id}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Meta Information */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
            {product.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
            {product.brand}
          </span>
        </div>

        {/* Price (if you have it) */}
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
