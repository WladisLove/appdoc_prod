import React from 'react';
import PropTypes from 'prop-types'


import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Steps from '../Step'


import './style.css'
import '../../icon/style.css'
import RegistrationComplete from "../RegistrationComplete";



class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: 0,
        };
        this.steps = [
            {
            title: 'Контактная информация',
            content:
                (state) => <Step1 data={state}
                                  onSubmit={(data) => this.setState({...data})}
                                  onNext={this.next}
                                  checkEmailAvailability={this.props.onCheckEmailAvailability}
                />,
        },
            {
            title: 'Образование, опыт работы',
            content: (state) => <Step2 data={state}
                                       onSubmit={(data) => this.setState({...data})}
                                       onPrev = {this.prev}
                                       onNext={this.next}
                                       category ={this.props.category}
                                       academicDegree={this.props.academicDegree}
                                       academicTitle = {this.props.academicTitle}
                                       langs = {this.props.langs}
                                       payments = {this.props.payments}
                                       specs = {this.props.specs}
            /> ,
        },
            {
            title: 'Проверка данных',
            content: (state) => <Step3
                                       data = {state}

                                       onPrev = {this.prev}
                                       onNext = {this.next}
                                       finalText={this.props.finalText}
                                       onFinish={this.props.onFinish}
            />,
        }];
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    };
    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    };


    render(){

        if(this.props.isRegFinished) {
            return (
                <RegistrationComplete urlLogin={this.props.urlLogin} phone={"+375777777777"} isPatientReg={false}/>
            )
        }
        return (
            <div className="registration-form">
                <div className="registration-title">Регистрация</div>
                <Steps steps={this.steps}
                       curState={this.state}
                       current={this.state.current}
                       onNext = {this.next}
                       onPrev={this.prev}
                />
            </div>
        )
    }
}


RegistrationForm.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onFinish: PropTypes.func,
    onCheckEmailAvailability: PropTypes.func
};

RegistrationForm.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onFinish: () => {},
    onCheckEmailAvailability: () => {}
};

export default RegistrationForm
