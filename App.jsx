import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import DashBoard from "./DashBoard";
import PrivateRoute from "./PrivateRoute";
import Viewdetails from "./Viewdetails";
import "./App.css";
import Home from "./Home";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[userdetails,setuserdetails]=useState({})
    const[lotdetails,setlotdetails]=useState({})
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/details" element={<Viewdetails  lot={lotdetails}/>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute setuserdetails={setuserdetails}>
              <DashBoard
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                userdetails={userdetails}
                setlotdetails={setlotdetails}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
