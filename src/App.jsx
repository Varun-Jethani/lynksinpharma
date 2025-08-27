import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/AboutUs/About";

import OurProducts from "./components/Products.jsx/OurProducts";
import { Provider, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/userSlice";
import AuthPage from "./components/Auth/Auth";
import axios from "axios";
import Cart from "./components/Cart/Cart";
import ContactUs from "./components/Contact/ContactUs";
import Profile from "./components/Profile/Profile";
import CompanyProfile from "./components/AboutUs/CompanyProfile";
import CareersPage from "./components/Career/Career";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

  const GoogleAuthwrapper = () => {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthPage />
      </GoogleOAuthProvider>
    );
  };
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<GoogleAuthwrapper />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
