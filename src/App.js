import "./App.css";
import "antd/dist/antd.min.css";
import Login from "./commponets/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./commponets/Signup";
import Home from "./commponets/Home";
function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;
