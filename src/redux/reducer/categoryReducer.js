const initialValues = {
    loading: false,
    categoryList: [],
}

const categoryReducer =  (state = initialValues, action) => {
    switch(action.type) {
        case 'GET_CATEGORY': 
            return {
                ...state,
                categoryList: action.payload
            }

        case 'DELETE_CATEGORY': 
            return {
                ...state,
                categoryList: state.categoryList.filter((item) => item.idCategory !== action.payload),
            }

        case 'LOADING_CATEGORY': 
            return {
                ...state,
                loading: action.payload
            }

        case 'CREATE_CATEGORY': 
            return {
                ...state,
                // categoryList: [...state.categoryList, action.payload]
            }
        case 'UPDATE_CATEGORY': 
            return {
                ...state,
            }
        case 'ERR_CATEGORY': 
            return {
                ...state,
                categoryList: action.payload
            }
        default: 
            return state;
    }

}

export default categoryReducer;