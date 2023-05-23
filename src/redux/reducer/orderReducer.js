const initialValues = {
    loading: false,
    orderList: [],
}

const orderReducer =  (state = initialValues, action) => {
    switch(action.type) {
        case 'GET_ORDER': 
            return {
                ...state,
                orderList: action.payload
            }

        case 'LOADING_ORDER': 
            return {
                ...state,
                loading: action.payload
            }

        case 'CONFIRM_ORDER': 
            return {
                ...state,
            }

        case 'CANCEL_ORDER': 
            return {
                ...state,
            }

        case 'ERR_ORDER': 
            return {
                ...state,
                orderList: action.payload
            }
        default: 
            return state;
    }

}

export default orderReducer;