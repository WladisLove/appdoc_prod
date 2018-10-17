import React from 'react'
import PropTypes from 'prop-types'
import DatePickerNew from "../DatePickerNew"
import {DatePicker as DatePickerAnt} from "antd"
import './style.css'


class RangeDPNew extends DatePickerAnt{
    constructor(props){
        super(props);
        const {rangeSet} = props;
        const {defaultStartValue,defaultEndValue} = rangeSet || {defaultEndValue:null, defaultStartValue: null};
        this.state ={
            startValue: defaultStartValue,
            endValue: defaultEndValue,
            onFocus: false
        }
    }
    state = {
        startValue: null,
        endValue: null,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });

        if(field==="startValue") {
            this.props.onChange([value, this.state.endValue]);
        } else if (field="endValue") {
            this.props.onChange([this.state.startValue, value]);

        }
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }




    render() {
        const { startValue, endValue } = this.state;
        return (
            <div className="range-date-picker-new">
                <DatePickerNew bubbleplaceholder="Начало"
                               disabledDate={this.disabledStartDate}
                               value={startValue}
                               onChange={this.onStartChange}
                               style={{marginRight: "20px"}}

                />

                <DatePickerNew bubbleplaceholder="Окончание"
                               disabledDate={this.disabledEndDate}
                               value={endValue}
                               placeholder="End"
                               onChange={this.onEndChange}

                />

            </div>
        )
    }
}

RangeDPNew.propTypes = {
    className: PropTypes.string,
};

RangeDPNew.defaultProps = {
    className: '',
};

export default RangeDPNew
