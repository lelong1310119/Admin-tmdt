import axios from "axios";

export const login = (data) => async (dispatch) => {
    try {
      const res = await axios.post("http://192.168.111.43:5000/api/admin/sign-in", data)
      console.log(res);
      console.log("login");
      if (res.data.msg === "Đăng nhập thành công") {
        dispatch({
          type: "AUTH",
          payload: res.data.data
        });
        localStorage.setItem("login", res.data.data.isSuper);
        alert("Đăng nhập thành công")
      } else {
        alert("Thông tin đăng nhập không hợp lệ")
      }
      
    } catch (err) {
        console.log(err)
        alert("Thông tin đăng nhập không hợp lệ")
    }
  };

  export const logout = () => async (dispatch) => {
    try {
      localStorage.removeItem("login");
      window.location.href = "/";
      dispatch({
        type: "LOGOUT",
        payload: {}
      });
    } catch (err) {
      console.log(err);
    }
  };