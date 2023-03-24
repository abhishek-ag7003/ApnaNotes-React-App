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
import LoadingBar from 'react-top-loading-bar'


function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0)
  
  const setProgressbar= (prog)=>{
    setProgress(prog)
  }


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      showAlert(null);
    }, 2000);
  };

  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home setProgress={setProgressbar} showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/authentication" element={<Authentication setProgress={setProgressbar}/> } />
              <Route exact path="/login" element={<Login showAlert={showAlert} setProgress={setProgressbar}/>} />
              <Route exact path="/signup" element={<SignUp  showAlert={showAlert} setProgress={setProgressbar} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
