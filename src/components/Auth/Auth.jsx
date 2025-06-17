import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setShowOTPVerification(false);
    setOtpTimer(0);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });
  };

  const startOtpTimer = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;

    setIsLoading(true);
    try {
      // Real API call to /user/sendOTP
      await axios.post(
        "/user/sendOTP",
        { email: formData.email },
        { withCredentials: true }
      );

      showNotification("OTP sent successfully!", "success");
      startOtpTimer();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to send OTP",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const { email, otp } = formData;

    if (!otp.trim()) {
      showNotification("Please enter the OTP", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Real API call to /user/verifyOTP
      const response = await axios.post(
        "/user/verifyOTP",
        { email, otp },
        { withCredentials: true }
      );

      // Save token if returned (treat as login after verification)
      // The backend does NOT return a token here, so just show success and redirect
      showNotification("Account verified! Please login.", "success");
      const token = response.data?.token;
          if (token) {
            localStorage.setItem("token", token);
            dispatch(fetchUserProfile());
            showNotification("Successfully signed in!", "success");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "OTP verification failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { email, password, name, confirmPassword } = formData;

    if (!isLoginMode) {
      if (password !== confirmPassword) {
        showNotification("Passwords do not match", "error");
        return;
      }
      if (!name.trim()) {
        showNotification("Please enter your full name", "error");
        return;
      }
    }

    if (!email || !password) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Real API call to /user/login
        let response;
        try {
          response = await axios.post(
            "/user/login",
            { email, password },
            { withCredentials: true, validateStatus: () => true }
          );
        } catch (err) {
          // This should not happen unless network error
          throw err;
        }

        // If user is not verified, backend sends 300 and triggers OTP
        if (response.status === 300) {
          showNotification(
            "Account not verified. OTP sent to your email. Please verify.",
            "info"
          );
          setShowOTPVerification(true);
          startOtpTimer();
        } else if (response.status >= 200 && response.status < 300) {
          // Save token if returned
          const token = response.data?.token;
          if (token) {
            localStorage.setItem("token", token);
            dispatch(fetchUserProfile());
            showNotification("Successfully signed in!", "success");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            showNotification("Login failed. No token received.", "error");
          }
        } else {
          showNotification(
            response.data?.message || "Login failed. Please try again.",
            "error"
          );
        }
      } else {
        // Real API call to /user/register
        const response = await axios.post(
          "/user/register",
          { name, email, phone: formData.mobile, password },
          { withCredentials: true }
        );

        if (response.status >= 200 && response.status < 300) {
          showNotification("Please verify your email to complete registration.", "success");
          setShowOTPVerification(true);
          startOtpTimer();
        }
        else {
          showNotification(
            response.data?.message || "Registration failed. Please try again.",
            "error"
          );
        }
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Network error. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium animate-pulse ${
              notification.type === "success"
                ? "bg-green-500"
                : notification.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
      </div>

      {/* Auth Container */}
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-white border-opacity-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {showOTPVerification
              ? "Verify Email"
              : isLoginMode
              ? "Welcome Back"
              : "Create Account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {showOTPVerification
              ? "Enter the OTP sent to your email"
              : isLoginMode
              ? "Sign in to your account"
              : "Join us today"}
          </p>
        </div>

        {/* OTP Verification Form */}
        {showOTPVerification ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                OTP sent to:{" "}
                <span className="font-medium text-indigo-600">
                  {formData.email}
                </span>
              </p>
            </div>

            {/* OTP Input */}
            <div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg text-center text-lg tracking-widest font-mono"
                required
              />
            </div>

            {/* Verify OTP Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-green-700 hover:to-blue-700 active:scale-95"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={otpTimer > 0 || isLoading}
                className={`text-sm font-medium transition-colors ${
                  otpTimer > 0 || isLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-indigo-600 hover:text-indigo-800 hover:underline"
                }`}
              >
                {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
              </button>
            </div>

            {/* Back to Registration */}
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setShowOTPVerification(false);
                  setOtpTimer(0);
                  setFormData((prev) => ({ ...prev, otp: "" }));
                }}
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline font-medium"
              >
                ← Back to Registration
              </button>
            </div>
          </div>
        ) : (
          /* Login/Register Form */
          <div className="space-y-4">
            {/* Name Field (Signup only) */}
            {!isLoginMode && (
              <div className="transform transition-all duration-300 ease-in-out">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg"
                  required={!isLoginMode}
                />
              </div>
            )}

            {/* Mobile Number Field (Signup only) */}
            {!isLoginMode && (
              <div className="transform transition-all duration-300 ease-in-out">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg"
                  required={!isLoginMode}
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg"
                required
              />
            </div>

            {/* Confirm Password Field (Signup only) */}
            {!isLoginMode && (
              <div className="transform transition-all duration-300 ease-in-out">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white bg-opacity-80 focus:bg-opacity-100 focus:transform focus:-translate-y-1 focus:shadow-lg"
                  required={!isLoginMode}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-indigo-700 hover:to-purple-700 active:scale-95"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : isLoginMode ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Mode Switch */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm mb-3">
                {isLoginMode
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:transform hover:-translate-y-1 active:scale-95"
              >
                {isLoginMode ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
