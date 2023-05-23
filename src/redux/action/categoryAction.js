import { deleteAPI, getAPI, postAPI, updateAPI } from "../../Api/fetchApi"

export const CATEGORY_TYPES = {
    LOADING: 'LOADING_CATEGORY',
    CREATE: 'CREATE_CATEGORY', 
    DELETE: 'DELETE_CATEGORY',
    UPDATE: 'UPDATE_CATEGORY',
    GET: 'GET_CATEGORY',
    ERR: 'ERR_CATEGORY',
}

export const getCategory = () => {
    return async(dispatch) => {
        try {
            dispatch({type: CATEGORY_TYPES.LOADING, payload: true})
            const res = await getAPI('category/list')
            console.log(res)
            // api trả về status luôn là 200 kể cả khi bị lỗi
            if (Array.isArray(res.data)) {
                dispatch({
                    type: CATEGORY_TYPES.GET,
                    payload: res.data,
                })
            }
        }
        catch (err) {
            dispatch ({
                type: CATEGORY_TYPES.ERR,
                payload: []
            })
        }
    }
}

export const deleteCategory = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: CATEGORY_TYPES.LOADING, payload: true})
            await deleteAPI('category/delete', data)
            dispatch({
                type: CATEGORY_TYPES.DELETE,
                payload: data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const createCategory = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: CATEGORY_TYPES.LOADING, payload: true})
            await postAPI('category/add', data)
            dispatch(getCategory());
            // do api không gửi response không có id
            // dispatch({
            //     type: CATEGORY_TYPES.CREATE,
            //     payload: res.data,
            // })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const updateCategory = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type: CATEGORY_TYPES.LOADING, payload: true})
            await updateAPI('category/update', data)
            dispatch(getCategory());
        }
        catch (err) {
            console.log(err);
        }
    }
}



