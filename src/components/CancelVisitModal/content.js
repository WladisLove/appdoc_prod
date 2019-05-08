import React from 'react';

import { Form, message } from 'antd';
import TextArea from '../TextArea'
import Upload from '../Upload'
import DatePicker from '../DatePicker'
import Button from '../Button'
import { Translate } from 'react-localize-redux'

import {previewFile} from '../../helpers/modifyFiles'

const FormItem = Form.Item;

class ContentForm extends React.Component{
    constructor(props){
        super(props);
        const {rangeSet} = props;

        this.state = {
            dpNum: rangeSet.length || 1,
            rangeSet: rangeSet,
            message: '',
        };
    }

    handleSubmit = (e, translate) => {
        e.preventDefault();

        if(!this.state.message) {
            message.error(translate("notifications.enterReason"))
            return
        }
        let response = {};
        if(!this.props.singleCancel) {
            let tmp = {
                ...this.props.form.getFieldsValue(),
            }

            let rangeArr = [];
            for (let key in tmp){
                key.indexOf('range') === 0 && (tmp[key] && tmp[key][0] && tmp[key][1]) && rangeArr.push({
                    start: tmp[key][0].unix(),
                    end: tmp[key][1].unix(),
                })
            }

            if(!rangeArr.length) {
                message.error(translate("notifications.choosePeriod"))
                return
            }
            response.range = rangeArr;
        } else {
            response.id = this.props.appIdToCancel;
        }
        response.file = this.props.form.getFieldValue('file')
            ? ( this.props.form.getFieldValue('file').fileList.map((item, index)=>{return {name: item.originFileObj.name, thumbUrl: item.originFileObj.thumbUrl}}))
            : [];
        response.comment = this.state.message;
        this.props.onSave(response).then((res)=>{
            console.log(res, "RES SINGLE")
            if(res.data.code===300) {
                message.error(translate("notifications.receptionCanceledAtLeastThreeHours"));
                return;
            }
            message.success(translate("notifications.requestSubmitted"));
            this.props.onCancel();
            if(this.props.showWarning) {
                this.props.showWarning()
            }
        });
    };

    addDp = (e) => {
        e.preventDefault();
        const {dpNum} = this.state;
        if(dpNum< this.props.limit)
            this.setState({dpNum:(dpNum+1)})
    };

    dpChangeHandler = (arr, i) => {
        let newArr = this.state.rangeSet.concat();
        newArr[i] = {
            defaultStartValue: arr[0],
            defaultEndValue: arr[1],
        };

        this.setState({
            rangeSet: newArr,
        })
    };

    renderDp = (fieldDecorator) =>{
        let dpArr = [];
        for(let i =0; i<this.state.dpNum;i++){
            dpArr.push(
                <FormItem key={'range'+i}>
                    {fieldDecorator(`range${i}`)(
                        <DatePicker range
                                    rangeSet={this.state.rangeSet[i]}
                                    onChange={(dateArr) => this.dpChangeHandler(dateArr,i)}
                                    delimiter='&mdash;'/>
                    )}
                </FormItem>)
        }
        return (
            <div className="cancelVisitModal-datepickers">
                {dpArr}
            </div>
        );
    };

    changeFieldsVal = (dpNum = this.state.dpNum) => {
        const {rangeSet} = this.state;
        if (rangeSet.length){
            for(let i = 0; i < dpNum; i++){
                let {defaultStartValue, defaultEndValue} = rangeSet[i];
                this.props.form.setFieldsValue({
                    ['range'+i]: [defaultStartValue, defaultEndValue],
                });
            }
        }
        else {
            this.props.form.setFieldsValue({
                ['range0']: [null, null],
            });
        }
    };

    componentDidMount(){
        this.changeFieldsVal()
    }

    componentWillReceiveProps(nextProps){
        nextProps.visible == false ? (this.setState({message: ''}), this.props.form.resetFields()) : null;

        if (nextProps.rangeSet.length !== this.props.rangeSet.length){
            this.setState({
                dpNum: nextProps.rangeSet.length || 1,
                rangeSet: nextProps.rangeSet || [],
            })
        }
    }

    shouldComponentUpdate(nextProps){
        return nextProps.visible
    }

    componentDidUpdate(prevProps){
        if (this.props.rangeSet.length !== prevProps.rangeSet.length){
            this.changeFieldsVal((this.props.rangeSet.length || 1))
        }
    }

    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={(e) => this.handleSubmit(e,translate)}
                          className="cancelVisitModal">

                        <TextArea label={translate('form.textarea.cancellationReason')}
                                  value={this.state.message}
                                  onChange={message => this.setState({message})}
                                  className="cancelVisitModal-txtarea"/>

                        <FormItem>
                            {getFieldDecorator('file')(
                                <Upload className="cancelVisitModal-upload"
                                        onChange={({file}) => this.modifyFiles(file)}
                                        listType = 'text'
                                        text={translate('attachFile')} />
                            )}
                        </FormItem>
                        {!this.props.singleCancel && this.renderDp(getFieldDecorator)}
                        {!this.props.singleCancel && <Button onClick={(e) => this.addDp(e)}
                                className='cancelVisitModal-dpAdd'
                                btnText={translate('button.title.addInterval')}
                                size='file'
                                type='file'
                                icon='add-button'
                                svg
                        />}
                        <Button htmlType="submit"
                                size='default'
                                btnText={translate('button.title.save')}
                                type='float'/>
                    </Form>)
                }
            </Translate>
        </div>)
    }
}

const Content = Form.create()(ContentForm);

export default Content
