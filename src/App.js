import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verification from "./components/Verification";
import CanvasPaint from "./components/CanvasPaint";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,color='bg-green-100 border-green-400 text-green-700') => {
    setAlert({
      msg: message,
      color:color
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
     <NoteState>
      <Router>
       <Navbar/>
       <Alert alert={alert}/>
        <Routes>
          <Route exact path='/canvaspaint' element={<CanvasPaint/>}/>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}  />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}  />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}  />
          <Route exact path="/verification" element={<Verification showAlert={showAlert}/>}/>
        </Routes>
      </Router>
     </NoteState>
    </>
  );
}

export default App;
