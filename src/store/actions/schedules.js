import * as actionTypes from './actionTypes'

export const selectEvent = (event) => {
    return {
        type: actionTypes.SELECT_EVENT,
        event: event
    }
};

export const openCancelModal = () =>{
    return {
        type: actionTypes.OPEN_CANCEL_MODAL
    }
};

export const closeCancelModal = (toSave = false, obj) => {
  return {
      type: actionTypes.CLOSE_CANCEL_MODAL,
      toSave,
      object: obj
  }
};
