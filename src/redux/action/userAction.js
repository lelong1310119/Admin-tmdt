import axios from "axios"

export const USER_TYPES = {
    LOADING: 'LOADING_USER',
    DELETE: 'DELETE_USER',
    GET: 'GET_USER',
    ERR: 'ERR_USER',
}

export const getUser = () => {
    return async(dispatch) => {
        try {
            dispatch({type: USER_TYPES.LOADING, payload: true})
            const res = await axios.get("http://192.168.111.43:5000/api/user/get-user")
            console.log(res)
            // api trả về status luôn là 200 kể cả khi bị lỗi
            if (Array.isArray(res.data)) {
                console.log(123)
                dispatch({
                    type: USER_TYPES.GET,
                    payload: res.data,
                })
            }
        }
        catch (err) {
            console.log(err);
            dispatch ({
                type: USER_TYPES.ERR,
                payload: []
            })
        }
    }
}

export const deleteUser = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: USER_TYPES.LOADING, payload: true})
            const res = await axios.delete(`http://192.168.111.43:5000/api/user/delete-user/${data}`)
            console.log(res);
            dispatch({
                type: USER_TYPES.DELETE,
                payload: data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}



