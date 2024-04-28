// In login_page.js
import React from "react";
import "./login_page.css";
import { useNavigate } from "react-router-dom";

function Login_page({ onAdminChange }) {
    const navigate = useNavigate();
    const handleUser = (role) => {
        onAdminChange(role);
        navigate('/home');
    };
    return (
        <div className="main0">
            <h1>Select User Role</h1>
            <button onClick={() => handleUser(false)}>User</button>
            <button onClick={() => handleUser(true)}>Admin</button>
        </div>
    );
}

export default Login_page;
