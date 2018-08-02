import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import Hoc from '../Hoc'
import Checkbox from '../Checkbox'
import Button from '../Button'


import './style.css'
import '../../icon/style.css'

class Step3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false,
        }
    }

    renderItem = (title, key) => {
        return (<div className='check-row' key={key}>
                    <div className='check-title'>{title}:</div>
                    <div className='check-text'>{this.props.data[key]}</div>
                </div>)
    };
    renderTimeItem = (title, key) => {
        return (<div className='check-row' key={key}>
            <div className='check-title'>{title}:</div>
            <div className='check-text'>{moment(this.props.data[key]).format('DD.MM.YYYY')}</div>
        </div>)
    };
    renderYesNoItem = (title, value) => {
        return (<div className='check-row'>
            <div className='check-title'>{title}:</div>
            <div className='check-text'>{value ? 'Да' : 'Нет'}</div>
        </div>)
    };

    renderEducInfo = (data) => {
        let i = 0,
            elArr = [];
        while (true){
            if(data['educationsgroup1-education-'+i]){
                let numPreffics = i > 0 ? ' '+(i+1) : '';
                elArr.push(<Hoc key={'educInfo'+i}>
                    {this.renderItem(`Учебное заведение${numPreffics}`,'educationsgroup1-education-'+i)}
                    {this.renderItem(`Специальность${numPreffics}`,'educationsgroup1-speciality-'+i)}
                    {this.renderItem('Год окончания','educationsgroup1-finishucationyear-'+i)}
                </Hoc>)
            }
            else {
                return elArr;
            }
            i++
        }
    };

    renderGraduateEducInfo = (data) => {
        let i = 0,
            elArr = [];
        while (true){
            if(data['educationsgroup2-education-'+i]
                || data['educationsgroup2-ciklname-'+i]
                || data['educationsgroup2-ucationyears-'+i]){

                let numPreffics = i > 0 ? ' '+(i+1) : '',
                    institution = data['educationsgroup2-education-'+i],
                    educCycle = data['educationsgroup2-ciklname-'+i],
                    educPeriod = data['educationsgroup2-ucationyears-'+i];
                elArr.push(<Hoc key={'graduateEducInfo'+i}>
                    {institution &&
                    <div className='check-row'>
                        <div className='check-title'>
                            Учебное заведение{numPreffics}:</div>
                        <div className='check-text'>{institution}</div>
                    </div>}
                    {educCycle &&
                    <div className='check-row'>
                        <div className='check-title'>
                            Цикл обучения{numPreffics}:</div>
                        <div className='check-text'>{educCycle}</div>
                    </div>}
                    {educPeriod &&
                    <div className='check-row'>
                        <div className='check-title'>Год окончания:</div>
                        <div className='check-text'>
                            {
                                moment(educPeriod[0]).format('DD.MM.YYYY')
                            } - {
                                moment(educPeriod[1]).format('DD.MM.YYYY')
                            }
                        </div>
                    </div>}
                </Hoc>)
            }
            else {
                return elArr;
            }
            i++
        }
    };

    renderAdditionalInfo = (data) => {
        let langs = data['langs'],
            isChildConsult = data['isChildConsult'],
            consultPayment = data['consultPayment'],
            isFreeConsult = data['isFreeConsult'];
        return (<Hoc>
            {langs &&
            <div className='check-row'>
                <div className='check-title'>Знание языков:</div>
                <div className='check-text'>{langs.map(el => {
                    return (<span key={el}>{el} </span>)
                })}</div>
            </div>}
            {isChildConsult &&
                this.renderYesNoItem('Консультация детей', isChildConsult)}
            {consultPayment &&
            <div className='check-row'>
                <div className='check-title'>Желаемая оплата консльтации:</div>
                <div className='check-text'>
                    {consultPayment}
                </div>
            </div>}
            {isFreeConsult &&
                this.renderYesNoItem('Бесплатные консультации', isFreeConsult)}
        </Hoc>)
    };

    fillNewField = (res, name) => {
        const data = this.props.data;
        const info = name.split('-');
        let array = [];
        if (res[info[0]])
            array = [...res[info[0]]];

        array[+info[2]] = (info[1] === 'ucationyears' && data[name])
            ? {
                ...array[+info[2]],
                [info[1]]: [
                    data[name][0] instanceof moment ? (data[name][0]).unix() : data[name][0],
                    data[name][1] instanceof moment ? (data[name][1]).unix() : data[name][1],
                ],
            }
            : {
                ...array[+info[2]],
                [info[1]]: info[1].indexOf('photo')+1 
                                ? data[name] 
                                    ? data[name].fileList
                                    : []
                                : data[name],
            };
        return {
            ...res,
            [info[0]]: array,
        }
    };

    onFinishHandler = () => {
        const data = this.props.data;
        let result = {};
        for (let key in data){
            result = (key.indexOf('educationsgroup')+1)
                ? this.fillNewField(result,key)
                : (key.indexOf('doc')+1 || key.indexOf('photos')+1 || key.indexOf('contract')+1) 
                    ? data[key] 
                        ? {
                            ...result,
                            [key]: data[key].fileList,
                        }
                        : {
                            ...result,
                            [key]: [],
                        } 
                    : (key === 'workdate' || key === 'datebirth')
                        ? {
                            ...result,
                            [key]: (data[key] instanceof moment) ? (data[key]).unix() : data[key],
                        }
                        : {
                            ...result,
                            [key]: data[key],
                        };
        }

        /*for (let key in data){
            (key.indexOf('doc')+1 || key.indexOf('photo')+1 || key.indexOf('contract')+1) 
                ? data[key] = data[key] 
                                ? data[key].fileList 
                                : [] 
                : null;
        }*/
        this.props.onFinish(result)
    };

    render(){
        const {data} = this.props;

        return (
            <div className="step-form">
                <div className="step-posttitle">Проверьте введенные данные</div>


                {this.renderItem('ФИО','fio')}
                {this.renderItem('E-mail','email')}
                {this.renderItem('Телефон','phone')}
                <div className='check-row'>
                    <div className='check-title'>Пол:</div>
                    <div className='check-text'>
                        {data.sex === 'm' ? "Мужской" : "Женский"}
                    </div>
                </div>
                {this.renderTimeItem('Дата рождения','datebirth')}

                {this.renderEducInfo(data)}

                {this.renderGraduateEducInfo(data)}

                {this.renderItem('Место работы','worknow')}
                {this.renderItem('Должность','post')}
                {this.renderTimeItem('Дата начала работы','workdate')}
                {this.renderItem('Категория','catigory')}

                {this.renderAdditionalInfo(data)}

                <Checkbox checked={this.state.checked}
                          onChange={(e) => this.setState({checked: e.target.checked})}>
                    {this.props.finalText}
                </Checkbox>

                <div className="steps-action">
                    <Button onClick={this.props.onPrev}
                            btnText='Назад'
                            size='large'
                            type='float'
                    />
                    <Button btnText='Завершить'
                            disable={!this.state.checked}
                            onClick={this.onFinishHandler}
                            size='large'
                            type='gradient'
                    />
                </div>
            </div>
        )
    }
}

Step3.propTypes = {
    data: PropTypes.object,
    onFinish: PropTypes.func,
};

Step3.defaultProps = {
    data: {},
    onFinish: () => {}
};

export default Step3
