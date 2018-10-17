import React from 'react'
import PropTypes from 'prop-types'

import { Radio as AntRadio } from 'antd';
import Icon from '../Icon'
import './styles.css'
import ReactTooltip from "react-tooltip";
const RadioButton = AntRadio.Button;
const RadioGroup = AntRadio.Group;



class Radio extends React.Component{

    onChangeHandler = (e) => {
        this.props.onChange(e.target.value);
    };
    getToolTipByType = (type) => {
        switch (type) {
            case "chat1": return "Пациенту будет доступна только запись на чат";
            case "telephone" : return "Пациенту будет доступна запись на чат и аудиосвязь";
            case "video-camera" : return "Пациенту будет доступна запись на все виды связи";
        }
    }
    renderRadio = (icons) => {
        let radios = [];
        const key_val = {
            'chat1': 'chat',
            'telephone': 'voice',
            "video-camera": 'video',
        }

        icons.forEach((icon,index) => {
            radios.push(
                    <div className="wrapper-tip-radio"
                         data-tip={this.getToolTipByType(icon)}
                         key={index}

                    >
                        <RadioButton value={key_val[icon]} key={'radio'+icon+index} >
                            <Icon svg size={16} type={icon} />
                        </RadioButton>
                    </div>
            )
        });

        return radios;
    };

    render(){

        return (
            <div>
                <RadioGroup onChange={this.onChangeHandler}
                            {...this.props}>
                    {this.renderRadio(this.props.icons)}
                </RadioGroup>
                {this.props.makingSchedule &&
                <ReactTooltip/>}
            </div>

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
