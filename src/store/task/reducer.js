import { GET_ALL_TASK, POST_TASK, UPDATE_TASK, DELETE_TASK, SUCCESS_POST, FAILED_POST, RESET_TASK } from './../action-type';

const initialState = {
  taskData: [],
  successPost: false,
}

const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_ALL_TASK: {
      return {
        ...state,
        taskData: action.payload,
      }
    }
    case POST_TASK: {
      return {
        ...state,
        taskData: action.payload,
      }
    }
    case UPDATE_TASK: {
      return {
        ...state,
        taskData: action.payload,
      }
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskData: action.payload,
      }
    }
    case SUCCESS_POST:
      return {
        ...state,
        successPost: true,
      }
    case FAILED_POST:
      return {
        ...state,
        successPost: false,
      }
    case RESET_TASK: 
      return {
        ...state,
        taskData: [],
      }
    default:
      return state;
  }
}

export default reducer;