import { EXAMPLE_ACTION, SAVE_CHAT, RESET_CHAT } from './../action-type';

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

export const saveChatData = (payload) => ({
  type: SAVE_CHAT,
  payload: payload
})

export const resetChatData = () => ({
  type: RESET_CHAT
})