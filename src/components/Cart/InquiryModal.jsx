import React from "react";
import { X, User, Mail, Phone, MapPin, Send } from "lucide-react";
const InquiryModal = ({
  setShowModal,
  formData,
  handleInputChange,
  errors,
  mergedCartItems,
  cartItems,
  totalItems,
  submitInquiry,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Request Inquiry
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-xl"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                        errors.name ? "border-red-300" : "border-gray-200"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                        errors.email ? "border-red-300" : "border-gray-200"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                        errors.phone ? "border-red-300" : "border-gray-200"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none ${
                        errors.address ? "border-red-300" : "border-gray-200"
                      }`}
                      placeholder="Enter your complete address"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Details
              </h3>

              <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {mergedCartItems.map((item) => (
                    <div
                      key={item.catalogNo}
                      className="bg-white rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.catalogNo}
                        </span>
                        <span className="text-sm font-bold">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
                        {item.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                        <div>CAS: {item.casNo}</div>
                        <div>M.W.: {item.mw}</div>
                        <div>Purity: {item.purity}</div>
                        {item.formula && <div>Formula: {item.formula}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total Products: {cartItems.length}</span>
                    <span>Total Quantity: {totalItems}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={submitInquiry}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                <Send size={20} />
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
