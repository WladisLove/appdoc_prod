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

    return (
        <div className='panel-popover'>  
            <div className='panel-popover-date'>{ date.toLocaleString("ru", options)}</div>
            <div className='panel-popover-title'>Введите свой актуальный {title}</div>
            <div className='panel-popover-input'>
                <Input placeholder={'Введите ' + title} value={props.inputValue} onChange={evt => props.onChange(evt)}/>
            </div>
            <div className='panel-popover-btn'>
                <Button
                    onClick={(title, value) => props.onSave(props.title, props.inputValue)}
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