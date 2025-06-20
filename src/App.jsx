import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/AboutUs/About";
import CompanyProfile from "./components/CompanyProfile";
import OurProducts from "./components/Products.jsx/OurProducts";
import { Provider, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/userSlice";
import AuthPage from "./components/Auth/Auth";
import axios from "axios";
import Cart from "./components/Cart/Cart";
import ContactUs from "./components/Contact/ContactUs";
import Profile from "./components/Profile/Profile";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  axios.defaults.baseURL = API_BASE_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
