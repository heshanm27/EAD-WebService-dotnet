import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered email and password match the predefined values
    if (email === "admin@gmail.com" && password === "admin123") {
      // Display a success toast message
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/sidebar");
    } else {
      // Display an error toast message
      toast.error("Invalid email or password. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
