import { GET_ALL_TASK, POST_TASK, UPDATE_TASK, DELETE_TASK } from './../action-type';

const initialState = {
  taskData: []
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
    default:
      return state;
  }
}

export default reducer;