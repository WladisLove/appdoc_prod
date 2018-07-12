import React from 'react'
import PropTypes from 'prop-types'
import RangeTP from './RangeTP'
import DefaultTP from './DefaultTP'
import  moment from 'moment'
import './styles.css'

class TimePicker extends React.Component{

    range = (start, end) =>{
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    transformDate = () => {
        let area = this.props.availableArea;
        for(let i = 0; i < area.length; i++){
            area[i].from = moment(+area[i].from );
            area[i].to = moment(+area[i].to);
        }
        //this.startValue = moment(+this.props.value * 1000);
    };

    render(){
        this.props.availableArea && this.transformDate();
        const {range,defaultValue} = this.props;

        return (
            <div className="timepicker-base">
                {
                    range ? (
                        <RangeTP {...this.props}/>
                    ) : (
                        <DefaultTP {...this.props}/>
                    )
                }
            </div>
        )
    }
}

TimePicker.propTypes = {
    //defaultValue: PropTypes.object,
    placeholder: PropTypes.string, //
    availableArea: PropTypes.array, // доступный промежуток времени
    minuteStep:  PropTypes.number, // интервал

    range: PropTypes.bool,
    rangeSet: PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    }),
    isReset: PropTypes.bool,
    delimiter: PropTypes.string,
    onChange: PropTypes.func,
};

TimePicker.defaultProps = {
    //defaultValue: null,
    // availableArea: [
    //     {
    //         from:1395954000000,
    //         to:1395954000000-1,
    //     }
    // ],
    availableArea: [],
    range: false,
    rangeSet: {},
    isReset: false,
    placeholder: " ",
    minuteStep: 5,
    delimiter: ' ',
    onChange: () => {},
};

export default  TimePicker;