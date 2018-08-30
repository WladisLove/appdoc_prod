import React from 'react';
import PropTypes from 'prop-types'

import './style.css'
import '../../icon/style.css'
import PatientCalendarCarousel from "../PatientCalendarCarousel";
import PatientPageDoctorItem from "../PatientPageDoctorItem";

class PatientDoctorsItem extends React.Component {

    render() {
        return (
            <div className="patient-doctors-item flex-col" style={{display: "flex", marginBottom:"20px"}}>
                <PatientPageDoctorItem
                    {...this.props}/>
                <PatientCalendarCarousel
                    {...this.props}/>
            </div>
        )
    }
}

PatientDoctorsItem.propTypes = {
    doctorRate: PropTypes.number,
    doctorReviews: PropTypes.number,
    doctorFavorite: PropTypes.bool,
    doctorChild: PropTypes.bool,
    doctorName: PropTypes.string,
    doctorSpeciality: PropTypes.string,
    doctorCategory: PropTypes.string,
    doctorExp: PropTypes.string,
    doctorPrice: PropTypes.string,
    doctorLanguages: PropTypes.array,
};

PatientDoctorsItem.defaultProps = {
    doctorRate: 0,
    doctorReviews: 0,
    doctorFavorite: false,
    doctorChild: false,
    doctorName: '',
    doctorSpeciality: '',
    doctorCategory: '',
    doctorExp: '',
    doctorPrice: '',
    doctorLanguages: [],
};

export default PatientDoctorsItem