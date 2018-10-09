import React from 'react'
import {Form, TimePicker as ANTDTP} from 'antd'
import DatePicker from '../DatePicker'
import Tabs from '../Tabs'
import TimePicker from '../TimePicker'
import Radio from '../Radio'
import Select from '../Select'
import Checkbox from '../Checkbox'
import Button from '../Button'
import moment from "moment/moment";

const FormItem = Form.Item;

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tpNum: {
                'reception': props.timeSetReception.length || 1,
                'call': props.timeSetCall.length || 1,
            },
            shouldDPUpdate: false,
            isTimeReset: false,
            isOffTime: false,
            timeSetCall:[],
            timeSetReception: [],
            isDayOff: false,
            wrongInterval: false,
            emptyTimePickers: false
        }
    }

    compareDates = (first, second) => {
        return (first.date() === second.date()
        && first.month() === second.month()
        && first.year() === second.year())
    };

    changeFieldsVal = (props = this.props) => {
        const {dateSet, intervalTime, type, timeSetCall, timeSetReception, isDayOff} = props;
        let {defaultStartValue, defaultEndValue} = dateSet;
        props.form.setFieldsValue({
            ['day']: [defaultStartValue, defaultEndValue],
            ['type']: type,
            ['intervalTime']: intervalTime,
            ['isDayOff']: isDayOff
        });

        this.initializeTP(timeSetReception, 'reception', props);
        this.initializeTP(timeSetCall, 'call', props);
    };

    initializeTP = (set, flag) => {
        if (set.length) {
            for (let i = 0; i < this.state.tpNum[flag]; i++) {
                if(set[i]){
                    let {defaultStartValue, defaultEndValue} = set[i];

                    this.props.form.setFieldsValue({
                        [flag + 'Tp' + i]: [defaultStartValue, defaultEndValue],
                    });
                }
            }
        }
        else {
            this.props.form.setFieldsValue({
                [flag + 'Tp0']: [null, null],
            });
        }
    };

    componentDidMount() {
        this.changeFieldsVal();
        this.setState({
            timeSetCall: this.props.timeSetCall,
            timeSetReception: this.props.timeSetReception
        })
    }

    componentWillReceiveProps(nextProps) {
        const dateSet_pr = this.props.dateSet,
            dateSet_cur = nextProps.dateSet;
        if(!(this.compareDates(dateSet_pr.defaultEndValue,dateSet_cur.defaultEndValue))
            || !(this.compareDates(dateSet_pr.defaultStartValue,dateSet_cur.defaultStartValue))){
            this.setState({shouldDPUpdate:true})
        }

        if (this.props.visible === false && nextProps.visible === true) {
            this.setState({
                timeSetCall: nextProps.timeSetCall,
                timeSetReception: nextProps.timeSetReception,
                tpNum: {
                    'call': nextProps.timeSetCall.length || 1,
                    'reception': nextProps.timeSetReception.length || 1,
                },
                isDayOff: nextProps.isDayOff,
                wrongInterval: false,
                emptyTimePickers: false,
                isTimeReset: true
            });
            this.changeFieldsVal(nextProps);
        }

        if (this.props.visible === true && nextProps.visible === false)
            this.setState({shouldDPUpdate: false})
    }

    componentDidUpdate() {
        if(this.state.shouldDPUpdate)
            this.setState({shouldDPUpdate:false});
    }

    handleCheckboxClick = () => {
        let resetedTimeFields;
        if (!this.state.isDayOff) resetedTimeFields = {
            timeSetCall: [],
            timeSetReception: [],
            tpNum: {
                'reception': 1,
                'call': 1,
            }
        };
        this.setState({
            isDayOff: !this.state.isDayOff,
            isTimeReset: true,
            ...resetedTimeFields
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const {day, intervalTime, type, isDayOff, ...rest} = this.props.form.getFieldsValue();
        let time = [],
            emergencyTime = [],
            wrongIntervalDetected = false;

        function pushTimeToArr(array, time) {
            (time && time[0] && time[1]) ?
                array.push({
                    start: (time[0]).unix(),
                    end: (time[1]).unix(),
                }) : null;
        }

        for (let key in rest) {
            if (key.indexOf('callTp') + 1) {
                pushTimeToArr(time, rest[key]);
            }
            if (key.indexOf('receptionTp') + 1) {
                pushTimeToArr(emergencyTime, rest[key]);
            }
        }

        if (time.length) {
            for (let i = 0; i < time.length; i++)
                if (!(time[i].end - time[i].start) || (time[i].end - time[i].start) / 60 % intervalTime) {
                    wrongIntervalDetected = true;
                    break;
                }
        }

        if (!time.length && !emergencyTime.length && !this.state.isDayOff)
            this.setState({emptyTimePickers: true});
        else if (wrongIntervalDetected && !this.state.isDayOff)
            this.setState({wrongInterval: true});
        else {
            let obj = {
                datestart: (day[0]).unix(),
                dateend: (day[1]).unix(),
                isDayOff: isDayOff,
                intervalTime,
                type,
                intervalOb: time,
                intervalEx: emergencyTime,
            };

            this.props.onSave(obj);
        }
    };

    addTp = (tab, e) => {
        e.preventDefault();
        const n = this.state.tpNum[tab];
        let tpNum = this.state.tpNum;
        if (n < this.props[tab + 'Limit']) {
            tpNum[tab] = n + 1;
            this.setState(
                {tpNum,
                    isDayOff: false})
        }
    };

    renderTp = (tab, timeSet, fieldDecorator) => {
        let tpArr = [];
        const tpNum = this.state.tpNum[tab];
        for (let i = 0; i < tpNum; i++) {
            tpArr.push(
                <FormItem key={tab + i} >
                    {fieldDecorator(`${tab}Tp${i}`)(
                        <TimePicker
                                    id = {`${tab}Tp${i}`}
                                    range
                                    isReset={this.state.isTimeReset}
                                    rangeSet={timeSet[i]}
                                    delimiter='&mdash;'
                                    availableArea={[{
                                        from : 1528318800000,
                                        to   : 1528318800000-1
                                    }]}
                                    onChange={() => this.setState({
                                        isDayOff: false,
                                        wrongInterval: false,
                                        emptyTimePickers: false,
                                        isTimeReset: false
                                    })}
                        />
                    )}
                </FormItem>)
        }
        return (
            <div className="receptionsScheduleModal-timepickers">
                {tpArr}
            </div>
        );
    };

    renderTpBlock = (tab, timeSet, fieldDecorator) => {
        return (
            <div>
                <div className="receptionsScheduleModal-tabs-title">
                    Интервал рабочего времени
                </div>
                {this.renderTp(tab, timeSet, fieldDecorator)}
            </div>
        )
    };

    renderOptions = (selOptions) => {
        let options = [];
        selOptions.map((el, index) => {
            options.push(<Select.Option value={+el}
                                        key={index}>
                {+el}</Select.Option>)
        });

        return options;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {dateSet, selOptions, intervalTime, type, isDayOff, emergencyAvailable} = this.props;
        return (
            <Form onSubmit={this.handleSubmit}
                  className="receptionsScheduleModal">

                <FormItem>
                    {getFieldDecorator('day')(
                        <DatePicker range
                                    shouldUpdate={this.state.shouldDPUpdate}
                                    rangeSet={dateSet}
                                    delimiter='&mdash;'/>
                    )}
                </FormItem>

                <Tabs defaultActiveKey="1"
                      className="receptionsScheduleModal-tabs">
                        <Tabs.TabPane tab="Плановые приемы"
                                  key="1">
                            {this.renderTpBlock(
                                'call',
                                this.state.timeSetCall,
                                getFieldDecorator
                            )}
                            <FormItem>
                                {getFieldDecorator('type', {
                                    initialValue: type
                                })(
                                    <Radio
                                        icons={['chat1','telephone', "video-camera"]}
                                        makingSchedule = {true}

                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('intervalTime', {
                                    initialValue: intervalTime
                                })(
                                    <Select  placeholder="Длительность приема">
                                        {this.renderOptions(selOptions)}
                                    </Select>
                                )}
                            </FormItem>
                                <Button onClick={(e) => this.addTp('call', e)}
                                        btnText='Добавить интервал'
                                        iconSize={30}
                                        size='file'
                                        type='file'
                                        icon='add-button'
                                        svg/>
                        </Tabs.TabPane>

                    <Tabs.TabPane disabled={!emergencyAvailable} tab="Экстренные вызовы"
                                  key="2">
                        {this.renderTpBlock(
                            'reception',
                            this.state.timeSetReception,
                            getFieldDecorator
                        )}
                        <Button className='mb-1r'
                                onClick={(e) => this.addTp('reception', e)}
                                btnText='Добавить интервал'
                                iconSize={30}
                                size='file'
                                type='file'
                                icon='add-button'
                                svg
                        />
                    </Tabs.TabPane>
                </Tabs>
                <FormItem>
                    {getFieldDecorator('isDayOff', {
                        initialValue: isDayOff
                    })(
                        <Checkbox checked={this.state.isDayOff} onClick={this.handleCheckboxClick}>Выходной</Checkbox>
                    )}

                </FormItem>
                <div className='receptionsScheduleModal-submit'>
                    <Button size='default'
                            btnText='Сохранить'
                            htmlType="submit"
                            type='float'/>

                    {this.state.wrongInterval && <div className='receptionsScheduleModal-submit-error'>Выбран неподходящий интервал</div>}
                    {this.state.emptyTimePickers && <div className='receptionsScheduleModal-submit-error'>Выберите время</div>}
                </div>
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
