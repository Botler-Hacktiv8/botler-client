import { GET_ALL_TASK, POST_TASK, UPDATE_TASK, DELETE_TASK } from './../action-type';
import axios from 'axios';

// @ get all task
export const getAllTaskAction = (token) => {
  return (dispatch) => {
    axios.get(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/me`, { 'x-auth': token })
      .then(response => {
        dispatch(getAllTask(response.data.tasks));
      }).catch((e) => {
        console.log('Get all task failed!', e);
      });
  }
}

const getAllTask = (payload) => ({
  type: GET_ALL_TASK,
  payload: payload
});

// @ post task
export const postTaskAction = (payload, token) => {
  return (dispatch, getState) => {
    // const postData = getState().taskState.taskData;
    // const newPostData = [...postData];
    axios.post(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com`, payload, { 'x-auth': token })
      .then(response => {
        // newPostData.push(response.data.task);
        dispatch(postTask(response.data.task));
      }).catch((e) => {
        console.log('Post task failed!', e)
      })
  }
}

const postTask = (payload) => ({
  type: POST_TASK,
  payload: payload
});

// @ update task
export const updateTaskAction = (taskId, payload, token) => {
  return (dispatch) => {
    axios.patch(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/${taskId}`, payload, { 'x-auth': token })
      .then(response => {
        dispatch(updateTask(response.data.task));
      }).catch((e) => {
        console.log(`Failed update task!`, e);
      })
  }
}

const updateTask = (payload) => ({
  type: UPDATE_TASK,
  payload: payload
});

// @ delete task
export const deleteTaskAction = (taskId, payload, token) => {
  return (dispatch) => {
    axios.delete(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/${taskId}`, { 'x-auth': token })
      .then(response => {
        dispatch(deleteTask(response.data.task));
      }).catch((e) => {
        console.log(`Failed update task!`, e);
      })
  }
}

const deleteTask = (payload) => ({
  type: DELETE_TASK,
  payload: payload,
})