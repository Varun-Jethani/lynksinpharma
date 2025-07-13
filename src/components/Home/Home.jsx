import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Beaker,
  Users,
  Award,
  Zap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Hero from "./Hero";
import About from "./About";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchHistory } from "../../../store/searchHistorySlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.searchHistory.items);

  const newproducts = useMemo(() => {
    if (!searchHistory || searchHistory.length === 0)
      return [
        {
          code: "Fmoc-Val-Cit-PAB-PNP",
          name: "Fmoc-Val-Cit-PAB-PNP",
          cas: "863971-53-3",
          mw: "766.8",
        },
        {
          code: "DBCO-amine",
          name: "DBCO-amine",
          cas: "1255942-06-3",
          mw: "276.34",
        },
        {
          code: "DBCO-NHS ester",
          name: "DBCO-NHS ester",
          cas: "1353016-71-3",
          mw: "402.4",
        },
        {
          code: "EMCS",
          name: "EMCS",
          cas: "55750-63-5",
          mw: "308.29",
        },
      ];
    return searchHistory.map((item) => ({
      id: item.id,
      name: item.ChemicalName,
      code: item.CatalogCode,
      cas: item.CASNumber,
      mw: item.MolecularWeight,
    }));
  }, [searchHistory]);

  // console.log("New Products:", newproducts);

  const heroSlides = [
    {
      title: "Leading ADC Linker Solutions",
      subtitle:
        "Innovative drug-linker conjugates for next-generation therapeutics",
      cta: "Explore Our Products",
    },
    {
      title: "Peptide Synthesis Excellence",
      subtitle:
        "Custom peptides and peptidomimetics for pharmaceutical research",
      cta: "View Peptide Services",
    },
    {
      title: "Complete CRO Platform",
      subtitle: "From discovery to commercialization - your trusted partner",
      cta: "Learn More",
    },
  ];

  const products = [
    { code: "LPS-0010", name: "DBCO-acid", cas: "1353016-70-2", mw: "305.333" },
    {
      code: "LPS-0011",
      name: "DBCO-NHS ester",
      cas: "1353016-71-3",
      mw: "402.4",
    },
    {
      code: "LPS-0012",
      name: "Mal-amido-(CH2COOH)2",
      cas: "207613-14-7",
      mw: "284.22",
    },
    {
      code: "LPS-0013",
      name: "Mal-PEG1-NHS ester",
      cas: "1807518-72-4",
      mw: "310.26",
    },
  ];

  useEffect(() => {
    dispatch(fetchSearchHistory());
    // Fetch search history when component mounts
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        heroSlides={heroSlides}
        setCurrentSlide={setCurrentSlide}
        currentSlide={currentSlide}
      />

      {/* About Section */}
      <About Award={Award} />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services & Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive CRO platform for all your pharmaceutical needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Synthesis",
                items: [
                  "Peptides & Peptidomimetics",
                  "API Development",
                  "ADC Linkers",
                  "ADC - Drug + Linker Conjugation",
                ],
                icon: Beaker,
                color: "blue",
              },
              {
                title: "Discovery Services",
                items: [
                  "Synthetic Chemistry",
                  "Scale-up Services",
                  "Building Blocks",
                  "Reference Compounds",
                ],
                icon: Zap,
                color: "purple",
              },
              {
                title: "Medicinal Chemistry",
                items: [
                  "Structure-based Discovery",
                  "Lead Optimization",
                  "Pre-clinical Development",
                  "IND Submission",
                ],
                icon: Award,
                color: "green",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon
                    className={`h-6 w-6 text-${service.color}-500`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {searchHistory && searchHistory.length > 0
                ? "Recently Viewed Products"
                : "Featured Products"}
            </h2>
            <p className="text-xl text-gray-300">
              High-quality ADC linkers & Linker - drug conjugates & peptides
            </p>
          </div>

          {/* Updated grid with better responsive breakpoints */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newproducts.map((product, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-xl min-h-[280px] flex flex-col"
              >
                {/* Product Code */}
                <div className="text-sm text-blue-400 font-medium mb-3 bg-blue-400/10 px-3 py-1 rounded-full w-fit">
                  {product.code}
                </div>

                {/* Product Name - with better spacing */}
                <h3 className="text-lg font-bold mb-4 leading-tight flex-grow">
                  {product.name}
                </h3>

                {/* Product Details */}
                <div className="space-y-3 text-sm text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">CAS:</span>
                    <span>{product.cas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">M.W.:</span>
                    <span>{product.mw}</span>
                  </div>
                </div>

                {/* Inquiry Button */}
                <button
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                  onClick={() => {
                    // Navigate to /products?chemicalName=product.name
                    window.location.href = `/products?chemicalName=${encodeURIComponent(
                      product.name
                    )}`;
                  }}
                >
                  Inquiry
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center shadow-lg hover:shadow-xl cursor-pointer"
            >
              View Full Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
