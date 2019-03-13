import React from 'react'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DoctorsList from '../../components/DoctorsList';
import DoctorsListItemInfo from '../../components/DoctorsListItemInfo';
import {connect} from "react-redux";
import * as actions from "../../store/actions";



const mapState = { center: [53.90, 27.55], zoom: 12};

const doctors = [
    {
        geometry: {
            type: 'Point',
            coordinates: [53.90, 27.55],
        },
        properties: {
            iconContent: 'Roma',
            hintContent: 'vvvvv',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'Roma',
            specialty: 'Therapist',
            age: 32,
            id: 3525,
        }
    },
    {
        geometry: {
            type: 'Point',
            coordinates: [53.89, 27.56],
        },
        properties: {
            iconContent: 'teston',
            hintContent: 'iiiii',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'teston',
            specialty: 'Pediatrician',
            age: 25,
            id: 3514,
        }
    },
    {
        geometry: {
            type: 'Point',
            coordinates: [53.90, 27.53],
        },
        properties: {
            iconContent: 'RANDOM',
            hintContent: 'mmmmm',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'RANDOM',
            specialty: 'Surgeon',
            age: 20,
            id: 3520,
        }
    },
];

class GeoLocation extends React.Component {

    state = {
        width: '100%',
        height: '600px',
        doctors: doctors,
        activeMarker: null,
        loading: true,
    };

    getMapRef = element => {
        this.myMap = element;
    };

    boundsChange = () => {
        this.setState({activeMarker: null});
        console.log(this.myMap.getBounds());
    };

    handleClick = (e, id) => {
        if(this.props.isUser) {
            this.setState({activeMarker: id}, ()=> { this.getSchedule() });
        } else {
            console.log('hello doctor');
        }
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
        const { width, height, doctors, activeMarker } = this.state;
        let list;
        if(this.props.isUser) {
            list = ((activeMarker !== null)
                ? <DoctorsListItemInfo
                    close={this.closeAppointment}
                    onMakeNewAppointment = {this.onMakeNewApp}
                    docIntervalsWithAppsAll={this.props.docIntervalsWithAppsAll}
                />
                : <DoctorsList isUser={this.props.isUser} open={this.openAppointment} doctors={doctors}/>)
        } else {
            list = (
                <DoctorsList isUser={this.props.isUser} open={this.openAppointment} doctors={doctors}/>
            )
        }


        return (
            <Hoc>
                <Row>
                    <Col span={16} md={16} xs={14} sm={14}>
                        <YMaps>
                            <Map onBoundsChange={this.boundsChange} instanceRef={this.getMapRef} state={mapState} width={width} height={height}>
                                {doctors.map((placemarkParams) =>
                                    <Placemark onClick={(e) => {this.handleClick(e, placemarkParams.info.id);}} key={placemarkParams.info.id} {...placemarkParams} />
                                )}
                            </Map>
                        </YMaps>
                    </Col>
                    <Col span={8} md={8} xs={10} sm={10}>
                        {list}
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        docIntervalsWithAppsAll: state.profileDoctor.docIntervalsWithAppsAll,
        isUser: state.auth.mode === "user",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMakeNewAppointment: (obj) => dispatch(actions.setReceptionByPatient(obj)),
        onGetDocSchedule: (doc_id) => dispatch(actions.getDateWorkIntervalWithoutMakingAppAll(doc_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocation);