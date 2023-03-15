import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";


const SignUp = () => {
  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:""})
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
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
    <div className='container'>
        <form onSubmit={handleSubmit}>
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
           
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              className="form-control"
              id="password"
              placeholder="Password"
              minLength={5}

            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              className="form-control"
              id="cpassword"
              placeholder="Confirm Password"
              minLength={5}

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
  )
}

export default SignUp
