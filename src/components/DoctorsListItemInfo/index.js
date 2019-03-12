import React from 'react'
import PropTypes from 'prop-types'

import logo from '../../img/close.png';

import './styles.css'

import DoctorPageNewVisit from '../../components/DoctorPageNewVisit';
import DoctorsListItem from "../DoctorsListItem";

class DoctorsListItemInfo extends React.Component {

    handleClick = () => {
        this.props.close();
    };

    render() {
        const { active } = this.props;

        return(
            <div className="doctor-list-item-info">
                <DoctorPageNewVisit
                    onMakeNewAppointment = {this.props.onMakeNewAppointment}
                    docIntervalsWithAppsAll={this.props.docIntervalsWithAppsAll}
                    />
                <img className="close-icon" onClick={this.handleClick}  src={logo} alt="Logo"/>
            </div>
        )
    }
}

export default DoctorsListItemInfo

DoctorsListItemInfo.propTypes = {
    active: PropTypes.number
};

DoctorsListItem.defaultProps = {
    active: 0
};