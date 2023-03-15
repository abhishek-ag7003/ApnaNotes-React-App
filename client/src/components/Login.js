import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({email:"", password:""})
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email:credentials.email, password:credentials.password})
    })
    const json = await response.json();
    if(json.success){
      //redirect
      localStorage.setItem('token',json.auth_token)
      navigate("/")
    }
    else{
      alert("Invalid credentials")
    }
    console.log(json)
  };

  return (
    <div>
      <div className="card-wrapper">
      <div className="card">
        <div className="container card d-flex" style={{"padding":"50px"}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
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

          <button
            type="submit"
            className="btn btn-primary"
            
          >
            Submit
          </button>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
