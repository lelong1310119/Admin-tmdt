import { combineReducers } from "redux";
import product from "./productReducer";
import login from "./AuthReducer"
import category from "./categoryReducer"
import user from "./userReducer"
import admin from "./adminReducer"
import order from "./orderReducer"
export default combineReducers({product, login, category, user, admin, order});
