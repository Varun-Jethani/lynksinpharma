import React from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
const EmptyCart = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/products")}
            className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Inquiry Cart
          </h1>
        </div>

        {/* Empty Cart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center">
          <div className="mb-8">
            <div className="inline-block p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl mb-6">
              <ShoppingCart size={80} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your inquiry cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Add some chemicals to request an inquiry!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Browse Chemicals
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
