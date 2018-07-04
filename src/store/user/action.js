import { GET_PROFILE, RESET_USER_DATA } from './../action-type';
import axios from 'axios';

// @ get profile
export const getProfileAction = (token) => {
  return (dispatch) => {
    axios.get(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/me`, { headers: { 'x-auth': token } })
      .then(response => {
        const userData = {
          ...response.data.user,
          token: token,
        }
        dispatch(getProfile(userData));
      }).catch(e => {
        console.log(e);
      });
  }
}

const getProfile = (payload) => ({
  type: GET_PROFILE,
  payload: payload
});

export const resetUserData = () => ({
  type: RESET_USER_DATA
})