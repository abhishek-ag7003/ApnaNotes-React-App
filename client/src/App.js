// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Authentication from "./components/Authentication"
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      showAlert(null);
    }, 1000);
  };

  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/authentication" element={<Authentication /> } />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
