import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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
} from "lucide-react";
import { fetchProducts } from "../../../store/productsSlice";
import { fetchUserProfile } from "../../../store/userSlice";
import ProductsGrid from "./ProductsGrid";
import Header from "./Header";
import { s } from "framer-motion/client";
import { fetchSearchHistory } from "../../../store/searchHistorySlice";
import RecentSearches from "./RecentSearches";

const ProductModal = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-2">
                Product Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Catalog No:</span>
                  <span className="font-mono font-medium">
                    {product.catalogNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CAS No:</span>
                  <span className="font-mono font-medium">{product.casNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Molecular Weight:</span>
                  <span className="font-mono font-medium">{product.mw}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium text-blue-600">
                    {product.purity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Formula:</span>
                  <span className="font-mono font-medium">
                    {product.formula}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
            <div className="flex items-center justify-center h-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain scale-125"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg">
            Request Quote
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
            <ExternalLink size={18} />
            View Details
          </button>
        </div> */}
      </div>
    </div>
  </div>
);

export default function LifeScienceProductsCatalog() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const userProfile = useSelector((state) => state.user.profile);
  const userLoading = useSelector((state) => state.user.loading);
  const searchHistory = useSelector((state) => state.searchHistory.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("catalog");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  // If chemicalName query param is present, set searchTerm to it
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chemicalName = params.get("chemicalName");
    if (chemicalName) {
      setSearchTerm(decodeURIComponent(chemicalName));
    }
  }, [location.search]);
  const [cartUpdateLoading, setCartUpdateLoading] = useState(false);
  console.log("Search History:", searchHistory);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUserProfile());
    dispatch(fetchSearchHistory());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    // Map backend fields to UI fields for compatibility
    const mappedProducts = products.map((product) => ({
      catalogNo: product.CatelogNumber || product.catalogNo || "",
      name: product.ChemicalName || product.name || "",
      casNo: product.CASNumber || product.casNo || "",
      mw: product.MolecularWeight?.toString() || product.mw || "",
      purity: product.purity || "Research Grade",
      formula: product.formula || "",
      image: product.Image || product.image || "",
      inStock: product.inStock,
      _id: product._id,
      // Add more mappings as needed
    }));
    let filtered = mappedProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.catalogNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.casNo?.includes(searchTerm)
    );

    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "mw":
          // Handle "Not listed" case
          aVal = a.mw === "Not listed" ? 0 : parseFloat(a.mw);
          bVal = b.mw === "Not listed" ? 0 : parseFloat(b.mw);
          break;
        default:
          aVal = a.catalogNo;
          bVal = b.catalogNo;
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy, sortOrder]);

  const mappedSearchHistory = useMemo(() => {
    const mapped = searchHistory.map((product) => ({
      catalogNo: product.CatelogNumber || product.catalogNo || "",
      name: product.ChemicalName || product.name || "",
      casNo: product.CASNumber || product.casNo || "",
      mw: product.MolecularWeight?.toString() || product.mw || "",
      purity: product.purity || "Research Grade",
      formula: product.formula || "",
      image: product.Image || product.image || "",
      inStock: product.inStock,
      _id: product._id,
      // Add more mappings as needed
    }));
    return mapped.reverse();
  }, [searchHistory]);

  const getStructureIcon = (index) => {
    const icons = [Atom, Beaker, FlaskConical];
    const Icon = icons[index % icons.length];
    return <Icon size={32} className="text-blue-400" />;
  };

  // Add to cart handler (for new items)
  const handleAddToCart = async (product, quantity) => {
    try {
      setCartUpdateLoading(true);
      await axios.post(
        "/user/cart/add",
        {
          productId: product._id,
          quantity,
        },
        { withCredentials: true }
      );
      alert("Product added to cart!");
      // Refresh user profile to update cart
      dispatch(fetchUserProfile());
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setCartUpdateLoading(false);
    }
  };

  // Update cart quantity handler (for existing cart items)
  const handleUpdateCart = async (productId, quantity) => {
    try {
      setCartUpdateLoading(true);
      await axios.post(
        "/user/cart/update",
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      // Refresh user profile to update cart
      dispatch(fetchUserProfile());
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setCartUpdateLoading(false);
    }
  };

  //add search history tracking
  // This effect saves search history when the user is logged in

  const handleViewProduct = (product) => {
    // Track product view
    if (userProfile) {
      axios
        .post(
          "/user/search/history",
          { Productid: product._id },
          { withCredentials: true }
        )
        .catch(() => {});
    }
    setSelectedProduct(product);
  };

  // Save search history when filteredProducts changes and user is logged in
  useEffect(() => {
    if (userProfile && filteredProducts.length > 0 && searchTerm.trim()) {
      const productIds = filteredProducts.map((p) => p._id).filter(Boolean);
      if (productIds.length > 0) {
        axios
          .post(
            "/user/search/history",
            { productIds },
            { withCredentials: true }
          )
          .catch(() => {});
      }
    }
    // Only run when filteredProducts, userProfile, or searchTerm changes
  }, [filteredProducts, userProfile, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-10 text-xl text-blue-600 font-bold">
          Loading products...
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-xl text-red-600 font-bold">
          {error}
        </div>
      )}

      {/* Cart Update Loading Overlay */}
      {cartUpdateLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Updating cart...</p>
            </div>
          </div>
        </div>
      )}

      {/* Header with enhanced gradient */}
      <Header />

      {/* Enhanced Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Search and Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-10 border border-white/50">
          {/* Main Search and Controls Container */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search Input - Full width on mobile */}
            <div className="relative w-full">
              <Search
                className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, catalog number, or CAS number..."
                className="w-full pl-10 sm:pl-14 pr-4 sm:pr-8 py-3 sm:py-4 lg:py-5 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base lg:text-lg bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Controls - Stack on mobile, side by side on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Sort Dropdown */}
              <select
                className="flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base lg:text-lg font-medium bg-white/80 backdrop-blur-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="catalog">Sort by Catalog No.</option>
                <option value="name">Sort by Name</option>
                <option value="mw">Sort by Molecular Weight</option>
              </select>

              {/* Sort Order Button */}
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:bg-white hover:border-blue-300 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-medium text-sm sm:text-base lg:text-lg bg-white/80 backdrop-blur-sm hover:shadow-lg sm:min-w-fit"
              >
                {sortOrder === "asc" ? (
                  <ChevronUp
                    size={18}
                    className="text-blue-600 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="text-blue-600 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  />
                )}
                <span className="whitespace-nowrap">
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </span>
              </button>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base lg:text-lg text-gray-600 font-medium text-center">
            Showing{" "}
            <span className="text-blue-600 font-bold text-base sm:text-lg lg:text-xl">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="text-purple-600 font-bold text-base sm:text-lg lg:text-xl">
              {products.length}
            </span>{" "}
            products
            {userProfile?.cart && (
              <span className="ml-4 text-green-600 font-bold">
                | {userProfile.cart.length} items in cart
              </span>
            )}
          </div>
        </div>

        {searchHistory.length > 0 && (
          <div className="mt-8">
            <RecentSearches
              searchHistory={mappedSearchHistory}
              onProductClick={handleViewProduct}
              onAddToCart={handleAddToCart}
              onUpdateCart={handleUpdateCart}
              userCart={userProfile?.cart || []}
              onClearHistory={() => {
                // Add API call to clear search history
                axios
                  .delete(
                    "/user/search/history/clear",
                    {},
                    { withCredentials: true }
                  )
                  .then(() => dispatch(fetchSearchHistory()))
                  .catch(() => {});
              }}
              isVisible={mappedSearchHistory.length > 0}
            />
          </div>
        )}

        {/* Enhanced Product Grid */}
        <ProductsGrid
          filteredProducts={filteredProducts}
          setSelectedProduct={setSelectedProduct}
          getStructureIcon={getStructureIcon}
          onAddToCart={handleAddToCart}
          onUpdateCart={handleUpdateCart}
          handleViewProduct={handleViewProduct}
          userCart={userProfile?.cart || []}
        />

        {/* Enhanced No Results - Responsive */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-24">
            <div className="mb-6 sm:mb-8">
              <div className="inline-block p-4 sm:p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6">
                <Search size={60} className="text-gray-400 sm:w-20 sm:h-20" />
              </div>
            </div>
            <div className="text-gray-600 text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-4 font-bold px-4">
              No products found
            </div>
            <div className="text-gray-500 text-base sm:text-lg lg:text-xl max-w-md mx-auto px-4">
              Try adjusting your search criteria or browse our complete catalog
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
