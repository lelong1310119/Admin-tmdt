import axios from "axios"

export const ADMIN_TYPES = {
    LOADING: 'LOADING_ADMIN',
    CREATE: 'CREATE_ADMIN', 
    DELETE: 'DELETE_ADMIN',
    UPDATE: 'UPDATE_ADMIN',
    GET: 'GET_ADMIN',
    ERR: 'ERR_ADMIN',
}
const baseUrl = "http://192.168.111.43:5000/api/admin/"

export const getAdmin = () => {
    return async(dispatch) => {
        try {
            dispatch({type: ADMIN_TYPES.LOADING, payload: true})
            const res = await axios.get(`${baseUrl}get-admin`)
            console.log(res)
            // api trả về status luôn là 200 kể cả khi bị lỗi
            if (Array.isArray(res.data)) {
                dispatch({
                    type: ADMIN_TYPES.GET,
                    payload: res.data,
                })
            }
        }
        catch (err) {
            dispatch ({
                type: ADMIN_TYPES.ERR,
                payload: []
            })
        }
    }
}

export const deleteAdmin = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: ADMIN_TYPES.LOADING, payload: true})
            const res = await axios.delete(`${baseUrl}delete-admin/${data}`)
            console.log(res);
            dispatch({
                type: ADMIN_TYPES.DELETE,
                payload: data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const createAdmin = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: ADMIN_TYPES.LOADING, payload: true})
            const res = await axios.post(`${baseUrl}sign-up`, data)
            console.log(res);
            dispatch(getAdmin());
            // do api không gửi response không có id
            // dispatch({
            //     type: ADMIN_TYPES.CREATE,
            //     payload: res.data,
            // })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const updateAdmin = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: ADMIN_TYPES.LOADING, payload: true})
            const res = await axios.put(`${baseUrl}update-admin/${data.idAdmin}`, data)
            console.log("admin");
            console.log(res);
            dispatch(getAdmin());
        }
        catch (err) {
            console.log(err);
        }
    }
}



