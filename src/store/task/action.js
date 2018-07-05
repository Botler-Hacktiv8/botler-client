import { GET_ALL_TASK, POST_TASK, UPDATE_TASK, DELETE_TASK, SUCCESS_POST, FAILED_POST, RESET_TASK } from './../action-type';
import { assignSchedule, cancelSchedule } from './../../lib/assign-schedule';
// @ lib
import axios from 'axios';

// @ get all task
export const getAllTaskAction = (token) => {
  return (dispatch) => {
    axios.get(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/tasks`, { headers: { 'x-auth': token } })
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
export const postTaskAction = (payload) => {
  return (dispatch, getState) => {
    // @ set default to false
    dispatch(failedPostAction());
    // @ property for assign schedule
    const address = getState().userState.userData.address;
    const token = getState().userState.userData.token;
    const destination = payload.address;
    const timeStart = payload.timeStart;

    axios.post(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/tasks`, payload, { headers: { 'x-auth': token } })
      .then(response => {
        // @ success post
        dispatch(successPostAction());
        // @ assign schedule
        assignSchedule(address, destination, timeStart, getState().userState.userData, response.data.task);
        dispatch(postTask(response.data.task));
        dispatch(getAllTaskAction(token));
      }).catch((e) => {
        console.log('Post task failed!', e);
      })
  }
}

const postTask = (payload) => ({
  type: POST_TASK,
  payload: payload
});

const successPostAction = () => ({
  type: SUCCESS_POST
});

const failedPostAction = () => ({
  type: FAILED_POST
})

// @ update task
export const updateTaskAction = (taskId, payload) => {
  return (dispatch, getState) => {
    const token = getState().userState.userData.token;

    const address = getState().userState.userData.address;
    const destination = payload.address;
    const timeStart = payload.timeStart;

    axios.patch(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/tasks/${taskId}`, payload, { headers: { 'x-auth': token } })
      .then(response => {
        // @ assign new schedule
        assignSchedule(address, destination, timeStart, getState().userState.userData, response.data.task);

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
export const deleteTaskAction = (taskId) => {
  return (dispatch, getState) => {
    const token = getState().userState.userData.token;
    axios.delete(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/tasks/${taskId}`, { headers: { 'x-auth': token } })
      .then(response => {
        cancelSchedule(response.data.task);
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

export const resetTaskData = () => ({
  type: RESET_TASK
})