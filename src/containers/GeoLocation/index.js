import React from 'react'
import PropTypes from 'prop-types'

import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";

import './styles.css'

import { YMaps, Map, Placemark } from 'react-yandex-maps';


const mapState = { center: [53.90, 27.55], zoom: 12};

class GeoLocation extends React.Component {
    state = {
        width: '100%',
        height: '600px'
    }
    render() {
        const { width, height } = this.state
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
                        List
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default GeoLocation