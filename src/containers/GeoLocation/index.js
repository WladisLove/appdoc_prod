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
            iconContent: 'Vasya',
            hintContent: 'vvvvv',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'Vasya',
            specialty: 'Therapist',
            age: 32,
        }
    },
    {
        geometry: {
            type: 'Point',
            coordinates: [53.89, 27.56],
        },
        properties: {
            iconContent: 'Ivan',
            hintContent: 'iiiii',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'Ivan',
            specialty: 'Pediatrician',
            age: 25,
        }
    },
    {
        geometry: {
            type: 'Point',
            coordinates: [53.90, 27.53],
        },
        properties: {
            iconContent: 'Mike',
            hintContent: 'mmmmm',
        },
        options: {
            preset: 'islands#blackStretchyIcon',
            iconColor: '#1890ff',
            draggable: false,
        },
        info: {
            name: 'Mike',
            specialty: 'Surgeon',
            age: 45,
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
        this.setState({activeMarker: id});
        console.log(this.state.activeMarker);
    };

    closeAppointment=() => {
        this.setState({ activeMarker: null})
    };

    openAppointment = (id) => {
        this.setState({ activeMarker: id});
    };

    onMakeNewApp = (obj) => {
        obj.id_doc = 3514;
        return this.props.onMakeNewAppointment(obj);
    };

    componentDidMount() {
        const schedule = this.props.onGetDocSchedule(3514);
        //const schedule = this.props.onGetDocSchedule(this.state.activeMarker);
        Promise.resolve(schedule).then(()=> {this.setState({loading:false})})
    };


    render() {
        const { width, height, doctors, activeMarker } = this.state;

        return (
            <Hoc>
                <Row>
                    <Col span={16} md={16} xs={14} sm={14}>
                        <YMaps>
                            <Map onBoundsChange={this.boundsChange} instanceRef={this.getMapRef} state={mapState} width={width} height={height}>
                                {doctors.map((placemarkParams, i) =>
                                    <Placemark onClick={(e) => {this.handleClick(e, i);}} key={i} {...placemarkParams} />
                                )}
                            </Map>
                        </YMaps>
                    </Col>
                    <Col span={8} md={8} xs={10} sm={10}>
                        {
                            (activeMarker !== null)
                                ? <DoctorsListItemInfo
                                    close={this.closeAppointment}
                                    onMakeNewAppointment = {this.onMakeNewApp}
                                    docIntervalsWithAppsAll={this.props.docIntervalsWithAppsAll}
                                    active={activeMarker} />
                                : <DoctorsList open={this.openAppointment} doctors={doctors}/>
                        }
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        docIntervalsWithAppsAll: state.profileDoctor.docIntervalsWithAppsAll,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMakeNewAppointment: (obj) => dispatch(actions.setReceptionByPatient(obj)),
        onGetDocSchedule: (doc_id) => dispatch(actions.getDateWorkIntervalWithoutMakingAppAll(doc_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocation);