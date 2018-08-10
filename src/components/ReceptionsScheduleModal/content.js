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
import WarningModal from "../WarningModal";

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
            isReset: !!props.isReset,
            isOffTime: false,
            timeSetCall:[],
            timeSetReception: [],
            wrongInterval: false
        }
    }

    compareDates = (first, second) => {
        return (first.date() === second.date()
        && first.month() === second.month()
        && first.year() === second.year())
    };

    changeFieldsVal = (props = this.props) => {
        const {dateSet, intervalTime, type, timeSetCall, timeSetReception} = props;
        let {defaultStartValue, defaultEndValue} = dateSet;
        props.form.setFieldsValue({
            ['day']: [defaultStartValue, defaultEndValue],
            ['type']: type,
            ['intervalTime']: intervalTime
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
            timeSetReception: this.props.timeSetReception,
        })
    }
    componentWillReceiveProps(nextProps) {

        const dateSet_pr = this.props.dateSet,
            dateSet_cur = nextProps.dateSet;
        if(!(this.compareDates(dateSet_pr.defaultEndValue,dateSet_cur.defaultEndValue))
            || !(this.compareDates(dateSet_pr.defaultStartValue,dateSet_cur.defaultStartValue))){
            this.setState({shouldDPUpdate:true})
        }

        if (nextProps.visible === true && this.props.visible === false) {

            this.setState({
                timeSetCall: nextProps.timeSetCall,
                timeSetReception: nextProps.timeSetReception,
                wrongInterval: false,
                tpNum: {
                    'call': nextProps.timeSetCall.length || 1,
                    'reception': nextProps.timeSetReception.length || 1,
                }
            });
            this.changeFieldsVal(nextProps);
        }

        if(nextProps.visible === false && this.props.visible === true){

            this.props.form.setFieldsValue({
                ['day']: [null, null],
            });
            this.initializeTP([], 'reception');
            this.initializeTP([], 'call');
            this.setState({
                isReset: true,
                'call': 1,
                'reception': 1,
            });
        }
    }

    componentDidUpdate(prevProps) {
        const dateSet_pr = prevProps.dateSet,
            dateSet_cur = this.props.dateSet;
        if(this.state.shouldDPUpdate)
            this.setState({shouldDPUpdate:false});

        if (prevProps.timeSetReception.length !== this.props.timeSetReception.length
            || prevProps.timeSetCall.length !== this.props.timeSetCall.length
            ||!(this.compareDates(dateSet_pr.defaultEndValue, dateSet_cur.defaultEndValue))
            || !(this.compareDates(dateSet_pr.defaultStartValue, dateSet_cur.defaultStartValue))
        ) {
            this.changeFieldsVal()
        }


        if(this.props.visible === false && prevProps.visible === true){
            this.setState({isReset: false})
        }
    }

    handleCheckboxClick = () => {
        this.setState({
            isReset: !this.state.isReset,
            timeSetCall: [],
            timeSetReception: [],
            tpNum: {
                'reception': 1,
                'call': 1,
            }});
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const {day, intervalTime, type, ...rest} = this.props.form.getFieldsValue();
        let time = [],
            emergencyTime = [];

        for (let key in rest) {
            if (key.indexOf('callTp') + 1) {
                pushTimeToArr(time, rest[key]);
            }
            if (key.indexOf('receptionTp') + 1) {
                pushTimeToArr(emergencyTime, rest[key]);
            }
        }

        function pushTimeToArr(array, time) {
            (time && time[0] && time[1]) ?
                array.push({
                    start: (time[0]).unix(),
                    end: (time[1]).unix(),
                }) : null;
        }

        let wrongIntervalDetected = false;

        if (time.length) {
            for (let i = 0; i < time.length; i++)
                if (!(time[i].end - time[i].start) || (time[i].end - time[i].start) / 60 % intervalTime) {
                    wrongIntervalDetected = true;
                    break;
                }
        }


        if (wrongIntervalDetected) {
            this.setState({wrongInterval: true});
        }
        else {
            let obj = {
                datestart: (day[0]).unix(),
                dateend: (day[1]).unix(),
                isDayOff: this.state.isReset,
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
                 isReset: false})
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
                                    isReset={this.state.isReset}
                                    rangeSet={timeSet[i]}
                                    delimiter='&mdash;'
                                    availableArea={[{
                                        from : 1528318800000,
                                        to   : 1528318800000-1
                                    }]}
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
        const {dateSet, selOptions, intervalTime, type} = this.props;
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
                                    <Radio icons={['chat1','telephone', "video-camera"]}/>
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

                    <Tabs.TabPane tab="Экстренные вызовы"
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
                        <Checkbox checked={this.state.isReset} onClick={this.handleCheckboxClick}>Выходной</Checkbox>
                </FormItem>
                <WarningModal visible={this.state.wrongInterval}
                              onClick={() => this.setState({wrongInterval: false})}
                              message='Выбранная длительность приема не подходит к установленному промежутку времени.'/>
                <Button
                        htmlType="submit"
                        btnText='Сохранить'
                        size='default'
                        type='float'
                />
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
