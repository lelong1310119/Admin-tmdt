import axios from "axios"

export const ORDER_TYPES = {
    LOADING: 'LOADING_CATEGORY',
    CANCEL: 'CANCEL_CATEGORY',
    CONFIRM: 'CONFIRM_CATEGORY',
    GET: 'GET_ORDER',
    ERR: 'ERR_ODER',
}

const baseUrl = "http://192.168.111.9:5000/api/order"

export const getOrder = () => {
    return async(dispatch) => {
        try {
            dispatch({type: ORDER_TYPES.LOADING, payload: true})
            const res = await axios.get(baseUrl)
            console.log(res)
            // api trả về status luôn là 200 kể cả khi bị lỗi
            if (Array.isArray(res.data)) {
                dispatch({
                    type: ORDER_TYPES.GET,
                    payload: res.data,
                })
            }
        }
        catch (err) {
            dispatch ({
                type: ORDER_TYPES.ERR,
                payload: []
            })
        }
    }
}

export const confirmOrder = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: ORDER_TYPES.LOADING, payload: true})
            const res = await axios.post(`${baseUrl}/confirmOrder`, data)
            console.log(res);
            dispatch(getOrder());

        }
        catch (err) {
            console.log(err);
        }
    }
}

export const cancelOrder = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: ORDER_TYPES.LOADING, payload: true})
            const res = await axios.post(`${baseUrl}/cancelOrder`, data)
            console.log(res);
            dispatch(getOrder());
        }
        catch (err) {
            console.log(err);
        }
    }
}



