import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/AuthAction";
import { useNavigate } from "react-router-dom";

const initialValues = {
    username: '',
    password: '',
}


const LoginAdmin = ( )=> {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LoginAdminSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Tên tài khoản phải tối thiểu 3 ký tự")
            .max(50, "Tên tài khoản chỉ tối đa 50 ký tự")
            .required("Trường này không được bỏ trống")
            .matches(
            /^[a-zA-Z0-9_]+$/i,
    
            "Vui lòng không nhập ký tự đặc biệt và khoảng trắng"
            ),
        password: Yup.string()
            .min(8, "Mật khẩu tối thiểu 8 ký tự")
            .max(50, "Mật khẩu tối đa 50 ký tự")
            .required("Trường này không được bỏ trống")
            .matches(
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{7,16}$/,
                "Mật khẩu phải có kí tự đầu viết hoa, phải có ít nhất một ký tự viết thường, một chữ số và một ký tự đặc biệt"
            ),          
    })

    const formik = useFormik ({
        initialValues,
        enableReinitialize: true,
        validationSchema: LoginAdminSchema,
        onSubmit: (values) => {
            dispatch(login(values))
            console.log(values)
            const token = localStorage.getItem("login");
            console.log(1)
            console.log(token);
            if(token) navigate("/");
            navigate('/')
        },
    })

    // useEffect(() => {
    //     if (token) navigate("/");
    // }, [navigate, token]);

    return (
        <div className="login-back">
            <div className="login-admin-container">
                <h1>Admin</h1>
                <form className="form-login-admin" onSubmit={formik.handleSubmit} >
                    <div className="login-container">
                        <div className="input-container">
                            <PersonIcon 
                                className="icon-input"
                            />
                            <input 
                                className="form-control"
                                placeholder="Tên tài khoản"
                                type="text"
                                {...formik.getFieldProps("username")}
                            />
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                            <div
                                className="error-input"
                                style={{ paddingLeft: "40px" }}
                                >
                                <div>{formik.errors.username}</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="login-container">
                        <div className="input-container">
                            <VpnKeyIcon 
                                className="icon-input"
                            />
                            <input 
                                className="form-control"
                                placeholder="Mật khẩu"
                                {...formik.getFieldProps("password")}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((show) => !show)}
                                onMouseDown={(event) => event.preventDefault()}
                                edge="end"
                                className="btn-showpassword"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div
                                className="error-input"
                                style={{ paddingLeft: "40px" }}
                                >
                                <div>{formik.errors.password}</div>
                            </div>
                        ) : null}
                    </div>
                    <Button 
                        variant="contained"
                        type="submit"
                        className="btn-login"
                    >
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;