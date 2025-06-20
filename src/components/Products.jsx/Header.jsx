import React from "react";
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
const Header = () => {
  return (
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
  );
};

export default Header;
