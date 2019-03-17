import React from 'react'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import Map from '../../components/Map';
import DoctorsList from '../../components/DoctorsList';
import DoctorsListItemInfo from '../../components/DoctorsListItemInfo';
import {connect} from "react-redux";
import * as actions from "../../store/actions";


class GeoLocation extends React.Component {

    state = {
        activeMarker: null,
        loading: true,
    };


    newCoordinates = (coordinates) => {
        this.setState({activeMarker: null} , () => this.props.getCoordinates(coordinates));
    };

    chooseMark = (id) => {
        this.setState({activeMarker: id}, ()=> { this.getSchedule() });
    };

    closeAppointment=() => {
        this.setState({ activeMarker: null})
    };

    openAppointment = (id) => {
        this.setState({ activeMarker: id}, ()=> { this.getSchedule() });
    };

    onMakeNewApp = (obj) => {
        obj.id_doc = this.state.activeMarker;
        return this.props.onMakeNewAppointment(obj);
    };

    getSchedule() {
        const schedule = this.props.onGetDocSchedule(this.state.activeMarker);
        Promise.resolve(schedule).then(()=> {this.setState({loading:false})})
    };


    render() {
        const { activeMarker } = this.state;

        let content;
        if(activeMarker !== null) {
            content = <DoctorsListItemInfo
                close={this.closeAppointment}
                onMakeNewAppointment = {this.onMakeNewApp}
                docIntervalsWithAppsAll={this.props.docIntervalsWithAppsAll} />
        } else {
            content = <DoctorsList open={this.openAppointment} doctors={this.props.doctors}/>
        }

        return (
            <Hoc>
                <Row>
                    <Col span={16} md={16} xs={14} sm={14}>
                        <Map chooseMark={this.chooseMark} newCoordinates={this.newCoordinates} doctors={this.props.doctors} />
                    </Col>
                    <Col span={8} md={8} xs={10} sm={10}>
                        {content}
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        docIntervalsWithAppsAll: state.profileDoctor.docIntervalsWithAppsAll,
        doctors: state.geolocation.doctors,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMakeNewAppointment: (obj) => dispatch(actions.setReceptionByPatient(obj)),
        onGetDocSchedule: (doc_id) => dispatch(actions.getDateWorkIntervalWithoutMakingAppAll(doc_id)),
        getCoordinates: (coordinates) => dispatch(actions.getDoctorsCoordinates(coordinates)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocation);