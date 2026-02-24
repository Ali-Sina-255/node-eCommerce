import { useGetProductQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";

import Message from "../components/Message";
const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductQuery();

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Loader type="dots" size="large" fullScreen={false} />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Message variant="error">
            {error?.data?.message ||
              error?.message ||
              "Failed to load products"}
          </Message>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Latest Products
        </h1>

        {!products || products.length === 0 ? (
          <Message variant="info">No products found. Check back later!</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
