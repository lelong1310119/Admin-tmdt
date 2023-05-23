const initialValues = {
    loading: false,
    adminList: [],
}

const adminReducer =  (state = initialValues, action) => {
    switch(action.type) {
        case 'GET_ADMIN': 
            return {
                ...state,
                adminList: action.payload
            }

        case 'DELETE_ADMIN': 
            return {
                ...state,
                adminList: state.adminList.filter((item) => item.idAdmin !== action.payload),
            }

        case 'LOADING_ADMIN': 
            return {
                ...state,
                loading: action.payload
            }

        case 'CREATE_ADMIN': 
            return {
                ...state,
                // adminList: [...state.adminList, action.payload]
            }
        case 'UPDATE_ADMIN': 
            return {
                ...state,
            }
        case 'ERR_ADMIN': 
            return {
                ...state,
                adminList: action.payload
            }
        default: 
            return state;
    }

}

export default adminReducer;