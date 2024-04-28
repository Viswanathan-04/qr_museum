import './App.css';
import React, { useState } from "react";
import Add_desc from './pages/add_desc';
import Get_desc from "./pages/get_desc";
import Update_desc from "./pages/update_desc";
import Show_desc from "./pages/show_desc";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { FaPlus, FaCamera, FaPen, FaHome } from "react-icons/fa";
import Login_page from './pages/login_page';

function App(role) {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminChange = (adminStatus) => {
    setIsAdmin(adminStatus);
  };
    return (
        <Router>
            <div className="App1">
                <nav>
                    <div className="ver-bar"></div>
                    <div className="icons">
                        {isAdmin ? (
                            <>
                                <Link to="/add" className="link1"><FaPlus /></Link>
                                <Link to="/update" className="link1"><FaPen /></Link>
                                <Link to='/' className='link1'><FaHome/></Link>
                            </>
                        ) : (
                            <>
                            <Link to="/get" className="link1"><FaCamera/></Link>
                            <Link to='/' className='link1'><FaHome/></Link>
                            </>
                        )}
                    </div>
                    <div className="ver-bar"></div>
                </nav>
                <div className="main">
                    <Routes>
                        <Route path='/' element={<Login_page onAdminChange={handleAdminChange}/>} index/>
                        <Route path="/home" element={isAdmin ? <Navigate to="/add" /> : <Navigate to="/get" />} />
                        <Route path="/add" element={<Add_desc />} />
                        <Route path="/update" element={<Update_desc />} />
                        <Route path="/get" element={<Get_desc />} />
                        <Route path='/show' element={<Show_desc/>}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
