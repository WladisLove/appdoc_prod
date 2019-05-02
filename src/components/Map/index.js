import React from 'react'
import './style.css'

import { YMaps, Map as YandexMap, Placemark } from 'react-yandex-maps';


class Map extends React.Component {

    state = {
        width: '100%',
        height: '100%',
        mapState: { center: [52.232090, 21.007139], zoom: 5}
    };


    getMapRef = (ref) => {
        this.myMap = ref;
    };

    handleClick = (e, id) => {
        this.props.chooseMark(id);
    };

    boundsChange = () => {
        const coordinates = this.myMap.getBounds()
        coordinates && this.props.newCoordinates(coordinates);
    };

    handleApiReady = () => {
        setTimeout(() => {
            this.boundsChange();
        }, 0);
    };

    render() {
        const { width, height, mapState } = this.state;
        const { doctors } = this.props;
        return(
            <YMaps onApiAvaliable={this.handleApiReady}>
                <div className="yandex-map-relative">
                    <YandexMap onBoundsChange={this.boundsChange} instanceRef={this.getMapRef} state={mapState} width={width} height={height}>
                                {doctors.map((item) =>{
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
                    </YandexMap>
                </div>

            </YMaps>
        )
    }
}

export default Map;
