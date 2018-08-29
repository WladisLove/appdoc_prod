import React from 'react'
import PropTypes from 'prop-types'
import {DatePicker as AntDatePicker} from "antd"
import './style.css'
import moment from "moment";


class DatePickerNew extends AntDatePicker{

    constructor(props){
        super(props);
        this.state ={
            isFocused: false,
            date: 0
        }
    }

    onFocus = (bool) => {
        this.setState({isFocused: bool})
    };
    onChange = (val) => {
        this.setState({date: val ? moment(val).format("X"):null, isFocused: false});
        this.props.onChange ? this.props.onChange(val) : null;
    }
    render() {

        const datePickerClassName = "effect";
        const rootCl = "new-dp dp-effect" +" "+ this.props.className + " " +  'dp-root ';
        const labelClass = (this.state.isFocused || this.state.date) || this.props.value ? "title" : "placeholder";
        return (
            <div className={rootCl}
                 style={{width:this.props.width ? this.props.width : null, ...this.props.style}}
            >
                <AntDatePicker {...this.props}
                               className={datePickerClassName}
                               onChange={this.onChange}
                               placeholder=""
                               style ={{width: "100%"}}
                               onFocus = {()=>this.onFocus(true)}
                               onBlur = {()=>this.onFocus(false)}

                />
                <label className={labelClass}>{this.props.bubbleplaceholder}</label>


            </div>
        )
    }
}

DatePickerNew.propTypes = {
    className: PropTypes.string,
    bubbleplaceholder: PropTypes.string,
};

DatePickerNew.defaultProps = {
    className: '',
    bubbleplaceholder: ""

};

export default DatePickerNew