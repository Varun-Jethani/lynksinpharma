import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/AboutUs/About";
import CompanyProfile from "./components/CompanyProfile";
import OurProducts from "./components/OurProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-products" element={<OurProducts />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
