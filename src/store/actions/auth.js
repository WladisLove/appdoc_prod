import * as actionTypes from './actionTypes'

export const register = (info) => {
    return {
        type: actionTypes.REGISTER_DOCTOR,
        info,
    }
};