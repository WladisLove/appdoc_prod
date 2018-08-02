import React from 'react'

import {TimePicker as AntTimePicker} from 'antd'
import moment from "moment/moment";
import TimePicker from "./index";
import PropTypes from "prop-types";



class DefaultTp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: this.props.value || null,
            disabledHours: [],
            disabledMinutes: [...Array(60).keys()],
            availableMinutes: [],
            isReset:false
        };
    };


    //Array(n).fill(0).map((e,i)=>m+i)

    getNotAvailableHours = (availableArea) => { // получить массив из не доступных часов
        if(availableArea.length) {
            let availableHours = [];
            let notAvailableHours = [];
            for(let i = 0; i<availableArea.length; i++) {
                const from = moment(availableArea[i].from).get("hour");
                const to = moment(availableArea[i].to).get("hour");
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

    onChange = (value) => {
        if(value && value._d.getHours()) {
                this.getNotAvailableMin(value._d.getHours());
                this.setState({currentValue: moment(value, "hh:mm")})
        }
        if(value && value._d.getHours() && value._d.getMinutes() ) {
            this.props.onChange(value);
        }

        if(value === null) {
            this.setState({currentValue: null})
        }
        this.setState({isReset:false})
    };

    componentDidMount() {
        this.getNotAvailableHours(this.props.availableArea);
        this.setState({isReset:this.props.isReset})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isReset !== this.props.isReset && nextProps.isReset === true){
            this.setState({
                isReset: true
            })
        }

        if(nextProps.availableArea !== this.props.availableArea) {
            this.getNotAvailableHours(nextProps.availableArea);
        }
    }

    render() {

        const {format, placeholder, minuteStep} = this.props;
        return (
            <AntTimePicker
                disabledHours={()=>this.state.disabledHours}
                disabledMinutes={()=>this.state.disabledMinutes}
                format={format}
                placeholder={placeholder}
                minuteStep={minuteStep}
                value={this.state.currentValue&&!this.state.isReset ? this.state.currentValue : null}
                onChange={(val) => {
                    this.onChange(val)
                }}

            />
        )
    }
}

DefaultTp.propTypes = {
    placeholder: PropTypes.string, // отображается когда нет вермени
    availableArea: PropTypes.array, // доступный промежуток времени
    format: PropTypes.string, //"HH:mm:ss"
    onChange: PropTypes.func,
    minuteStep: PropTypes.number
};

DefaultTp.defaultProps = {
    placeholder: " ",
    value: null,
    availableArea: [],
    format: "HH:mm",
    minuteStep: 5,
    onChange: () => {},
};

export default  DefaultTp;