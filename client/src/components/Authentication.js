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
        <p>Please login in to access the page</p>
        <div>
          <Link className="btn btn-secondary my-2 mx-2 px-3" to="/login">
            Login
          </Link>
          <Link className="btn btn-secondary my-2 mx-2 px-3" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="p-3 d-flex flex-column align-items-center">
          <div>Made with ❤️</div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
