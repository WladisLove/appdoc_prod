import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isChatArea: false,
  isFilesArea: false,
  fullscreenMode: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHAT_MESSAGES_ACTIVE_AREA:
      return {
        ...state,
        isChatArea: true
      };
    case actionTypes.TOGGLE_CHAT_MESSAGES_AREA:
      return {
        ...state,
        isChatArea: !state.isChatArea,
        isFilesArea: false
      };
    case actionTypes.TOGGLE_CHAT_FILES_AREA:
      return {
        ...state,
        isFilesArea: !state.isFilesArea,
        isChatArea: false
      };
    case actionTypes.SET_FULLSCREEN_MODE:
      return {
        ...state,
        fullscreenMode: true
      };
    case actionTypes.EXIT_FULLSCREEN_MODE:
      return {
        ...state,
        fullscreenMode: false
      };
    case actionTypes.RESET_CHAT_ACTIVE_AREAS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
