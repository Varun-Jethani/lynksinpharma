import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Package,
  Send,
  Truck,
  Shield,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { fetchCart } from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart) || {};
  const { items: cartItems = [], loading = false, error = null } = cartState;
  console.log("Cart items:", cartItems);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    message: "",
  });

  // Form validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Update quantity in cart (API call)
  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.post(
        "/user/cart/update",
        { productId, quantity: newQuantity },
        { withCredentials: true }
      );
      dispatch(fetchCart());
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity.");
    }
  };

  // Remove item from cart (API call)
  const removeItem = async (productId) => {
    try {
      await axios.delete(`/user/cart/remove/${productId}`, {
        withCredentials: true,
      });
      dispatch(fetchCart());
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item.");
    }
  };

  // Get structure icon
  const getStructureIcon = (type) => {
    const icons = [Package, Package, Package];
    const IconComponent = icons[Math.floor(Math.random() * icons.length)];
    return <IconComponent size={32} className="text-blue-600" />;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit inquiry and create order
  const submitInquiry = async () => {
    if (validateForm()) {
      if (
        !window.confirm(
          "Are you sure you want to submit this inquiry and create an order?"
        )
      )
        return;
      try {
        // Prepare order payload
        const orderPayload = {
          name: formData.name,
          Email: formData.email,
          phone: formData.phone,
          Address: formData.address,
          CompanyName: formData.company,
          Message: formData.message,

          products: mergedCartItems.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
        };
        await axios.post("/order", orderPayload, { withCredentials: true });
        alert("Order created successfully! Our team will contact you soon.");
        setShowModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          company: "",
          message: "",
        });
        dispatch(fetchCart()); // Refresh cart after order
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "Failed to create order. Please try again."
        );
      }
    }
  };

  // Map cart items to display format
  const mergedCartItems = cartItems.map((cartItem) => {
    const product = cartItem.product || {};
    return {
      ...cartItem,
      catalogNo: product.CatelogNumber || "",
      name: product.ChemicalName || "",
      casNo: product.CASNumber || "",
      mw: product.MolecularWeight?.toString() || "",
      purity: "Research Grade", // Default since not in your data structure
      formula: product.formula || "", // Add if available in your data
      image: product.Image || "",
      productId: product._id || cartItem._id,
    };
  });

  // Calculate total items
  const totalItems = mergedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (mergedCartItems.length === 0) {
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4 cursor-pointer">
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Inquiry Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} products, {totalItems} total items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
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

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-xl"
                            disabled={item.quantity <= 1}
                          >
                            <Minus
                              size={16}
                              className={
                                item.quantity <= 1
                                  ? "text-gray-300"
                                  : "text-gray-600"
                              }
                            />
                          </button>
                          <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
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

          {/* Inquiry Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Inquiry Summary
              </h2>

              {/* Summary Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    Total Products
                  </span>
                  <span className="font-bold text-lg">{cartItems.length}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">
                    Total Quantity
                  </span>
                  <span className="font-bold text-lg">{totalItems}</span>
                </div>
              </div>

              {/* Request Inquiry Button */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 mb-4"
              >
                <Send size={20} />
                Request Inquiry
              </button>

              {/* Info Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-2 text-blue-700">
                  <FileText size={16} className="mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Request Process:</p>
                    <p>
                      Submit your inquiry with contact details and we'll provide
                      pricing, availability, and shipping information within 24
                      hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Modal */}
        {showModal && (
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
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
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
                              errors.email
                                ? "border-red-300"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
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
                              errors.phone
                                ? "border-red-300"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
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
                              errors.address
                                ? "border-red-300"
                                : "border-gray-200"
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
                              {item.formula && (
                                <div>Formula: {item.formula}</div>
                              )}
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
        )}
      </div>
    </div>
  );
};

export default Cart;
