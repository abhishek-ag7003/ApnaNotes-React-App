import React from "react";
import { Link } from "react-router-dom";

const Authentication = () => {
  return (
    <div
      className=" d-flex flex-column align-items-center justify-content-center"
      style={{ width: "100%", height: "90vh" }}
    >
      <div className=" d-flex flex-column align-items-center justify-content-center">
        <h3 className="">Authentication required</h3>
        <div className="margin-bottom">Please login in to access the page</div>
        <div className="demo-text margin-bottom">For Demo : Demo Credentials available at login page</div>
        <div className="margin-bottom">
          <Link className="btn btn-secondary my-2 mx-2 px-3" to="/login">
            Login
          </Link>
          <Link className="btn btn-secondary my-2 mx-2 px-3" to="/signup">
            Sign up
          </Link>
        </div>
        <div className=" d-flex flex-column align-items-center">
          <div>Made with ❤️</div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
