import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import Switch from '../Switch'
import Icon from '../Icon'

const SwitchPanel = (props) => {

        const {icon, title, disabled, checked, defaultChecked, onChange} = props;

        return (
            <div className={checked ? 'switch-panel switch-panel-checked' : 'switch-panel'}>
                {icon && (<Icon type={icon} />)}
                <span className="switch-panel-title">{title}</span>
                <Switch 
                        checked = {checked}
                        disabled = {disabled}
                        onChange={onChange}/> 
            </div>
        )
}

SwitchPanel.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}

SwitchPanel.defaultProps = {
    icon: '',
    title: '',
    defaultChecked: false,
    checked: false,
    disabled: false,
    onChange: () => {},
}

export default SwitchPanel;