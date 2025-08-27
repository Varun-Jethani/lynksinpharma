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
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Beaker className="text-white h-5 w-5" />
              </div>
              <div>
                <div className="font-bold">Lynksin</div>
                <div className="text-sm text-gray-400">Pharma Solutions</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Leading provider of ADC linkers, linker - drug conjugate, peptides
              and pharmaceutical solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Custom Synthesis</li>
              <li>ADC Linkers</li>
              <li>Peptide Services</li>
              <li>CRO</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400 cursor-pointer">
              <li onClick={() => navigate("/about-us")}>About Us</li>
              <li onClick={() => navigate("/products")}>Products</li>
              <li onClick={() => navigate("/Careers")}>Careers</li>
              <li onClick={() => navigate("/contact-us")}>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@lynksinpharma.com
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 9422117461
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; Lynksin Pharma Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
