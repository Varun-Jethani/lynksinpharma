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
    <div className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-gray-200/50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="inline-block p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
            <Beaker size={28} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Life Science Products
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
