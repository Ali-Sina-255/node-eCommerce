import React from "react";
import products from "../products";
import Products from "../components/Products";

const HomeScreen = () => {
  console.log(products);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Latest Products
        </h1>

        {/* Responsive Grid Layout - Adjusted columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
