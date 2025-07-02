import React, { useState } from "react";
import {
  Search,
  Eye,
  ChevronUp,
  ChevronDown,
  Atom,
  Beaker,
  FlaskConical,
  X,
  ExternalLink,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";

const ProductsGrid = ({
  filteredProducts,
  setSelectedProduct,
  getStructureIcon,
  onAddToCart, // For adding new items to cart
  onUpdateCart, // New prop for updating cart 
  handleViewProduct, // Function to view product details
  userCart = [], // User's cart items
}) => {
  // State to manage quantities for each product
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

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product, index) => {
        const inCart = isInCart(product._id);
        const cartQuantity = getCartQuantity(product._id);

        return (
          <div
            key={product.catalogNo}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 group overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="p-8">
              {/* Enhanced Header */}
              <div className="flex justify-between items-start mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  {product.catalogNo}
                </span>
                <button
                  onClick={() => handleViewProduct(product)}
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 p-3 hover:bg-blue-50 rounded-2xl transform hover:scale-110"
                >
                  <Eye size={22} />
                </button>
              </div>

              {/* Product Name with better typography */}
              <h3 className="font-bold text-gray-900 mb-8 text-lg leading-tight min-h-[6rem] flex items-start">
                {product.name.length > 60
                  ? `${product.name.substring(0, 60)}...`
                  : product.name}
              </h3>

              {/* Enhanced Product Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">CAS No:</span>
                  <span className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg">
                    {product.casNo}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">M.W.:</span>
                  <span className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg">
                    {product.mw}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-600">Grade:</span>
                  <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-lg">
                    {product.purity}
                  </span>
                </div>
              </div>

              {/* Enhanced Structure Placeholder */}

              {/* Conditional Rendering: Cart Controls vs Add to Cart */}
              {inCart ? (
                // Cart Quantity Controls (when item is already in cart)
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                      <ShoppingCart size={16} className="mr-2" />
                      In Cart
                    </span>
                  </div>

                  <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-4">
                    <span className="text-gray-600 font-semibold mr-4">
                      Quantity:
                    </span>
                    <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                      <button
                        onClick={() =>
                          handleUpdateCartQuantity(
                            product._id,
                            cartQuantity - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-xl"
                        disabled={cartQuantity <= 1}
                      >
                        <Minus
                          size={16}
                          className={
                            cartQuantity <= 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }
                        />
                      </button>
                      <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">
                        {cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateCartQuantity(
                            product._id,
                            cartQuantity + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-xl"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Add to Cart Section (when item is not in cart)
                <>
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center mb-6 bg-gray-50 rounded-2xl p-4">
                    <span className="text-gray-600 font-semibold mr-4">
                      Quantity:
                    </span>
                    <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.catalogNo,
                            getQuantity(product.catalogNo) - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-xl"
                        disabled={getQuantity(product.catalogNo) <= 1}
                      >
                        <Minus
                          size={16}
                          className={
                            getQuantity(product.catalogNo) <= 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }
                        />
                      </button>
                      <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">
                        {getQuantity(product.catalogNo)}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.catalogNo,
                            getQuantity(product.catalogNo) + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-xl"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
