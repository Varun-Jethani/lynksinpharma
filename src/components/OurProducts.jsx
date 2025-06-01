import React, { useState, useMemo } from "react";
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

// Product data from catalog
const sampleProducts = [
  {
    catalogNo: "LPS-0001",
    name: "6-(2-(Methylsulfonyl)pyrimidin-5-yl)hex-5-ynoic acid",
    casNo: "2356229-58-6",
    mw: "268.29",
    purity: "Research Grade",
    formula: "C11H12N2O4S",
  },
  {
    catalogNo: "LPS-0002",
    name: "Fmoc-Val-Cit-PAB-PNP",
    casNo: "863971-53-3",
    mw: "766.80",
    purity: "Research Grade",
    formula: "C40H42N6O10",
  },
  {
    catalogNo: "LPS-0003",
    name: "Fmoc-Gly-NH-CH2-acetyloxy",
    casNo: "1599440-06-8",
    mw: "368.38",
    purity: "Research Grade",
    formula: "C20H20N2O5",
  },
  {
    catalogNo: "LPS-0004",
    name: "Ac-(Gly(N-me))-Sar-Sar-Sar-Sar-Sar-Sar-Sar-Sar",
    casNo: "2857963-60-9",
    mw: "770.83",
    purity: "Research Grade",
    formula: "C32H58N12O11",
  },
  {
    catalogNo: "LPS-0005",
    name: "Mc-Val-Cit-PABC-PNP",
    casNo: "159857-81-5",
    mw: "737.76",
    purity: "Research Grade",
    formula: "C35H39N7O11",
  },
  {
    catalogNo: "LPS-0007",
    name: "Mc-Val-Ala-PAB-PNP",
    casNo: "1639939-40-4",
    mw: "Not listed",
    purity: "Research Grade",
    formula: "C28H35N5O9",
  },
  {
    catalogNo: "LPS-0008",
    name: "DBCO-amine",
    casNo: "1255942-06-3",
    mw: "276.34",
    purity: "Research Grade",
    formula: "C16H16N2O2",
  },
  {
    catalogNo: "LPS-0009",
    name: "MC-Gly-Gly-Phe-Gly-NH-CH2-O-CH2COOH",
    casNo: "1599440-25-1",
    mw: "616.62",
    purity: "Research Grade",
    formula: "C27H32N6O9",
  },
];

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
            <h3 className="font-semibold text-gray-700 mb-4 text-center">
              Molecular Structure
            </h3>
            <div className="flex flex-col items-center justify-center h-32">
              <Atom size={48} className="text-blue-500 mb-2" />
              <span className="text-sm text-gray-600">Structure diagram</span>
              <span className="text-xs text-gray-500 mt-1">Coming soon</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg">
            Request Quote
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
            <ExternalLink size={18} />
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function LifeScienceProductsCatalog() {
  const [products] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("catalog");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.catalogNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.casNo.includes(searchTerm)
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

  const getStructureIcon = (index) => {
    const icons = [Atom, Beaker, FlaskConical];
    const Icon = icons[index % icons.length];
    return <Icon size={32} className="text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header with enhanced gradient */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Beaker size={40} className="text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Life Science Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Premium pharmaceutical intermediates, peptide conjugates, and
              bioconjugation reagents for advanced drug development and research
              applications
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
              <input
                type="text"
                placeholder="Search by name, catalog number, or CAS number..."
                className="w-full pl-14 pr-8 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <select
                className="px-8 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium bg-white/80 backdrop-blur-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="catalog">Sort by Catalog No.</option>
                <option value="name">Sort by Name</option>
                <option value="mw">Sort by Molecular Weight</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-8 py-5 border-2 border-gray-200 rounded-2xl hover:bg-white hover:border-blue-300 transition-all duration-300 flex items-center gap-3 font-medium text-lg bg-white/80 backdrop-blur-sm hover:shadow-lg"
              >
                {sortOrder === "asc" ? (
                  <ChevronUp size={22} className="text-blue-600" />
                ) : (
                  <ChevronDown size={22} className="text-blue-600" />
                )}
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
          </div>

          <div className="mt-8 text-lg text-gray-600 font-medium text-center">
            Showing{" "}
            <span className="text-blue-600 font-bold text-xl">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="text-purple-600 font-bold text-xl">
              {products.length}
            </span>{" "}
            products
          </div>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
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
                    onClick={() => setSelectedProduct(product)}
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
                <div className="w-full h-32 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-2xl mb-8 flex flex-col items-center justify-center border-2 border-blue-100 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-500 group-hover:border-blue-200">
                  <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                    {getStructureIcon(index)}
                    <span className="block text-sm text-gray-600 font-medium mt-2">
                      {product.formula}
                    </span>
                    <span className="text-xs text-gray-500">
                      Molecular Structure
                    </span>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                  Request Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="mb-8">
              <div className="inline-block p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl mb-6">
                <Search size={80} className="text-gray-400" />
              </div>
            </div>
            <div className="text-gray-600 text-3xl mb-4 font-bold">
              No products found
            </div>
            <div className="text-gray-500 text-xl max-w-md mx-auto">
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
