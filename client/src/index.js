import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { StudentsContextProvider } from "./context/StudentContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="57145367910-n5a13jrv01j5csuks43urgv6fpts4t77.apps.googleusercontent.com">
      <AuthContextProvider>
        <StudentsContextProvider>
          <App />
        </StudentsContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
