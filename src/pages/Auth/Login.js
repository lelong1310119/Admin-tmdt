import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ( )=> {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/");
    }
    return (
        <>
            <input placeholder="Tên đăng nhập"></input>
            <input placeholder="Mật khẩu"></input>
            <button onClick={handleLogin}>Đăng nhập</button>
            <Link to="/register">Đăng ký</Link>
        </>
    )
}

export default Login;