import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGoogleLogin = async (googleResponse) => {
    console.log(googleResponse);
    const decodedResponse = jwtDecode(googleResponse.credential);
    console.log(decodedResponse);
    const googleAccessToken = decodedResponse;
    await googleLogin(googleAccessToken);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h3 className="text-2xl font-bold mb-6 text-center">Admin Log In</h3>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600 transition duration-200"
        >
          LOGIN
        </button>

        <div className="text-center mb-4 text-gray-600">or</div>

        <GoogleLogin
          onSuccess={(googleResponse) => {
            handleGoogleLogin(googleResponse);
          }}
          onError={() => {
            console.log("An error occurred while using Google sign-in");
          }}
          className="w-full flex justify-center"
        />

        <p className="text-center mt-4">
          New users register{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            here
          </Link>
        </p>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
