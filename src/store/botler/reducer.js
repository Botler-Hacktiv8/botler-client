import { EXAMPLE_ACTION, SAVE_CHAT } from './../action-type';

const initialState = {
  botlerData: [],
  chatLogs: []
}

const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        botlerData: action.payload,
      }
    case SAVE_CHAT:
      return {
        ...state,
        chatLogs: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;