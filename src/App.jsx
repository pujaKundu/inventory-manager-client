import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Configuration from "./components/Configuration/Configuration";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Sidebar />} />
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
