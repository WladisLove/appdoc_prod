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
        inputValue: "",
        inputValue2: ""
    };

    checkInputValidity = (value) => {
        return value.match(/^-?\d*\.?\d*$/)
            && value < 1000
            && (value.indexOf('.') === -1 || value.indexOf('.') >= value.length - 2);
    };

    updateInputValue = (evt, fieldNumber) => {
        let value = evt.target.value;
        let currentField = "inputValue" + (fieldNumber ? fieldNumber : "");

        value = value.replace(/,/g, '.');
        value === '.' || value === '0' ? value = "" : null;
        console.log(value.indexOf('.'));
        this.setState({[currentField]: this.checkInputValidity(value) ? value : this.state[currentField]});
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
            case "вес": { pole = "weight"; break; }
            case "рост": { pole = "height"; break; }
            case "давление": { pole = "pressure"; break; }
            case "пульс": { pole = "pulse"; break; }
        }

        value.indexOf('.') === value.length - 1 ? value = value.slice(0, value.indexOf('.')) : null;

        if (!this.props.doubleValueInput || (this.state.inputValue && this.state.inputValue2))
            this.props.onSave(pole, value);
        else this.props.onSave(pole, "");

        this.setState({
            visible: false,
            inputValue: "",
            inputValue2: ""
        });
    };

    render(){

        const { num, text, first, notChangeable, doubleValueInput} = this.props;
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
                            <div className='panel-patient-date'>{ date.toLocaleString("en", options)}</div>
                            <div className='panel-patient-time'>{ date.toLocaleString("en", time)}</div>
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
                                                            doubleValueInput={doubleValueInput}
                                                            inputValue2={this.state.inputValue2}
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
    doubleValueInput: PropTypes.bool
}

TopPanelPatientItem.defaultProps = {
    text: '',
    num: '',
    title: '',
    onClose: () => {},
    onSave: () => {},
    data: {},
    first: false,
    doubleValueInput: false
}

export default TopPanelPatientItem
