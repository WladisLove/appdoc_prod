import React from 'react'
import PropTypes from 'prop-types'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import DoctorPageNewVisit from '../../components/DoctorPageNewVisit';

class DoctorsListItemInfo extends React.Component {

    handleClick = () => {
        this.props.close();
    };

    render() {
        const { id } = this.props;

        return(
            <div className="flex">
                <DoctorPageNewVisit docIntervalsWithAppsAll={[]}/>
                <p onClick={this.handleClick}>Hello</p>
            </div>
        )
    }
}

export default DoctorsListItemInfo