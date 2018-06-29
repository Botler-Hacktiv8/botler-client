import { GET_PROFILE } from './../action-type';

const initialState = {
  userData: []
}

const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        userData: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;