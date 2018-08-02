import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import { Popover } from 'antd';
import {panelArr} from './stories/mock-data'
import Icon from '../Icon'
import PatientAnalyzesPopover from '../PatientAnalyzesPopover'

import './style.css'
import '../../icon/style.css'

class PatientAnalyzesItem extends React.Component{

    state = {
        visible: false,
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    handleClose = () => {
        this.props.onClose();
        this.setState({visible: false})
    };

    render(){
        const { analyzesDate, analyzesType, analyzesText, comeDate } = this.props;
        const rootClass = cn('analyzes-item');
        const dateClass = comeDate ? 'analyzes-item-date come' : 'analyzes-item-date';


        return (
            <div className={rootClass}>
                <div className={dateClass}>Сдать не позднее {analyzesDate}</div>
                <div className='analyzes-item-block'>
                    <div className={'analyzes-item-icon ' + analyzesType}></div>
                    <div className='analyzes-item-text'>{analyzesText}</div>
                </div>
                
                <div className='analyzes-item-area'>
                    <Popover 
                        content={
                            <PatientAnalyzesPopover 
                                data={panelArr}
                                onClose={this.handleClose}
                            />
                        }
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                        trigger="click"
                        placement="right"
                    >
                        <div className='analyzes-item-btn'>Ближайшие лаборатории <Icon type='marker' svg size={16} /></div>
                    </Popover> 
                </div>
                
            </div>
        )
    }
}

PatientAnalyzesItem.propTypes = {
    analyzesDate: PropTypes.string,
    analyzesType: PropTypes.oneOf(['biopsy', 'blood', 'cytology', 'endoscopy', 'fluorography', 'heart', 'radiography', 'tomography', 'ultrasound', 'urine']),
    analyzesText: PropTypes.string,
    comeDate: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.object,
};

PatientAnalyzesItem.defaultProps = {
    analyzesDate: '',
    analyzesType: '',
    analyzesText: '',
    comeDate: false,
    onClose: () => {},
    data: {},

};

export default PatientAnalyzesItem