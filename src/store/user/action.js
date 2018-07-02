import { GET_PROFILE } from './../action-type';
import axios from 'axios';

// @ get profile
export const getProfileAction = (token) => {
  return (dispatch) => {
    console.log('getProfileAction token here', token);
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
