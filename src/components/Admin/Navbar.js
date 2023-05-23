import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.jpg"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/AuthAction";

const username = 'admin';
const Navbar = ( )=> {
    const [checkLogout, setCheckLogout] = useState(false)
    const navigate = useNavigate()
    const level = localStorage.getItem("login")
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)

    const handleLogout = () => {
      dispatch(logout())
    }

    // // remove 
    // useEffect(() => {
    //     function handleUnload() {
    //       localStorage.removeItem('login');
    //     }
    
    //     window.addEventListener('unload', handleUnload);
    
    //     return () => {
    //       window.removeEventListener('unload', handleUnload);
    //     };
    //   }, []);

    // // load
    // useEffect(() => {
    //     const handleLoad = () => {
    //       const item = localStorage.getItem("myItem");
    //       if (item) {
    //         setMyItem(item);
    //       }
    //     };
    //     window.addEventListener("login", handleLoad);
    //     return () => {
    //       window.removeEventListener("load", handleLoad);
    //     };
    // }, []);

    return (
        <div className="navbar-container">
            <div className="navbar-admin">
                <div className="header-navbar-admin">
                    <img className="avatar-navbar" src={Avatar} alt="Avatar"/>
                    <h1>Admin</h1>
                    <h3>{login.username}</h3>
                    <h3>Level 3</h3>
                    <div className="icon-navbar">
                        {/* <PersonIcon className="icon-personal" onClick={handleShowProfile}/> */}
                        <LogoutIcon className="icon-logout" onClick={() => setCheckLogout(true)}/>
                    </div>
                </div>
                <ul>
                    <li onClick={() => navigate("/")}>
                        <Link to='/' >Quản lý sản phẩm</Link>
                        <ArrowForwardIosIcon />
                    </li>
                    <li onClick={() => navigate("/users")}>
                        <Link to='/users'>Quản lý người dùng</Link>
                        <ArrowForwardIosIcon />
                    </li>
                    {level === "3" && <li onClick={() => navigate("/admins")}>
                        <Link to='/admins'>Quản lý admin</Link>
                        <ArrowForwardIosIcon />
                    </li>}
                    <li onClick={() => navigate("/orders")}>
                        <Link to='/orders'>Quản lý đơn hàng</Link>
                        <ArrowForwardIosIcon />
                    </li>
                    <li onClick={() => navigate("/categorys")}>
                        <Link to='/categorys'>Quản lý danh mục</Link>
                        <ArrowForwardIosIcon />
                    </li>
                </ul>
            </div>
            {checkLogout && (
            <div className="back-form">
                <div className="modal-form"></div>
                <div className="container-logout">
                <p>Bạn muốn đăng xuất ?</p>
                <div className="form-footer">
                    <button
                    className="confirm-logout"
                    onClick={handleLogout}
                    >
                    Đồng ý
                    </button>
                    <button
                    className="exit-logout"
                    onClick={() => setCheckLogout(false)}
                    >
                    Hủy bỏ
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Navbar;