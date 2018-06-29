import { EXAMPLE_ACTION } from './../action-type';

const getBotlerData = (payload) => ({
  type: EXAMPLE_ACTION,
  payload: payload
})

export const getBotlerDataAction = (word) => {
  return dispatch => {
    const botlerData = ['Botler Apps', 'batman'];
    dispatch(getBotlerData(botlerData))
  }
}