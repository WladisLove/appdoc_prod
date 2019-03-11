import React from 'react'
import PropTypes from 'prop-types'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DoctorsList from '../../components/DoctorsList';



const mapState = { center: [53.90, 27.55], zoom: 12};

const doctors = [
    {
        name: 'Vasya',
        specialty: 'Therapist',
        age: 32,
        id: 1,
    },
    {
        name: 'Ivan',
        specialty: 'Pediatrician',
        age: 25,
        id: 2,
    },
    {
        name: 'Mike',
        specialty: 'Surgeon',
        age: 45,
        id: 3,
    },
    {
        name: 'Kile',
        specialty: 'Pharmacist',
        age: 30,
        id: 4,
    },
];


class GeoLocation extends React.Component {
    state = {
        width: '100%',
        height: '600px'
    };

    render() {
        const { width, height } = this.state;
        return (
            <Hoc>
                <Row>
                    <Col span={18} md={18} xs={14} sm={14}>
                        <YMaps>
                            <Map state={mapState} width={width} height={height}>
                                <Placemark
                                    geometry={{
                                        coordinates: [53.90, 27.55]
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </Col>
                    <Col span={6} md={6} xs={10} sm={10}>
                        <DoctorsList doctors={doctors}/>
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default GeoLocation