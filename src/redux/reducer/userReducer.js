const initialValues = {
    loading: false,
    userList: [],
}

const userReducer =  (state = initialValues, action) => {
    switch(action.type) {
        case 'GET_USER': 
            return {
                ...state,
                userList: action.payload
            }

        case 'DELETE_USER': 
            return {
                ...state,
                userList: state.userList.filter((item) => item.idUser !== action.payload),
            }

        case 'LOADING_USER': 
            return {
                ...state,
                loading: action.payload
            }

        case 'ERR_USER': 
            return {
                ...state,
                userList: action.payload
            }
        default: 
            return state;
    }

}

export default userReducer;