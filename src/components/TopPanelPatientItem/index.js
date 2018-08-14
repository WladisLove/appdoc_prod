import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Popover } from 'antd';

import Icon from '../Icon'
import Button from '../Button'
import TopPanelPatientPopover from '../TopPanelPatientPopover'
 
import './style.css'
import '../../icon/style.css'

class TopPanelPatientItem extends React.Component{

    state = {
        visible: false,
        inputValue: ""
    };

    updateInputValue = (evt) => {
        this.setState({inputValue: evt.target.value})
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    handleClose = () => {
        this.props.onClose();
        this.setState({visible: false})
    };

    handleValueSave = (title, value) => {
        let pole;
        switch(title) {
            case "возраст": { pole = "age"; break; }
            case "вес": { pole = "weight"; break; }
            case "рост": { pole = "height"; break; }
            case "давление": { pole = "pressure"; break; }
            case "пульс": { pole = "pulse"; break; }
        }

        this.props.onSave(pole, value);
        this.setState({
            visible: false,
            inputValue: ""
        });
    };

    render(){

        const { num, text, first, notChangeable} = this.props;
        let date = new Date();

        let options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timezone: 'UTC'
        };

        let time = {
          weekday: 'long',
          timezone: 'UTC',
          hour: 'numeric',
          minute: 'numeric',
        };



        const rootClass = cn( 'panel-patient-block')
        let panelTextStyle = {}
        let panelTitleStyle = {}

        return (
                <div className={rootClass}>
                    {first ? 
                        <div className='panel-patient-item_first'>
                            <div className='panel-patient-icon'>
                                 <Icon svg type='calendar' size={30} />
                            </div>
                            <div className='panel-patient-date'>{ date.toLocaleString("ru", options)}</div>
                            <div className='panel-patient-time'>{ date.toLocaleString("ru", time)}</div>
                        </div>
                        : 
                        <div className='panel-patient-item'>
                            <div className='panel-patient-num'>{num}</div>
                            <div className='panel-patient-text'>{text}</div>
                            {!notChangeable && <Popover
                                content={
                                    <TopPanelPatientPopover title={text} 
                                                            onClose={this.handleClose}
                                                            onSave={this.handleValueSave}
                                                            onChange={this.updateInputValue}
                                                            inputValue={this.state.inputValue}
                                />}
                                style = {{zIndex: "9!important"}}
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                                trigger="click"
                                placement="right"
                                >
                                <div className='panel-patient-edit'>
                                    <Button
                                        size='link'
                                        type='link'
                                        icon='setting_edit'
                                        svg
                                    /> 
                                </div>
                            </Popover> }
                        </div>
                    }
                </div>
            
        )
    }
}


TopPanelPatientItem.propTypes ={
    first: PropTypes.bool,
    text: PropTypes.string,
    num: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    title: PropTypes.string,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    data: PropTypes.object,
}

TopPanelPatientItem.defaultProps = {
    text: '',
    num: '',
    title: '',
    onClose: () => {},
    onSave: () => {},
    data: {},
    first: false,
}

export default TopPanelPatientItem