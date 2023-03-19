import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


const SignUp = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      sessionStorage.setItem("token", json.auth_token);
      navigate("/");
      props.showAlert("Account created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    console.log(json);
  };
  return (
    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group my-2">
    //       <label htmlFor="name">Enter Name</label>
    //       <input
    //         type="text"
    //         name="name"
    //         className="form-control"
    //         id="name"
    //         value={credentials.name}
    //         onChange={onChange}
    //         aria-describedby="name"
    //         placeholder="Enter name"
    //         minLength={2}
    //       />
    //     </div>

    //     <div className="form-group my-2">
    //       <label htmlFor="email">Email address</label>
    //       <input
    //         type="email"
    //         name="email"
    //         className="form-control"
    //         id="email"
    //         value={credentials.email}
    //         onChange={onChange}
    //         aria-describedby="emailHelp"
    //         placeholder="Enter email"
    //       />
    //     </div>
    //     <div className="form-group my-2">
    //       <label htmlFor="exampleInputPassword1">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={credentials.password}
    //         onChange={onChange}
    //         className="form-control"
    //         id="password"
    //         placeholder="Password"
    //         minLength={5}
    //       />
    //     </div>
    //     <div className="form-group my-2">
    //       <label htmlFor="cpassword">Confirm Password</label>
    //       <input
    //         type="password"
    //         name="cpassword"
    //         value={credentials.cpassword}
    //         onChange={onChange}
    //         className="form-control"
    //         id="cpassword"
    //         placeholder="Confirm Password"
    //         minLength={5}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <div>
      <div className="cardWrapper  position-relative" style={{height:"75vh"}}>
        <div
          className="card mt-4  whiteBox d-flex flex-row justify-content-end"
          style={{ width: "100%", height: "45vh", zIndex: "1" }}
        >
          <div className="  rightBox mx-5" style={{ width: "40%" }}>
            <div className="p-3 d-flex flex-column align-items-center">
              <h3 className=" text-nowrap text-dark">Already have an account ?</h3>
              <Link to="/login" className="nav-link my-2 text-primary">
                
                <div className="btn btn-light">Login</div>
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
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <h2>Sign up</h2>
              <div className="form-group my-2">
                <label htmlFor="name">Enter Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={credentials.name}
                  onChange={onChange}
                  aria-describedby="name"
                  placeholder="Enter name"
                  minLength={2}
                />
              </div>
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

export default SignUp;
