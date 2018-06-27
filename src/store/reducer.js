import { EXAMPLE_ACTION } from './action-type';

const initialState = {
  botlerData: []
}

const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        botlerData: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;