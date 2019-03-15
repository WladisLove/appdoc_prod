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


class GeoLocation extends React.Component {

    state = {
        width: '100%',
        height: '600px',
        doctors: this.props.doctors,
        activeMarker: null,
        loading: true,
    };

    componentDidMount() {
        //const coordinates = this.myMap.getBounds();
        //const result = this.props.getCoordinates(coordinates);
        //console.log(result);
    }

    getMapRef = element => {
        this.myMap = element;
    };

    boundsChange = () => {
        const coordinates = this.myMap.getBounds();
        this.setState({activeMarker: null} , () => this.props.getCoordinates(coordinates));
    };

    handleClick = (e, id) => {
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
        const { width, height, activeMarker } = this.state;

        return (
            <Hoc>
                <Row>
                    <Col span={16} md={16} xs={14} sm={14}>
                        <YMaps>
                            <Map onBoundsChange={this.boundsChange} instanceRef={this.getMapRef} state={mapState} width={width} height={height}>
                                {this.props.doctors.map((item) =>{
                                    const obj = {
                                        geometry: {
                                            type: 'Point',
                                            coordinates: [item.doctor.lat, item.doctor.lng],
                                        },
                                        properties: {
                                            iconContent: item.doctor.name,
                                        },
                                        options: {
                                            preset: 'islands#blackStretchyIcon',
                                            iconColor: '#1890ff',
                                            draggable: false,
                                        },
                                    };
                                    return (<Placemark onClick={(e) => {this.handleClick(e, item.doctor.basic);}} key={item.doctor.basic} {...obj} />)
                                }
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
                                docIntervalsWithAppsAll={this.props.docIntervalsWithAppsAll} />
                            : <DoctorsList open={this.openAppointment} doctors={this.props.doctors}/>
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