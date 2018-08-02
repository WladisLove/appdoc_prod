import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Icon from '../Icon'
import RatePanel from '../RatePanel'
import ProfileAvatar from '../ProfileAvatar'

import './style.css'
import '../../icon/style.css'
import PatientCalendarCarousel from "../PatientCalendarCarousel";
import PatientPageDoctorItem from "../PatientPageDoctorItem";
import PatientDoctorsHeader from "../PatientDoctorsHeader";
import PatientDoctorsItem from "../PatientDoctorsItem";



class PatientDoctors extends React.Component {

    render() {
        return (
            <div>
                <PatientDoctorsHeader {...this.props}/>

                {this.props.data.map((item, index)=>
                    <PatientDoctorsItem
                        key = {index+1}
                        {...item}
                        doctorFavorite={true}
                        newVisitVisible = {this.props.newVisitVisible} />
                )}
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

export default PatientDoctors