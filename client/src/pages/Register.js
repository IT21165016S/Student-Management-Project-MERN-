import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Make sure to use named export
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, googleRegister, error } = useRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  const handleGoogleRegister = async (googleResponse) => {
    console.log(googleResponse);
    const decodedResponse = jwtDecode(googleResponse.credential);
    console.log(decodedResponse);
    const googleAccessToken = decodedResponse;
    await googleRegister(googleAccessToken);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h3 className="text-2xl font-bold mb-4 text-center">Admin Register</h3>

        <label className="block mb-2 text-gray-700">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="block w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="block w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded mt-4"
        >
          REGISTER
        </button>
        <span className="block text-center my-2">or</span>
        <GoogleLogin
          onSuccess={(googleResponse) => {
            handleGoogleRegister(googleResponse);
          }}
          onError={() => {
            console.log("An error occurred while using Google Sign-in");
          }}
          className="w-full flex justify-center mb-4"
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <p className="text-center mt-4">
          Already registered? Login{" "}
          <Link to="/login" className="text-blue-500 underline">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
