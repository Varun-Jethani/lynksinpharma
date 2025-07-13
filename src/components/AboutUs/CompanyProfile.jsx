import React from "react";
import {
  Building2,
  Beaker,
  Dna,
  Target,
  Shield,
  Globe,
  CheckCircle2,
  Microscope,
  FlaskConical,
  Atom,
  Settings,
  Star,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Footer from "../Footer";

const CompanyProfile = () => {
  const services = [
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Custom Synthesis",
      description:
        "Peptides and peptidomimetics tailored to your specifications",
    },
    {
      icon: <Atom className="w-6 h-6" />,
      title: "ADC Linker Development",
      description: "Advanced payload development and conjugation strategies",
    },
    {
      icon: <Dna className="w-6 h-6" />,
      title: "ADC Conjugation Services",
      description: "Site-specific conjugation and optimization protocols",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "API Process Development",
      description: "Intermediate development and scale-up solutions",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Pre-clinical Optimization",
      description: "Candidate optimization and manufacturing scale-up",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "Consistent quality from milligrams to kilogram-scale",
    },
  ];

  const competencies = [
    {
      icon: <Beaker className="w-8 h-8" />,
      title: "Synthetic Chemistry",
      description:
        "High-purity building blocks, reference compounds, and scalable synthesis solutions",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Medicinal Chemistry",
      description:
        "Structure-based drug discovery, lead optimization, and IND-enabling compounds",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Dna className="w-8 h-8" />,
      title: "ADC Expertise",
      description:
        "Comprehensive portfolio of cleavable and non-cleavable ADC linkers with site-specific strategies",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Process Development",
      description:
        "Efficient route scouting, scale-up, and advanced peptide manufacturing technologies",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Beaker className="w-8 h-8" />,
      title: "Peptide synthesis",
      description:
        "Solid-phase and solution-phase synthesis, including complex cyclic peptides",
      gradient: "from-red-500 to-blue-500",
    },
  ];

  const advantages = [
    {
      icon: <Building2 className="w-5 h-5" />,
      text: "End-to-End Services under one roof",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Experienced Scientific Team with global exposure",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Strict IP Protection and confidentiality protocols",
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Robust Quality Management System",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "ESG-Aligned Growth with sustainable development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-400/30 rounded-full px-6 py-2 mb-8">
              <span className="text-blue-300 font-medium">
                Technology-Driven CRO
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent">
                Company Profile
              </span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-8"></div>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Specialized in ADC linkers, drug-linker conjugates, and peptides
              for next-generation therapeutics
            </p>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-16 fill-current text-slate-50"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>

          <div className="relative">
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mr-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Lynksin Pharma Solutions Pvt. Ltd.
                </h2>
                <p className="text-blue-600 font-semibold text-lg">
                  Technology-Driven CRO
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We specialize in the design, synthesis, and manufacturing of
                  <span className="font-semibold text-blue-800">
                    {" "}
                    ADC linkers
                  </span>
                  ,
                  <span className="font-semibold text-blue-800">
                    {" "}
                    ADC drug-linker conjugates
                  </span>
                  , and
                  <span className="font-semibold text-blue-800"> peptides</span>
                  , serving pharmaceutical and biotech clients globally.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Headquartered in{" "}
                  <span className="font-semibold text-indigo-800">
                    Nagpur, India
                  </span>
                  , Lynksin is committed to supporting the development of
                  next-generation therapeutics by offering high-quality,
                  customizable chemical solutions.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transform rotate-1">
                  <div className="bg-white rounded-xl p-6 transform -rotate-1 shadow-lg text-center">
                    <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Global Reach
                    </h3>
                    <p className="text-gray-600">
                      Serving pharmaceutical and biotech clients worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Full spectrum drug development from early discovery to
              commercialization, acting as a reliable extension of our clients'
              teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-blue-100">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-white/10 border border-white/30 rounded-full px-6 py-3">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">
                From milligrams to kilogram-scale production with consistent
                quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Competencies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Competencies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized expertise across critical areas of pharmaceutical
            development and manufacturing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {competencies.map((competency, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${competency.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{competency.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {competency.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {competency.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex-shrink-0">
                    <div className="text-white">{advantage.icon}</div>
                  </div>
                  <p className="text-gray-700 font-medium">{advantage.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Outlook */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>

          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mr-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Global Outlook
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xl text-indigo-100 leading-relaxed mb-6">
                  Lynksin Pharma Solutions collaborates with leading
                  pharmaceutical innovators across the globe. With a commitment
                  to{" "}
                  <span className="font-semibold text-white">
                    scientific innovation
                  </span>
                  ,
                  <span className="font-semibold text-white">
                    {" "}
                    cost-effectiveness
                  </span>
                  , and
                  <span className="font-semibold text-white">
                    {" "}
                    regulatory excellence
                  </span>
                  .
                </p>
                <div className="inline-flex items-center bg-white/10 border border-white/30 rounded-full px-6 py-3">
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    Preferred CDMO Partner in Life Sciences
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">
                        2025
                      </div>
                      <div className="text-indigo-200 text-sm">Founded</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">
                        Global
                      </div>
                      <div className="text-indigo-200 text-sm">Reach</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">
                        ESG
                      </div>
                      <div className="text-indigo-200 text-sm">Aligned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer CTA */}
      {/* <div className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience end-to-end pharmaceutical development solutions with
            Lynksin Pharma Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105">
              Start Your Project
            </button>
            <button className="border-2 border-gray-400 text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:border-gray-300 transition-colors duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default CompanyProfile;
