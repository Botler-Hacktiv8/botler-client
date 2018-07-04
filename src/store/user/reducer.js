import { GET_PROFILE, RESET_USER_DATA } from './../action-type';

const initialState = {
  userData: [],
}

const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        userData: action.payload,
      }
    case RESET_USER_DATA:
      return {
        ...state,
        userData: []
      }
    default:
      return state;
  }
}

export default reducer;