import React from 'react'
import PropTypes from 'prop-types'

import { Radio as AntRadio } from 'antd';
import { Translate } from 'react-localize-redux'
import Icon from '../Icon'
import ReactTooltip from "react-tooltip";
import './styles.css'
const RadioButton = AntRadio.Button;
const RadioGroup = AntRadio.Group;



class Radio extends React.Component{

    onChangeHandler = (e) => {
        this.props.onChange(e.target.value);
    };
    getToolTipByType = (type) => {
        switch (type) {
            case "chat1": return "chat";
            case "telephone" : return "telephone";
            case "video-camera" : return "videoCamera";
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
                    <Translate>
                        {({ translate }) =>
                            (<div className="wrapper-tip-radio"
                                 data-tip={translate(`form.radio.${this.getToolTipByType(icon)}`)}
                                 key={index}

                            >
                                <RadioButton value={key_val[icon]} key={'radio'+icon+index} >
                                    <Icon svg size={16} type={icon} />
                                </RadioButton>
                            </div>)
                        }
                    </Translate>
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
