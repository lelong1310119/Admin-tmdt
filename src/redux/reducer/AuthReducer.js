const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    case "LOGOUT":
      return action.payload
    default:
      return state;
  }
};

export default authReducer;