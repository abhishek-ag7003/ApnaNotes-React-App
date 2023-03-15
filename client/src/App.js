// import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState'
import Login from './components/Login';
import SignUp from './components/SignUp';
// import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        {/* <Alert message={"This is amazing"}/> */}
      <Navbar/>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
      </Routes>
      </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;