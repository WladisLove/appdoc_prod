import React from 'react'
import  moment from 'moment'
import {TimePicker  as AntTimePicker} from 'antd'
import PropTypes from "prop-types";
import DefaultTp from "./DefaultTP";


class RangeTp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: this.props.rangeSet.defaultStartValue || null,
            endValue: this.props.rangeSet.defaultEndValue || null,
            disabledHours: [],
            disabledMinutes: [...Array(60).keys()],
            availableMinutes: [],
            isReset: false
        };
    };

    getNotAvailableHours = () => { // получить массив из не доступных часов
        if(this.props.availableArea.length) {
            let availableHours = [];
            let notAvailableHours = [];
            for(let i = 0; i<this.props.availableArea.length; i++) {
                const from = moment(this.props.availableArea[i].from).get("hour");
                const to = moment(this.props.availableArea[i].to).get("hour");
                let partOfAvailableHours = Array(to - from + 1).fill(0).map((e,i)=>from+i);
                availableHours.push(...partOfAvailableHours)
            }
            for (let i=0; i<24; i++) {
                if(availableHours.indexOf(i) === -1) {
                    notAvailableHours.push(i);
                }
            }
            this.setState({disabledHours: notAvailableHours})
        } else {
            this.setState({
                disabledHours: [...Array(24).keys()],
                disabledMinutes: [...Array(60).keys()]
            })
        }
    };


    getNotAvailableMin = (hour) => { // получить массив из доступных часов
        const area = this.props.availableArea;
        let errorMin = []; // ответ
        for(let i = 0; i < area.length; i++) {

            let beforeH = parseInt(area[i].from.format('HH'));
            let beforeM = parseInt(area[i].from.format('mm'));
            if (hour === beforeH) {
                errorMin = [...Array.from(Array(beforeM).keys())];
            }
            let afterH = parseInt(area[i].to.format('HH'));
            let afterM = parseInt(area[i].to.format('mm'));
            if (hour === afterH) {
                let buf = [...Array.from(Array(60).keys())];
                buf = buf.splice(afterM, 60);
                errorMin = [...errorMin, ...buf];
            }

        }
        this.setState({
            disabledMinutes: errorMin,
        });
    };

    onChange = (field, value) => {
        if(value && value._d.getHours()) {
            this.getNotAvailableMin(value._d.getHours());
            if(field === "start") {
                this.setState({startValue: moment(value, "hh:mm")})
            } else if(field==="end") {
                this.setState({endValue: moment(value, "hh:mm")})
            }

        }

        if(value === null) {
            if(field === "start") {
                this.setState({
                    startValue: null,
                    endValue: null
                })
            } else if(field==="end") {
                this.setState({endValue: null})
            }

        }
        this.setState({isReset:false});
        this.props.onChange();
    };

    componentDidMount() {
        this.getNotAvailableHours();
        this.setState({isReset:this.props.isReset})
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.isReset !== this.props.isReset && nextProps.isReset === true){
            this.setState({
                startValue: null,
                endValue: null,
            })
        }

        if((nextProps.rangeSet.defaultStartValue !== this.props.rangeSet.defaultStartValue) ||
            (nextProps.rangeSet.defaultEndValue !== this.props.rangeSet.defaultEndValue)) {
            this.setState ({
                startValue: nextProps.rangeSet.defaultStartValue,
                endValue: nextProps.rangeSet.defaultEndValue
            })
        }
        if(nextProps.availableArea !== this.props.availableArea) {
            this.getNotAvailableHours();
        }

    }

    render() {
        const {format,delimiter, minuteStep} = this.props;
        const {rangeSet} = this.props;
        const {defaultStartValue, defaultEndValue} = rangeSet;
        const {startValue, endValue} = this.state;

        return (
            <div className="timepicker-base-range">
                <AntTimePicker placeholder ={this.props.rangeSet.placeholderStart}
                               value={this.state.startValue ? this.state.startValue : null}
                               format={format}
                               minuteStep={minuteStep}
                               onChange={( val) => this.onChange("start", val)}
                               disabledHours={() => this.state.disabledHours}
                               disabledMinutes={() => this.disabledMinutes}/>

                {delimiter && <span className="timepicker-base-range-delim"> {delimiter} </span>}

                <AntTimePicker placeholder = {this.props.rangeSet.placeholderEnd}
                               value={this.state.endValue ? this.state.endValue: null}
                               format={format}
                               minuteStep={minuteStep}
                               disabledHours={() => this.state.disabledHours}
                               disabledMinutes={() => this.disabledMinutes}
                               onChange={(val) => {
                                   this.onChange("end", val)
                               }}/>
            </div>
        )
    }
}



RangeTp.propTypes = {
    availableArea: PropTypes.array, // доступный промежуток времени
    format: PropTypes.string, //"HH:mm:ss"
    onChange: PropTypes.func,
    minuteStep: PropTypes.number,
    rangeSet: PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    }),
};

RangeTp.defaultProps = {
    value: null,
    availableArea: [],
    format: "HH:mm",
    minuteStep: 5,
    onChange: () => {},
};

export default  RangeTp;