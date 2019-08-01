import * as actionTypes from "./actionTypes";

export const setChatAreaActive = () => ({
  type: actionTypes.SET_CHAT_MESSAGES_ACTIVE_AREA
});

export const toggleChatArea = () => ({
  type: actionTypes.TOGGLE_CHAT_MESSAGES_AREA
});

export const toggleFilesArea = () => ({
  type: actionTypes.TOGGLE_CHAT_FILES_AREA
});

export const resetChatActiveAreas = () => ({
  type: actionTypes.RESET_CHAT_ACTIVE_AREAS
});

export const setFullscreenMode = () => ({
  type: actionTypes.SET_FULLSCREEN_MODE
});

export const exitFullscreenMode = () => ({
  type: actionTypes.EXIT_FULLSCREEN_MODE
});
