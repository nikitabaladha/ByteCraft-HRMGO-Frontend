import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import postAPI from "../../api/postAPI.js";

import "../custom-login.css";

import background1 from "../../uploads/svg/login-1.svg";
import background2 from "../../uploads/svg/login-2.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI("/login", formData, false);

      if (!response.hasError) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem("toastShown", "false");
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected login error occurred. Please try again."
      );
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="custom-login">
      <div className="login-bg-img">
        <img src={background1} className="login-bg-1" alt="Background 1" />
        <img src={background2} className="login-bg-2" alt="Background 2" />
      </div>
      <div className="bg-login bg-primary"></div>
      <div className="custom-login-inner">
        <main className="custom-wrapper">
          <div className="custom-row">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-3 f-w-600">Login</h2>
                <div className="custom-login-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required=""
                      />
                    </div>
                    <div className="form-group mb-3 pss-field">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required=""
                      />
                    </div>
                    {generalError && (
                      <p className="error-message">{generalError}</p>
                    )}
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                      <span>
                        <Link
                          to="https://demo.workdo.io/hrmgo/forgot-password/en"
                          tabIndex={0}
                        >
                          Forgot Your Password?
                        </Link>
                      </span>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary mt-2 login-do-btn"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <p className="mt-4 text-info">Don't have an account ?</p>
                    <div className="d-grid">
                      <button
                        className="btn btn-info login-do-btn"
                        type="submit"
                        onClick={handleSignupRedirect}
                      >
                        Signup
                      </button>
                    </div>
                    <p className="my-4 text-center" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
