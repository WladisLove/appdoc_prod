import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Input from '../Input'

import './style.css'
import '../../icon/style.css'

const TopPanelPatientPopover = (props) => {

    const { title } = props;
    let date = new Date();

    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC'
    };

    let saveFunc = () => {
        return props.onSave(props.title, props.inputValue
            + (props.doubleValueInput && props.inputValue2 ? "/" + props.inputValue2 : ""));
    };

    return (
        <div className='panel-popover'>  
            <div className='panel-popover-date'>{ date.toLocaleString("ru", options)}</div>
            <div className='panel-popover-title'>{ !props.doubleValueInput ? "Введите свой актуальный " + title : "Введите свое актуальное " + title }</div>
            <div className='panel-popover-input'>
                <Input type="text"
                       placeholder={!props.doubleValueInput ? 'Введите ' + title : ""}
                       value={props.inputValue}
                       onChange={evt => props.onChange(evt)}
                       onPressEnter={saveFunc}
                       autoFocus
                />
                {props.doubleValueInput && <span className='panel-popover-input-delimiter'>/</span>}
                {props.doubleValueInput && <Input type="text"
                                                  placeholder={""}
                                                  value={props.inputValue2}
                                                  onChange={evt => props.onChange(evt, 2)}
                                                  onPressEnter={saveFunc}
                />}
            </div>
            <div className='panel-popover-btn'>
                <Button
                    onClick={saveFunc}
                    btnText='ОК'
                    size='default'
                    type='float'
                />
            </div>
            <div className='panel-popover-close'>
                <Button
                    onClick={props.onClose}
                    size='small'
                    type='no-brd'
                    icon='close'
                    iconSize={13}
                />
            </div>
        </div>
    )
}


TopPanelPatientPopover.propTypes ={
    title: PropTypes.string,

}

TopPanelPatientPopover.defaultProps = {
    title: '',

}

export default TopPanelPatientPopover