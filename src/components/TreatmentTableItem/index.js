import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import PopoverFile from '../PopoverFile'
import Hoc from '../Hoc'

import './style.css'
import '../../icon/style.css'
import {message} from "antd";

class TreatmentTableItem extends React.Component{

    handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

    };
     writeReview = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const obj = {id_doc: this.props.id_doc, id_zap: this.props.id};
            this.props.showReviewModal(obj);
    };

     addConclusion = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const filesend = {name: file.name, thumbUrl: reader.result};
            this.props.addConclusion(this.props.lastMA, filesend)
                .then((res)=>{
                    if(+res.data.code===200) {
                        message.success("Заключение успешно добавлено")
                    } else {
                        message.error("Произошла ошибка попробуйте ещё раз")
                    }
                    this.props.refresh();
                })
        });
        reader.readAsDataURL(file);
    };

    refactorFiles = (file) => {
        if(file.length>1) {
            if(file[0].data){
                let files = [];
                file.forEach((item) => {
                    item.data.forEach(item => {
                        files.push(item)
                    })
                });
                return files
            } else return file
        } else {
            return file
        }
    };
    render(){
        console.log(this.props, "PROPS TT")
        const {type, id_treatment : id, id_user,id_doc, file, user_name,doc_name, date, begin, finish, diagnostic, comment, price, conclusion,
            isUser, patientWasnt, rate, complaint, onGoto, onGotoChat} = this.props;
        const goToId = isUser ? id_doc : id_user;
        const rootClass = cn('treatment');
        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone',
            'video': "video-camera",
        }
        const name = isUser ? doc_name: user_name;
        const conclusionMessage = isUser ? "Ожидайте заключение":
            <div onClick={e=>{e.stopPropagation()}}>
            <input type="file"
                   id="addConclusion"
                   style={{
                       width: "0.1px",
                       height: "0.1px",
                       opacity: 0,
                       overflow: "hidden",
                       position: "absolute",
                       zIndex: -1
                   }}
                   onChange={e => this.addConclusion(e.target.files[0])}
            />
            <label htmlFor="addConclusion" className='btn btn-size-small btn-type-float'>
                <span>Добавить</span>
            </label>
        </div>;;
        return (
            <div className={rootClass}
                    onClick={(e) => {
                        onGotoChat(id)
                        this.handleClick(e);
                    }}
            >
                <div className="flex-col">
                    <div className="patient-name">
                        <div onClick={(e) => {
                            onGoto(goToId);
                            this.handleClick(e);
                        }} className='go-to'>{name}</div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="patient-date">
                        {moment(date*1000).format('DD.MM.YYYY')}</div>
                    <div className="patient-time">
                        {begin ? moment(+begin*1000).format('HH:mm') : moment(+date*1000).format('HH:mm')}
                        {finish ? `-${moment(+finish*1000).format('HH:mm')}`: null}
                    </div>
                    <div className="patient-icon">
                        <Icon svg type={key_val[type]} size={16}/>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="patient-diagnostic">{diagnostic ? diagnostic : <span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-comment">{complaint ? complaint:<span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-price">{price ? price : <span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-conclusion">
                        {
                            conclusion ? (
                                <a href={conclusion.href} download target="_blank" onClick={this.handleClick}>
                                    {conclusion.btnText}
                                </a>
                            ) : (moment().format("X") > moment(+date*1000).format("X")) ? patientWasnt ?
                                <span>Приём пропущен</span> : <span>{conclusionMessage}</span> : <span>&mdash;</span>
                        }
                    </div>
                </div>
                <div className="flex-col">
                    {
                        rate ? (
                            <Hoc>
                                <Rate defaultValue={+rate} disabled/>
                                <div className="patient-review">{comment}</div>
                            </Hoc>
                        ) : conclusion && isUser ?  <Button btnText='НАПИСАТЬ ОТЗЫВ'
                                                  onClick={this.writeReview}
                                                  size='small'
                                                  type='float'
                                                  icon='form'/> : <span>&mdash;</span>
                    }
                </div>
                <div className="flex-col"
                     onClick={this.handleClick}>
                    <PopoverFile data={this.refactorFiles(file)}></PopoverFile>
                </div>
            </div>
        )
    }
}

TreatmentTableItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    diagnostic: PropTypes.string,
    comments: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.oneOfType([
        PropTypes.number
    ]),
    conclusionDownload: PropTypes.string,
    review: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    onGoto: PropTypes.func,
    startDate: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    files: PropTypes.array,
};

TreatmentTableItem.defaultProps = {
    id: 0,
    name: '',
    size: 'small',
    diagnostic: '-',
    comment: '-',
    price: '-',
    conclusion: null,
    rating: null,
    review: '',
    title: '',
    date: '01.01.2018',
    time: '00:00',
    files: [],
    startDate: 0,
    onGoto: () => {},
    onGotoChat: () => {},
};

export default TreatmentTableItem
