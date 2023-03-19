import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://inotebook-note-app.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      //redirect
      sessionStorage.setItem("token", json.auth_token);
      navigate("/");
      props.showAlert("Successfully Logged in", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    console.log(json);
  };

  return (
    <div>
      <div className="cardWrapper  position-relative">
        <div
          className="card mt-4  whiteBox d-flex flex-row justify-content-end"
          style={{ width: "100%", height: "34vh", zIndex: "1" }}
        >
          <div className="  rightBox mx-5" style={{ width: "40%" }}>
            <div className="p-3 d-flex flex-column align-items-center">
              <h3 className="text-dark">First time here ?</h3>
              <Link to="/signup" className="nav-link text-primary my-2">
                <div className="btn btn-light">Sign up</div>
              </Link>
            </div>
            <hr className="my-2" />
            <div className="p-3 d-flex flex-column align-items-center">
              <div>Made with ❤️</div>
            </div>
          </div>
        </div>
        <div
          className=" card d-flex position-absolute ms-5"
          style={{ width: "35%", zIndex: "2", top: "10%" }}
          id="form-container"
        >
          <form onSubmit={handleSubmit} className="">
            <div className="m-4">
              <h2>Login</h2>
              <div className="form-group my-2">
                <label htmlFor="email" className="my-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={credentials.email}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1" className="my-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="d-flex justify-content-center my-4">
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
