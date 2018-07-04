import { EXAMPLE_ACTION, SAVE_CHAT, RESET_CHAT } from './../action-type';

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
    case RESET_CHAT:
      return {
        ...state,
        chatLogs: [],
      }
    default:
      return state;
  }
}

export default reducer;