import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./js/ThemeProvider";

import AppRoutes from "./routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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
