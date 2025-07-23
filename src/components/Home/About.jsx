import React from "react";
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
const About = ({ Award }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Lynksin Pharma Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We focus on providing ADC linkers, drug-linker conjugates, and
            peptides for pharmaceutical and biotech clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-blue-500 mr-3" />
                Our Vision
              </h3>
              <p className="text-gray-600 text-justify leading-relaxed">
                To support our partners' research and development of innovative
                treatments by providing high-quality goods and services founded
                on technology advancement and scientific innovation. We aim to
                be recognized as the top provider of life science services.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="h-6 w-6 text-purple-500 mr-3" />
                Our Mission
              </h3>
              <p className="text-gray-600 text-justify leading-relaxed">
                To offer lifetime support with high quality assurance by
                providing affordable and optimized solutions in the development
                of new therapeutics based on innovative technology platforms.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-left">
              Key Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-blue-500 mb-1 drop-shadow-sm">
                  100+
                </div>
                <div className="text-gray-600 text-base font-medium">
                  Product Catalog
                </div>
              </div>
              <div className="hidden sm:block border-l border-gray-200 h-16 mx-auto"></div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-green-500 mb-1 drop-shadow-sm">
                  99%
                </div>
                <div className="text-gray-600 text-base font-medium">
                  Quality Rate
                </div>
              </div>
              <div className="hidden sm:block border-l border-gray-200 h-16 mx-auto"></div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-orange-500 mb-1 drop-shadow-sm">
                  24/7
                </div>
                <div className="text-gray-600 text-base font-medium">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
