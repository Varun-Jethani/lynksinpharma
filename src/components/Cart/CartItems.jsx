import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItems = ({
  mergedCartItems,
  getDisplayQuantity,
  getStructureIcon,
  updateQuantity,
  setTempQuantities,
  removeItem,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {mergedCartItems.map((item) => (
        <div
          key={item._id}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Product Image/Structure */}
            <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-2xl flex flex-col items-center justify-center border-2 border-blue-100">
              <div className="text-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <>
                    {getStructureIcon(item.image)}
                    <span className="block text-xs text-gray-600 font-medium mt-1">
                      Structure
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                      {item.catalogNo}
                    </span>
                    <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-2 py-1 rounded">
                      {item.purity}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">
                    {item.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">CAS:</span>{" "}
                      <span className="font-mono">{item.casNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">M.W.:</span>{" "}
                      <span className="font-mono">{item.mw}</span>
                    </div>
                  </div>
                  {item.formula && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Formula:</span>{" "}
                      <span className="font-mono">{item.formula}</span>
                    </div>
                  )}
                </div>

                {/* Quantity Controls - FIXED VERSION */}
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.unit
                        )
                      }
                      className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <Minus
                        size={16}
                        className={
                          item.quantity <= 1 ? "text-gray-300" : "text-gray-600"
                        }
                      />
                    </button>

                    <input
                      type="text"
                      value={getDisplayQuantity(item)}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty field while typing
                        if (value === "") {
                          setTempQuantities((prev) => ({
                            ...prev,
                            [item.productId]: "",
                          }));
                          return;
                        }
                        // Only allow numbers
                        if (/^\d+$/.test(value)) {
                          const numValue = parseInt(value, 10);
                          setTempQuantities((prev) => ({
                            ...prev,
                            [item.productId]: numValue,
                          }));
                        }
                      }}
                      onFocus={(e) => {
                        // Select all text when focused
                        e.target.select();
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        if (value === "" || parseInt(value, 10) < 1) {
                          // Reset to current quantity if invalid
                          setTempQuantities((prev) => {
                            const updated = { ...prev };
                            delete updated[item.productId];
                            return updated;
                          });
                          return;
                        }
                        // Update quantity if valid and different
                        const numValue = parseInt(value, 10);
                        if (numValue !== item.quantity) {
                          updateQuantity(item.productId, numValue, item.unit);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                      className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] max-w-[4rem] text-center bg-transparent border-0 focus:outline-none focus:ring-0 focus:bg-blue-50 transition-colors duration-200"
                      placeholder="1"
                    />

                    {/* Show unit next to quantity */}
                    <span className="px-2 py-2 font-medium text-gray-700 bg-white border-l border-gray-200">
                      {item.unit || "mg"}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.unit
                        )
                      }
                      className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-xl"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
