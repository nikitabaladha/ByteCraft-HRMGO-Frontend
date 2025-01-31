import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "./js/ThemeProvider";

import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = JSON.parse(localStorage.getItem("accessToken"));
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
        />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
