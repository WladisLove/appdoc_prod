import React from 'react';
import { storiesOf } from '@storybook/react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import MapsModal from '../';

const mapState = { center: [53.90, 27.55], zoom: 12};

storiesOf('MapsModal', module)
    .add('MapsModal', () => (
        <div>
            <MapsModal 
                title="Местоположение"
                visible={true}>
                <YMaps>
                    <Map state={mapState}>
                        <Placemark
                            geometry={{
                                coordinates: [53.90, 27.55]
                            }}
                        />
                    </Map>
                </YMaps>
            </MapsModal>
        </div>
    ))