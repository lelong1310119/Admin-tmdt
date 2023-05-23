import { deleteAPI, getAPI, postAPI, updateAPI } from "../../Api/fetchApi"

export const PRODUCT_TYPES = {
    LOADING: 'LOADING_PRODUCT',
    CREATE: 'CREATE_PRODUCT', 
    DELETE: 'DELETE_PRODUCT',
    UPDATE: 'UPDATE_PRODUCT',
    GET: 'GET_PRODUCT',
    ERR: 'ERR_PRODUCT'
}

export const getProduct = () => {
    return async(dispatch) => {
        try {
            dispatch({type: PRODUCT_TYPES.LOADING, payload: true})
            const res = await getAPI('product/list')
            console.log(res);
            if (Array.isArray(res.data)) {
                dispatch({
                    type: PRODUCT_TYPES.GET,
                    payload: res.data,
                })
            }
            
        }
        catch (err) {
            dispatch ({
                type: PRODUCT_TYPES.ERR,
                payload: []
            })
        }
    }
}

export const deleteProduct = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: PRODUCT_TYPES.LOADING, payload: true})
            const res = await deleteAPI('product/delete', data)
            console.log(res);
            dispatch({
                type: PRODUCT_TYPES.DELETE,
                payload: data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const updateProduct = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: PRODUCT_TYPES.LOADING, payload: true})
            const res = await updateAPI('product/update', data)
            console.log(res);
            dispatch(getProduct());
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const createProduct = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: PRODUCT_TYPES.LOADING, payload: true})
            const res = await postAPI('product/add', data)
            console.log(res);
            dispatch(getProduct());
            // dispatch({
            //     type: PRODUCT_TYPES.CREATE,
            //     payload: res.data,
            // })
        }
        catch (err) {
            console.log(err);
        }
    }
}



