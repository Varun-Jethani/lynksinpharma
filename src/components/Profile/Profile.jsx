import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  Eye,
  Star,
  ChevronDown,
  Edit3,
  Shield,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/userSlice";
import { fetchUserOrders } from "../../../store/userOrdersSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.profile) || {};
  const orders = useSelector((state) => state.userOrders.orders) || [];
  console.log("User Data:", orders);
  const userLoading = useSelector((state) => state.user.loading);
  const ordersLoading = useSelector((state) => state.userOrders.loading);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border-0 mb-8 overflow-hidden">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"></div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex items-center justify-center -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                  {userData.verified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mt-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData.name}
                </h1>
                {userData.verified && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3">
                    <Shield className="w-4 h-4" />
                    Verified Account
                  </div>
                )}
                <p className="text-gray-600 text-lg">
                  Member since {formatDate(userData.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border-0 p-1">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-lg transition-all duration-200 ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-lg transition-all duration-200 ${
                activeTab === "orders"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Order History
            </button>
          </nav>
        </div>

        {/* Profile Information Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border-0 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                        Full Name
                      </p>
                      <p className="text-gray-900 font-medium text-lg">
                        {userData.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                        Email Address
                      </p>
                      <p className="text-gray-900 font-medium text-lg">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                        Phone Number
                      </p>
                      <p className="text-gray-900 font-medium text-lg">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-0 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                      Account Created
                    </p>
                    <p className="text-gray-900 font-medium text-lg">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide">
                      Last Updated
                    </p>
                    <p className="text-gray-900 font-medium text-lg">
                      {formatDate(userData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order History
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  {orders.length} Total Orders
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600">
                    When you place your first order, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id || order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Order #{order._id || order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.date || order.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status || "processing"
                            )}`}
                          >
                            {order.status || "Processing"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {order.total ? `$${order.total}` : null}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items
                              ? `${order.items} item${
                                  order.items > 1 ? "s" : ""
                                }`
                              : null}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Products:
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {(order.products || order.items || []).map(
                            (item, idx) => {
                              let prod = item.product ? item.product : item;
                              let quantity =
                                item.quantity || prod.quantity || 1;
                              return (
                                <div
                                  key={prod._id || idx}
                                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center w-64 min-h-[180px]"
                                >
                                  {prod.Image && (
                                    <img
                                      src={prod.Image}
                                      alt={
                                        prod.ChemicalName ||
                                        prod.name ||
                                        "Product"
                                      }
                                      className="w-20 h-20 object-contain rounded-lg border mb-2"
                                    />
                                  )}
                                  <div className="w-full text-center">
                                    <div className="font-semibold text-gray-900 text-base mb-1">
                                      {prod.ChemicalName ||
                                        prod.name ||
                                        "Product"}
                                    </div>
                                    <div className="text-sm text-gray-700 mb-1">
                                      Catalog #:{" "}
                                      <span className="font-medium">
                                        {prod.CatelogNumber || "N/A"}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-700 mb-1">
                                      CAS #:{" "}
                                      <span className="font-medium">
                                        {prod.CASNumber || "N/A"}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      Quantity:{" "}
                                      <span className="font-medium">
                                        {quantity}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-4">
                        {order.status === "Delivered" && (
                          <button className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                            <Star className="w-4 h-4" />
                            Rate Products
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
