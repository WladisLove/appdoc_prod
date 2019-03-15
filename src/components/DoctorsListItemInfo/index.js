import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'antd';

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
                <Icon onClick={this.handleClick} style={{ fontSize: '35px', color: '#1890ff' }} type="close" />
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