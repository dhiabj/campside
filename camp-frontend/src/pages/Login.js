import React from "react";
import "../css/Login.css";
import logo from "../assets/camp-logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`http://localhost:8000/api/users/login`, { ...user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.status === "ok") {
          localStorage.setItem("token", res.data.user);
          toast.success("Login successful!");
          navigate("/home");
        } else {
          toast.error("Please check your username and password!");
        }
      });
  };

  return (
    <div>
      <div className="row g-0">
        <div className="col-md-6 center-col">
          <div className="card login-card">
            <div className="card-body">
              <img src={logo} alt="camp-logo" className="img-fluid login-img" />
              <form className="login-form" onSubmit={loginUser}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary login-btn">
                  Sign In
                </button>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
