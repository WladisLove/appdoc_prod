import React from 'react';
import PropTypes from 'prop-types'
import { Form, Upload, Icon, message } from 'antd';
import Dropzone from "react-dropzone";
import Button from '../Button'
import InputWithTT from "../InputWithTT";
import InputDateWithToolTip from "../InputDateWithTT";
import SelectWithTT from "../SelectWithTT";
import { Auth } from "react-vk";
import  VK from "react-vk";


import UploadPhotoImage from "../../img/uploadPhoto.png"

const FormItem = Form.Item;


class Step1Form extends React.Component{
    state = {
        fileList: [],
        avatarUrl: "",
        avatarThumb: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // if (!err) {
            //
            //     let fields = {
            //         ...values,
            //         avatarThumb: this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb
            //     };
            //     if(!values.avatar.url && !values.avatar.name) {
            //         fields.avatar = {name: this.state.avatarName, url: this.state.avatarUrl};
            //     }
                this.props.onSubmit(values);
                this.props.onNext();
            // }
        })
    };

    handleChange = (info) => {
        const reader = new FileReader();
        this.setState({ loading: true });
        this.props.uploadFile(info.file)
            .then((res) => {
                this.setState({avatarUrl: res.data.file[0].url, avatarName: res.data.file[0].name});
                message.success("Фото загружено")
            });
        reader.addEventListener('load', () => this.setState({
            avatarThumb: reader.result,
            loading: false
        }));
        reader.readAsDataURL(info.file);
    };
    onDrop = (file) => {
        console.log(file)
        const reader = new FileReader();
        // this.props.uploadFile(info.file)
        //     .then((res) => {
        //         this.setState({avatarUrl: res.data.file[0].url, avatarName: res.data.file[0].name});
        //         message.success("Фото загружено")
        //     });
        reader.addEventListener('load', () => this.setState({
            avatarThumb: reader.result,
            loading: false
        }));
        reader.readAsDataURL(file[0]);
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        const avatarUrl = this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb ? this.props.data.avatarThumb : "";
        return (
            <Form onSubmit={this.handleSubmit} className="step-form step-1">
                <div className="step-title">Личные данные</div>
                <div className="step-note">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
                    eligendi harum hic itaque iusto neque porro recusandae. Accusamus corporis culpa est facere, in
                    pariatur porro reprehenderit similique sit tempora? Nisi!
                </div>
                <div className="step-form-row">
                    <FormItem>
                        {getFieldDecorator('fio1', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <InputWithTT
                                bubbleplaceholder="* ФИО"
                                className="step-form-item"
                                tooltip="ФИО Tooltip"

                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fio2', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <InputDateWithToolTip
                                bubbleplaceholder="Дата рождения"
                                className="step-form-item"
                                tooltip="ДР Tooltip"


                            />
                        )}
                    </FormItem>
                </div>
                <div className="step-form-row">
                    <FormItem>
                        {getFieldDecorator('fio2', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <SelectWithTT
                                bubbleplaceholder="Дата рождения"
                                className="step-form-item"
                                tooltip="ДР Tooltip"


                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fio2', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <SelectWithTT
                                bubbleplaceholder="Дата рождения"
                                className="step-form-item"
                                tooltip="ДР Tooltip"


                            />
                        )}
                    </FormItem>
                </div>
                <FormItem>
                    {getFieldDecorator('fio2', {
                        rules: [{
                            required: true,
                            message: 'Введите ФИО, пожалуйста'
                        }],
                    })(
                        <SelectWithTT
                            bubbleplaceholder="Дата рождения"
                            className="step-form-item"
                            tooltip="ДР Tooltip"


                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('fio2', {
                        rules: [{
                            required: true,
                            message: 'Введите ФИО, пожалуйста'
                        }],
                    })(
                        <SelectWithTT
                            bubbleplaceholder="Дата рождения"
                            className="step-form-item"
                            tooltip="ДР Tooltip"
                            mode="multiple"


                        />
                    )}
                </FormItem>
                <div className="step-form-row">
                    <div className="create-profile-avatar">
                        <span className="upload-avatar-title">Загрузи сюда свою крутую аву</span>
                        <Dropzone multiple = {false} onDrop = {this.onDrop} className="react-dropzone-avatar">
                            {avatarUrl ?
                                <img src={avatarUrl} alt="avatar" className="avatar-image"/> :
                                <img src={UploadPhotoImage} alt="avatar" className="avatar-image"/>}
                        </Dropzone>
                        <span className="upload-avatar-photo-click">Нажми, чтобы загрузить фото</span>
                    </div>
                    <VK apiId={6695055}>
                        <Auth onAuth={(prof)=>{console.log(prof, "VK AUTH")}}/>
                    </VK>
                    {/*<div className="create-profile-social">
                        <div id="vk_auth"></div>

                    </div>
                    <script type="text/javascript" src="https://vk.com/js/api/openapi.js?159"></script>
                    <script type="text/javascript">
                        {VK.init({apiId: 6695055})}
                    </script>
                    <script type="text/javascript">
                        {VK.Widgets.Auth("vk_auth", {"onAuth" : "function(data) {alert('user '+data['uid']+' authorized');}"})}
                    </script>*/}
                </div>

                <div className="steps-action">
                    <Button htmlType="submit"
                            btnText='Далее'
                            size='large'
                            type='gradient'/>

                </div>
            </Form>
        )
    }
}

const Step1 = Form.create({
    mapPropsToFields(props) {
        let fields ={};
        for (let key in props.data){
            if (key !== 'current'){
                fields[key] = Form.createFormField({
                    value: props.data[key],
                })
            }
        }
        return fields;
    },
})(Step1Form);


Step1.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onSubmit: PropTypes.func,
    checkEmailAvailability: PropTypes.func
};

Step1.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
    checkEmailAvailability: () => {}
};

export default Step1
