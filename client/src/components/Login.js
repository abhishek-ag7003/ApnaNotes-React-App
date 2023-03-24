import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setProgress(15);

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
    props.setProgress(60);
    if (json.success) {
      //redirect
      sessionStorage.setItem("token", json.auth_token);
      navigate("/");
     props.setProgress(100);
      props.showAlert("Successfully Logged in", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    console.log(json);
  };

  return (
    <div className="">
      <div className="cardWrapper d-flex position-relative ">
        <div className="card form-wrapper d-flex flex-column">
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
              <div className="demo my-4">
                <strong>Demo credentials : </strong>
                <div><strong> Email : </strong> demo@gmail.com</div>
                <div><strong> password : </strong>demo121212</div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="card mt-4 px-5 whiteBox d-flex flex-row align-items-center">
          <div className="login-details d-flex flex-column">
            <div className="p-3 d-flex flex-column align-items-center">
              <h4 className=" text-nowrap text-dark">First time here ?</h4>
              <Link to="/signup" className="nav-link text-primary">
                <div className="btn btn-light text-nowrap">Sign up</div>
              </Link>
            </div>
            <hr className="my-2" />
            <div className="p-3 d-flex flex-column align-items-center">
              <div className="text-nowrap">Made with ❤️</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
