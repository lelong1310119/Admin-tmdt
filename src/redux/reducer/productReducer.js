const initialValues = {
    loading: false,
    productList: [],
}

const productReducer =  (state = initialValues, action) => {
    switch(action.type) {
        case 'GET_PRODUCT': 
            return {
                ...state,
                productList: action.payload
            }

        case 'DELETE_PRODUCT': 
            return {
                ...state,
                productList: state.productList.filter((item) => item.idProduct !== action.payload),
            }

        case 'LOADING_PRODUCT': 
            return {
                ...state,
                loading: action.payload
            }

        case 'CREATE_PRODUCT': 
            return {
                ...state,
                // productList: [...state.productList, action.payload]
            }
        case 'ERR_PRODUCT': 
            return {
                ...state,
                productList: action.payload
            }
        default: 
            return state;
    }

}

export default productReducer;