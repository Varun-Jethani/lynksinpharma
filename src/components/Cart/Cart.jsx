import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import InquiryModal from "./InquiryModal";

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

  // Temporary quantity state for input editing
  const [tempQuantities, setTempQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Update quantity in cart (API call)
  // Update quantity in cart (API call) - now also sends unit
  const updateQuantity = async (productId, newQuantity, unit) => {
    if (newQuantity < 1) return;
    console.log(
      "Updated quantity for",
      productId,
      "to",
      newQuantity,
      "with unit",
      unit
    );
    try {
      await axios.post(
        "/user/cart/update",
        { productId, quantity: newQuantity, unit },
        { withCredentials: true }
      );

      dispatch(fetchCart());
      // Clear temp quantity after successful update
      setTempQuantities((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity.");
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
      toast.error(err.response?.data?.message || "Failed to remove item.");
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
        toast.success(
          "Order created successfully! Our team will contact you soon."
        );
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
        toast.error(
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

  // Get display quantity (temp or actual)
  const getDisplayQuantity = (item) => {
    return tempQuantities[item.productId] !== undefined
      ? tempQuantities[item.productId]
      : item.quantity;
  };

  if (mergedCartItems.length === 0) {
    return <EmptyCart navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4 cursor-pointer"
          >
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
          <CartItems
            mergedCartItems={mergedCartItems}
            getDisplayQuantity={getDisplayQuantity}
            getStructureIcon={getStructureIcon}
            updateQuantity={updateQuantity}
            setTempQuantities={setTempQuantities}
            removeItem={removeItem}
          />
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
          <InquiryModal
            setShowModal={setShowModal}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            mergedCartItems={mergedCartItems}
            cartItems={cartItems}
            totalItems={totalItems}
            submitInquiry={submitInquiry}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
