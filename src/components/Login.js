import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../services/apiService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Disable button and set loading state
    try {
      const { access, refresh } = await apiService.login(username, password);

      // Store tokens in localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      apiService.setAuthToken(access); // Set token for future requests

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again."); // Show error message
    } finally {
      setIsLoggingIn(false); // Re-enable button after login attempt
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoggingIn} // Disable button if logging in
          className={`w-full ${isLoggingIn ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
        >
          {isLoggingIn ? "Logging in..." : "Login"} {/* Change button text based on state */}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
