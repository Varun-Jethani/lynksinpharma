import React, { useState, useCallback } from "react";
import { Eye, ShoppingCart, Plus, Minus, Check } from "lucide-react";

const ProductsGrid = ({
  filteredProducts,
  setSelectedProduct,
  getStructureIcon,
  onAddToCart,
  onUpdateCart,
  handleViewProduct,
  userCart = [],
}) => {
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Optimized functions with useCallback
  const isInCart = useCallback(
    (productId) => {
      return userCart.some((item) => item.product === productId);
    },
    [userCart]
  );

  const getCartQuantity = useCallback(
    (productId) => {
      const cartItem = userCart.find((item) => item.product === productId);
      return cartItem ? cartItem.quantity : 0;
    },
    [userCart]
  );

  const getCartUnit = useCallback(
    (productId) => {
      const cartItem = userCart.find((item) => item.product === productId);
      return cartItem ? cartItem.unit : "mg";
    },
    [userCart]
  );

  const getQuantity = (catalogNo) => {
    const qty = quantities[catalogNo];
    return qty === "" || qty === undefined || qty === null ? 1 : qty;
  };

  const getUnit = (catalogNo) => units[catalogNo] || "mg";

  const updateQuantity = useCallback((catalogNo, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [catalogNo]: newQuantity,
    }));
  }, []);

  const updateUnit = useCallback((catalogNo, newUnit) => {
    setUnits((prev) => ({
      ...prev,
      [catalogNo]: newUnit,
    }));
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      const quantity = getQuantity(product.catalogNo);
      const unit = getUnit(product.catalogNo);
      if (onAddToCart) {
        onAddToCart(product, quantity, unit);
      }
    },
    [quantities, units, onAddToCart]
  );

  const handleUpdateCartQuantity = useCallback(
    (productId, newQuantity, newUnit) => {
      if (newQuantity >= 1 && onUpdateCart) {
        onUpdateCart(productId, Math.max(1, newQuantity), newUnit);
      }
    },
    [onUpdateCart]
  );

  const incrementQuantity = (catalogNo, inCart = false, productId = null) => {
    if (inCart && productId) {
      const currentQty = getCartQuantity(productId);
      const currentUnit = getCartUnit(productId);
      handleUpdateCartQuantity(productId, currentQty + 1, currentUnit);
    } else {
      const currentQty = getQuantity(catalogNo);
      updateQuantity(catalogNo, currentQty + 1);
    }
  };

  const decrementQuantity = (catalogNo, inCart = false, productId = null) => {
    if (inCart && productId) {
      const currentQty = getCartQuantity(productId);
      const currentUnit = getCartUnit(productId);
      if (currentQty > 1) {
        handleUpdateCartQuantity(productId, currentQty - 1, currentUnit);
      }
    } else {
      const currentQty = getQuantity(catalogNo);
      if (currentQty > 1) {
        updateQuantity(catalogNo, currentQty - 1);
      }
    }
  };

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product, index) => {
        const inCart = isInCart(product._id);
        const cartQuantity = getCartQuantity(product._id);
        const cartUnit = getCartUnit(product._id);
        const isHovered = hoveredProduct === product._id;

        return (
          <div
            key={product.catalogNo}
            className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/70 hover:border-blue-200/80 group overflow-hidden transform hover:-translate-y-3 hover:scale-[1.03]"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating effect indicator */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur opacity-0 group-hover:opacity-70 transition duration-500" />

            <div className="relative p-8">
              {/* Enhanced Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                    {product.catalogNo}
                  </span>
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                </div>

                <button
                  onClick={() => handleViewProduct(product)}
                  className="relative flex items-center justify-center w-12 h-12 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-2xl transform hover:scale-110 hover:rotate-12 group/btn"
                >
                  <Eye
                    size={22}
                    className="transition-transform duration-300 group-hover/btn:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-100 rounded-2xl scale-0 group-hover/btn:scale-100 transition-transform duration-300 -z-10" />
                </button>
              </div>

              {/* Product Name with enhanced typography */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 text-lg leading-tight min-h-[4.5rem] flex items-start transition-colors duration-300 group-hover:text-gray-800">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name}
                </h3>
              </div>

              {/* Enhanced Product Details */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group/detail">
                  <span className="font-semibold text-gray-600 text-sm">
                    CAS No:
                  </span>
                  <span className="text-gray-900 font-mono text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover/detail:shadow-sm">
                    {product.casNo}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group/detail">
                  <span className="font-semibold text-gray-600 text-sm">
                    M.W.:
                  </span>
                  <span className="text-gray-900 font-mono text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover/detail:shadow-sm">
                    {product.mw}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group/detail">
                  <span className="font-semibold text-gray-600 text-sm">
                    Grade:
                  </span>
                  <span className="text-blue-600 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all duration-200 border border-blue-100 group-hover/detail:shadow-sm group-hover/detail:border-blue-200">
                    {product.purity}
                  </span>
                </div>
              </div>

              {/* Cart Section */}
              {inCart ? (
                <div className="space-y-6">
                  {/* In Cart Indicator with enhanced styling */}
                  <div className="text-center">
                    <span className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold px-5 py-3 rounded-full shadow-sm border border-green-200 transition-all duration-300 hover:shadow-md">
                      <Check size={16} className="mr-2 text-green-600" />
                      In Cart
                    </span>
                  </div>

                  {/* Enhanced Quantity Controls for Cart Items */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner border border-gray-200/50">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-gray-700 font-semibold text-sm">
                        Quantity:
                      </span>

                      {/* Quantity Input with +/- buttons */}
                      <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <button
                          onClick={() =>
                            decrementQuantity(
                              product.catalogNo,
                              true,
                              product._id
                            )
                          }
                          className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                          disabled={cartQuantity <= 1}
                        >
                          <Minus
                            size={16}
                            className="transition-transform duration-200 group-hover/btn:scale-110"
                          />
                        </button>

                        <input
                          type="text"
                          value={cartQuantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow completely empty field while typing
                            if (value === "") {
                              return; // Don't update cart immediately when empty
                            }
                            // Only allow numbers
                            if (/^\d+$/.test(value)) {
                              const numValue = parseInt(value, 10);
                              if (numValue >= 1) {
                                handleUpdateCartQuantity(
                                  product._id,
                                  numValue,
                                  cartUnit
                                );
                              }
                            }
                          }}
                          onFocus={(e) => {
                            // Select all text when focused
                            e.target.select();
                          }}
                          onBlur={(e) => {
                            // Ensure minimum value on blur
                            const value = e.target.value.trim();
                            if (value === "" || parseInt(value, 10) < 1) {
                              handleUpdateCartQuantity(
                                product._id,
                                1,
                                cartUnit
                              );
                            }
                          }}
                          className="w-20 px-2 py-2.5 text-center font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 focus:bg-blue-50 transition-colors duration-200"
                          placeholder="1"
                        />

                        <button
                          onClick={() =>
                            incrementQuantity(
                              product.catalogNo,
                              true,
                              product._id
                            )
                          }
                          className="p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 group/btn"
                        >
                          <Plus
                            size={16}
                            className="transition-transform duration-200 group-hover/btn:scale-110"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Unit Selector */}
                    <div className="flex justify-center">
                      <select
                        value={cartUnit}
                        onChange={(e) =>
                          handleUpdateCartQuantity(
                            product._id,
                            cartQuantity,
                            e.target.value
                          )
                        }
                        className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Quantity Selector for new items */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 shadow-inner border border-gray-200/50">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-gray-700 font-semibold text-sm">
                        Quantity:
                      </span>

                      <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => decrementQuantity(product.catalogNo)}
                          className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                          disabled={getQuantity(product.catalogNo) <= 1}
                        >
                          <Minus
                            size={16}
                            className="transition-transform duration-200 group-hover/btn:scale-110"
                          />
                        </button>

                        <input
                          type="number"
                          min={1}
                          value={getQuantity(product.catalogNo)}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow any input while typing, including empty string
                            if (value === "") {
                              setQuantities((prev) => ({
                                ...prev,
                                [product.catalogNo]: "",
                              }));
                            } else {
                              const numValue = parseInt(value, 10);
                              if (!isNaN(numValue) && numValue >= 0) {
                                setQuantities((prev) => ({
                                  ...prev,
                                  [product.catalogNo]: numValue,
                                }));
                              }
                            }
                          }}
                          onFocus={(e) => {
                            // Select all text when focused so user can easily replace it
                            e.target.select();
                          }}
                          onBlur={(e) => {
                            // Ensure minimum value on blur
                            const value = parseInt(e.target.value, 10);
                            if (isNaN(value) || value < 1) {
                              setQuantities((prev) => ({
                                ...prev,
                                [product.catalogNo]: 1,
                              }));
                            }
                          }}
                          className="w-20 px-2 py-2.5 text-center font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 focus:bg-blue-50 transition-colors duration-200"
                          placeholder="1"
                        />

                        <button
                          onClick={() => incrementQuantity(product.catalogNo)}
                          className="p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 group/btn"
                        >
                          <Plus
                            size={16}
                            className="transition-transform duration-200 group-hover/btn:scale-110"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <select
                        value={getUnit(product.catalogNo)}
                        onChange={(e) =>
                          updateUnit(product.catalogNo, e.target.value)
                        }
                        className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>
                  </div>

                  {/* Enhanced Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="relative w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/cart overflow-hidden"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-0 group-hover/cart:opacity-20 transition-opacity duration-300" />

                    <ShoppingCart
                      size={20}
                      className="transition-transform duration-300 group-hover/cart:scale-110 group-hover/cart:rotate-12"
                    />
                    <span className="relative z-10">Add to Cart</span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/cart:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
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
