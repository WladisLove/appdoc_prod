import React from 'react'
import PropTypes from 'prop-types'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DoctorsList from '../../components/DoctorsList';
import DoctorPageNewVisit from '../../components/DoctorPageNewVisit';
import DoctorsListItemInfo from '../../components/DoctorsListItemInfo';



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
            draggable: true,
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
            draggable: true,
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
            draggable: true,
        },
        info: {
            name: 'Mike',
            specialty: 'Surgeon',
            age: 45,
        }
    },
];

class GeoLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '600px',
            doctors: doctors,
            activeMarker: null,
        };

        this.getMapRef = element => {
            this.myMap = element;
        };

        this.boundsChange = () => {
            this.setState({activeMarker: null});
            console.log(this.myMap.getBounds());
        }
    }

    componentDidMount() {

    }

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
                                ? <DoctorsListItemInfo id ={activeMarker} close={this.closeAppointment}/>
                                : <DoctorsList open={this.openAppointment} active={activeMarker} doctors={doctors}/>
                        }
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default GeoLocation