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
            isReset: false
        };
    };

    getNotAvailableHours = (availableArea) => {
        if (availableArea.length) {
            let availableHours = [];
            let notAvailableHours = [];
            for (let i = 0; i < availableArea.length; i++) {
                const from = moment(availableArea[i].from).get("hour");
                const to = moment(+availableArea[i].to - 1).get("hour");
                let partOfAvailableHours = Array(to - from + 1).fill(0).map((e, i) => from + i);
                availableHours.push(...partOfAvailableHours)
            }
            for (let i = 0; i < 24; i++) {
                if (availableHours.indexOf(i) === -1) {
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


    getNotAvailableMin = (hour, availableArea) => {
        const area = availableArea ? availableArea : this.props.availableArea;
        let errorMin = [];
        let beginH, endH, beginM, endM;
        let firstFoundedBegin, firstFoundedEnd;
        let lastFoundedBegin, lastFoundedEnd;
        let outsideInterval = false;

        for (let i = 0; i < area.length; i++) {
            beginH = parseInt(area[i].from.format('HH'));
            if (hour === beginH) {
                beginM = parseInt(area[i].from.format('mm'));
                lastFoundedBegin = beginM;
                if (!firstFoundedBegin) firstFoundedBegin = beginM;

                if (hour === endH) {
                    errorMin.push(...Array.from(Array(beginM).keys())
                        .splice(endM, beginM - endM));
                }
            }

            endH = parseInt(area[i].to.format('HH'));
            if (hour === endH) {
                endM = parseInt(area[i].to.format('mm'));
                lastFoundedEnd = endM;
                if (!firstFoundedEnd) firstFoundedEnd = endM;
            }

            if (beginH < hour && endH > hour) {
                outsideInterval = true;
                break;
            }
        }

        if (!outsideInterval) {
            if (firstFoundedBegin === undefined && firstFoundedEnd === undefined)
                errorMin.push(...Array.from(Array(60).keys()));
            if (firstFoundedBegin && (!firstFoundedEnd || firstFoundedBegin < firstFoundedEnd))
                errorMin.push(...Array.from(Array(firstFoundedBegin).keys()));
            if (lastFoundedEnd && (!firstFoundedBegin || lastFoundedEnd > lastFoundedBegin))
                errorMin.push(...Array.from(Array(60).keys()).splice(lastFoundedEnd, 60 - lastFoundedEnd));
        }

        this.setState({
            disabledMinutes: errorMin
        });
        return errorMin;
    };

    getFirstAvailableMinutes = (notAvailableArr) => {
        let curMin = 0;
        for (curMin; curMin < 60; curMin += this.props.minuteStep)
            if (!notAvailableArr.includes(curMin))
                return curMin;
        return curMin;
    };

    onChange = (value) => {
        let notAvailableMin;
        if (value) {
            notAvailableMin = this.getNotAvailableMin(value._d.getHours());
            if (!this.state.currentValue || this.state.currentValue._d.getHours() !== value._d.getHours())
                value.startOf('hour').add(this.getFirstAvailableMinutes(notAvailableMin), 'm');
            this.setState({currentValue: moment(value, "hh:mm")});
            this.props.onChange(value);
        }

        if (value === null) {
            this.setState({currentValue: null});
        }
    };

    componentDidMount() {
        this.getNotAvailableHours(this.props.availableArea);
        this.getNotAvailableMin(new Date().getHours(), this.props.availableArea);
        this.setState({isReset: this.props.isReset})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isReset !== this.props.isReset) {
            this.setState({
                isReset: nextProps.isReset
            });
            if (nextProps.isReset === true)
                this.onChange(null);
        }

        if (nextProps.availableArea !== this.props.availableArea) {
            this.getNotAvailableHours(nextProps.availableArea);
            this.getNotAvailableMin(new Date().getHours(), nextProps.availableArea);
        }
    }

    render() {
        const {format, placeholder, minuteStep} = this.props;
        return (
            <AntTimePicker
                disabledHours={() => this.state.disabledHours}
                disabledMinutes={() => this.state.disabledMinutes}
                format={format}
                placeholder={placeholder}
                minuteStep={minuteStep}
                value={this.state.currentValue && !this.state.isReset ? this.state.currentValue : null}
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
    minuteStep: PropTypes.number,
    isReset: PropTypes.bool,

    onChange: PropTypes.func
};

DefaultTp.defaultProps = {
    placeholder: " ",
    availableArea: [],
    format: "HH:mm",
    minuteStep: 5,
    isReset: false,

    onChange: () => {
    }
};

export default DefaultTp;