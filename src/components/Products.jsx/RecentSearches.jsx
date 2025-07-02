import React, { useState } from "react";
import {
  Clock,
  Eye,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  TrendingUp,
  History,
  ArrowRight,
  Zap,
} from "lucide-react";

const RecentSearches = ({
  searchHistory = [],
  onProductClick,
  onAddToCart,
  onUpdateCart,
  userCart = [],
  onClearHistory,
  isVisible = true,
}) => {
  const [quantities, setQuantities] = useState({});

  // Function to check if product is in cart
  const isInCart = (productId) => {
    return userCart.some((item) => item.product === productId);
  };

  // Function to get cart quantity for a product
  const getCartQuantity = (productId) => {
    const cartItem = userCart.find((item) => item.product === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Function to get quantity for a specific product (for new items)
  const getQuantity = (catalogNo) => quantities[catalogNo] || 1;

  // Function to update quantity for a specific product (for new items)
  const updateQuantity = (catalogNo, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [catalogNo]: newQuantity,
      }));
    }
  };

  // Function to handle add to cart (for new items)
  const handleAddToCart = (product) => {
    const quantity = getQuantity(product.catalogNo);
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  // Function to handle cart quantity update
  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1 && onUpdateCart) {
      onUpdateCart(productId, newQuantity);
    }
  };

  if (!isVisible || !searchHistory || searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 lg:mb-10">
      {/* Section Header with Trending Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-sm"></div>
                <div className="relative p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <TrendingUp size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Recent Searches
                </h2>
                <p className="text-white/80 text-sm sm:text-base">
                  Quick access to your recently viewed products
                </p>
              </div>
            </div>
            
            {onClearHistory && (
              <button
                onClick={onClearHistory}
                className="text-white/70 hover:text-white transition-all duration-300 p-3 hover:bg-white/20 rounded-xl backdrop-blur-sm"
                title="Clear search history"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Compact List Style Recent Searches */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {searchHistory.map((product, index) => {
            const inCart = isInCart(product._id);
            const cartQuantity = getCartQuantity(product._id);

            return (
              <div
                key={`${product._id}-${index}`}
                className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center gap-4 p-6">
                  {/* Index Number with Gradient */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Product Info Section */}
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* Main Product Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            {product.catalogNo}
                          </span>
                          <button
                            onClick={() => onProductClick && onProductClick(product)}
                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-1 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate group-hover:text-blue-700 transition-colors duration-200">
                          {product.name || 'Product Name'}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>
                            <strong>CAS:</strong> {product.casNo || 'N/A'}
                          </span>
                          <span>
                            <strong>MW:</strong> {product.mw || 'N/A'}
                          </span>
                          <span className="text-blue-600 font-semibold">
                            {product.purity || 'Research Grade'}
                          </span>
                        </div>
                      </div>

                      {/* Cart Actions */}
                      <div className="flex-shrink-0">
                        {inCart ? (
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                              <ShoppingCart size={14} className="mr-1" />
                              In Cart
                            </span>
                            <div className="flex items-center bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() =>
                                  handleUpdateCartQuantity(
                                    product._id,
                                    cartQuantity - 1
                                  )
                                }
                                className="p-2 hover:bg-white transition-colors duration-200 rounded-lg shadow-sm"
                                disabled={cartQuantity <= 1}
                              >
                                <Minus
                                  size={14}
                                  className={
                                    cartQuantity <= 1
                                      ? "text-gray-300"
                                      : "text-gray-600"
                                  }
                                />
                              </button>
                              <span className="px-3 py-1 font-bold text-gray-900 min-w-[2.5rem] text-center">
                                {cartQuantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateCartQuantity(
                                    product._id,
                                    cartQuantity + 1
                                  )
                                }
                                className="p-2 hover:bg-white transition-colors duration-200 rounded-lg shadow-sm"
                              >
                                <Plus size={14} className="text-gray-600" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center bg-gray-50 rounded-xl p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.catalogNo,
                                    getQuantity(product.catalogNo) - 1
                                  )
                                }
                                className="p-2 hover:bg-white transition-colors duration-200 rounded-lg"
                                disabled={getQuantity(product.catalogNo) <= 1}
                              >
                                <Minus
                                  size={14}
                                  className={
                                    getQuantity(product.catalogNo) <= 1
                                      ? "text-gray-300"
                                      : "text-gray-600"
                                  }
                                />
                              </button>
                              <span className="px-3 py-1 font-bold text-gray-900 min-w-[2.5rem] text-center">
                                {getQuantity(product.catalogNo)}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.catalogNo,
                                    getQuantity(product.catalogNo) + 1
                                  )
                                }
                                className="p-2 hover:bg-white transition-colors duration-200 rounded-lg"
                              >
                                <Plus size={14} className="text-gray-600" />
                              </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                            >
                              <ShoppingCart size={16} />
                              Add to Cart
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <History size={18} />
              <span className="text-sm font-medium">
                {searchHistory.length} recent searches
              </span>
            </div>
            {/* <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
              <Zap size={16} />
              <span>Quick access enabled</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {searchHistory.length === 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
          <div className="mb-6">
            <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4">
              <Search size={48} className="text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No recent searches yet
          </h3>
          <p className="text-gray-500 text-lg">
            Start searching for products to see them here for quick access
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentSearches;