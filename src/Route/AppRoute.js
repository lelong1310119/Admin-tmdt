import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageProduct from "../pages/Admin/ManageProduct";
import ManageCategory from "../pages/Admin/ManageCategory";
import ManageAdmin from "../pages/Admin/ManageAdmin";
import ManageUser from "../pages/Admin/ManageUser";
import ManageOrder from "../pages/Admin/ManageOrder";
import PrivateRoute from "./PrivateRoute";
import LoginAdmin from "../pages/Admin/LoginAdmin";


const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                    <PrivateRoute>
                        <ManageProduct />
                    </PrivateRoute>
                    }
                />
                    <Route
                    path="/admins"
                    element={
                    <PrivateRoute>
                        <ManageAdmin />
                    </PrivateRoute>
                    }
                />
                    <Route
                    path="/categorys"
                    element={
                    <PrivateRoute>
                        <ManageCategory />
                    </PrivateRoute>
                    }
                />
                    <Route
                    path="/users"
                    element={
                    <PrivateRoute>
                        <ManageUser />
                    </PrivateRoute>
                    }
                />
                    <Route
                    path="/orders"
                    element={
                    <PrivateRoute>
                        <ManageOrder />
                    </PrivateRoute>
                    }
                />
                <Route path="/login" element={<LoginAdmin />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoute;
 