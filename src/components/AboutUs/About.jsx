import React from "react";
import { Users, Target, Eye, History, Award, User } from "lucide-react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              About Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Welcome to{" "}
              <span className="font-bold text-white">
                Lynksin Pharma Pvt. Ltd.
              </span>
              , your trusted partner in advancing life sciences through
              innovative chemical solutions.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 fill-current text-blue-50"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pioneering Chemical Solutions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We specialize in the research, development, and supply of
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
                <span className="font-semibold text-blue-800">
                  {" "}
                  peptides
                </span>{" "}
                tailored for both pharmaceutical and biotech industries.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a comprehensive{" "}
                <span className="font-semibold text-indigo-800">
                  CRO (Contract Research Organization)
                </span>{" "}
                <span className="font-semibold text-indigo-800"> </span>, we
                provide end-to-end support — from early-stage drug discovery to
                process development and commercial-scale manufacturing.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transform rotate-2">
                <div className="bg-white rounded-xl p-6 transform -rotate-2 shadow-lg">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                    One-Stop Platform
                  </h3>
                  <p className="text-gray-600 text-center">
                    Empowering your scientific goals with precision, quality,
                    and cutting-edge technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline and Culture Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* History */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mr-4">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our History</h2>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Lynksin Pharma Solutions emerged with a mission to bridge the gap
              between drug innovation and scalable chemical development. From
              humble beginnings in Nagpur, India, we've grown into a dynamic
              force supporting global R&D in antibody-drug conjugates (ADCs) and
              peptide-based therapeutics.
            </p>
          </div>

          {/* Culture */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mr-4">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our Culture</h2>
            </div>
            <p className="text-indigo-100 leading-relaxed">
              We foster a culture of{" "}
              <span className="font-semibold">
                scientific excellence, client collaboration, and continuous
                innovation
              </span>
              . Our team consists of passionate chemists, process engineers, and
              regulatory experts committed to creating a positive impact in
              healthcare through chemistry.
            </p>
          </div>
        </div>
      </div>

      {/* Vision and Mission */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500 transform hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To support our partners' research and development of{" "}
                <span className="font-semibold text-blue-800">
                  innovative treatments
                </span>{" "}
                by providing{" "}
                <span className="font-semibold text-blue-800">
                  high-quality goods and services
                </span>{" "}
                rooted in
                <span className="font-semibold text-blue-800">
                  {" "}
                  technology advancement
                </span>{" "}
                and{" "}
                <span className="font-semibold text-blue-800">
                  scientific innovation
                </span>
                . We aim to be recognized as a{" "}
                <span className="font-semibold text-blue-800">
                  top provider of life science services
                </span>
                , delivering valuable therapies to patients faster and at lower
                cost.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500 transform hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mr-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To offer{" "}
                <span className="font-semibold text-indigo-800">
                  lifetime support with quality assurance
                </span>{" "}
                by providing
                <span className="font-semibold text-indigo-800">
                  {" "}
                  affordable and optimized solutions
                </span>{" "}
                in the development of new therapeutics using{" "}
                <span className="font-semibold text-indigo-800">
                  innovative technology platforms
                </span>
                . We are committed to enhancing lives through pharmaceutical and
                healthcare product development while creating exceptional value
                for clients and investors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kishor Chopde */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Kishor Chopde
            </h3>
            <p className="text-blue-600 font-semibold text-lg">Director</p>
          </div>

          {/*Shital Chopde*/}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Shital Chopde
            </h3>
            <p className="text-purple-600 font-semibold text-lg">Director</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Advance Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Partner with Lynksin Pharma Solutions for innovative chemical
            solutions and comprehensive life science services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg cursor-pointer"
            >
              Contact Us Today
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300">
              Learn More
            </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
