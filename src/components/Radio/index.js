import React from 'react'
import PropTypes from 'prop-types'

import { Radio as AntRadio } from 'antd';
import Icon from '../Icon'
import './styles.css'
const RadioButton = AntRadio.Button;
const RadioGroup = AntRadio.Group;



class Radio extends React.Component{

    onChangeHandler = (e) => {
        this.props.onChange(e.target.value);
    };

    renderRadio = (icons) => {
        let radios = [];
        const key_val = {
            'chat1': 'chat',
            'telephone': 'voice', 
            "video-camera": 'video',
        }

        icons.forEach((icon,index) => {
            radios.push(<RadioButton value={key_val[icon]} key={'radio'+icon+index}>
                <Icon svg size={16} type={icon}/>
            </RadioButton>)
        });

        return radios;
    };

    render(){

        return (
            <RadioGroup onChange={this.onChangeHandler} 
                        {...this.props}>
                {this.renderRadio(this.props.icons)}
            </RadioGroup>
        )

    }
}

Radio.propTypes ={
    icons: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

Radio.defaultProps = {
    icons: [],
    onChange: () => {},
};

export default Radio;
