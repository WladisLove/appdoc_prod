import React from 'react';
import PropTypes from 'prop-types'

import Icon from '../Icon'
import Modal from '../Modal'
import './styles.css'
import {Map, Placemark, YMaps} from "react-yandex-maps";
import { Translate } from 'react-localize-redux'

class MapsModal extends React.Component{

    render(){
        const { visible, title, warning, width, height} = this.props;
        let { lat, lng} = this.props.location;

        if(!lat && !lng) {
            lat = 53.90;
            lng = 27.55;
        }
        return (
            <Modal visible={visible}
                      title={title}
                      width={width}
                      footer={null}
                      className = {warning ? 'warning' : ''}
                      closable = {!warning}
                      onCancel={this.props.onCancel}
            >
                <Translate>
                    {({ activeLanguage }) => 
                        <YMaps query={(activeLanguage && activeLanguage.code == 'ru') ? {} : { lang: 'en_RU' }}  onApiAvaliable={this.handleApiReady}>
                            <Map state={ {center: [lat, lng], zoom: 12 }} width={'100%'} height={height}>
                                <Placemark
                                    geometry={{
                                        coordinates: [lat, lng]
                                    }}
                                />
                            </Map>
                        </YMaps>}
                </Translate>
                {warning && <Icon type="caution" svg size={24}/>}
                {this.props.children}
            </Modal>
        )
    }
}

MapsModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.number,
    warning: PropTypes.bool,
    onCancel: PropTypes.func,
};

MapsModal.defaultProps = {
    visible: false,
    title: '',
    width: 400,
    warning: false,
    onCancel: () => {},
};

export default MapsModal
