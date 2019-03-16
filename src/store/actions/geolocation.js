import axios from './axiosSettings'
import * as actionTypes from './actionTypes';

export const getDoctorsCoordinates = (coordinates) => {
    return (dispatch) => {
        const area = {
            lat1: '' + coordinates[0][0],
            lng1: '' + coordinates[0][1],
            lat2: '' + coordinates[1][0],
            lng2: '' + coordinates[1][1]
        };
        axios.post('catalog.doc2/doctorsCoordinates', JSON.stringify(area))
            .then(res => {
                if(res.data.result) {
                    dispatch({
                        type: actionTypes.GET_DOCTORS_LOCATION,
                        doctors: res.data.result,
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_DOCTORS_LOCATION_ERROR,
                        doctors: [],
                    });
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
};
