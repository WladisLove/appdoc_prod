import React from 'react'
import PropTypes from 'prop-types'

import ProfileAvatar from '../ProfileAvatar'
import RatePanel from '../RatePanel'
import Hoc from "../Hoc"
import './styles.css'

class DoctorProfileCard extends React.Component{
    
    shouldComponentUpdate(nextProps){
        return (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.img !== nextProps.img)
                    || (this.props.name !== nextProps.name)
                    || (this.props.isShort !== nextProps.isShort)
    }

    render(){
        const {short, name, specialty, isUser} = this.props; 
        
        const spec = specialty.map(function(elem) {
            return elem.map(function(elem2) {
                return elem2.toUpperCase();
            })     
        }).join(", ");

        const rootClass = short ?
            (isUser ? 
            "patientProfileCard-short" : "doctorProfileCard-short")
            : (isUser ? 
                "patientProfileCard" : "doctorProfileCard");

        return (
            <div className={rootClass}>
                <ProfileAvatar owner="doctor" {...this.props} short={short} size={(short ? 'medium' : 'large')}/>
                <div className={'doctorProfileCard-name'}>{name}</div>
            </div>
        )
    }
}

DoctorProfileCard.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.array,
    short: PropTypes.bool,
    rateValue: PropTypes.number,
    timesRated: PropTypes.number,
    isUser: PropTypes.bool,
};

DoctorProfileCard.defaultProps = {
    name: '',
    specialty: [],
    short: false,
    isUser: false,
};

export default DoctorProfileCard;
