import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Rate from '../Rate'
import Icon from '../Icon'
import PopoverFile from '../PopoverFile'
import Hoc from '../Hoc'

import './style.css'
import '../../icon/style.css'
import Button from "../Button";

class HistoryReceptionsItem extends React.Component{

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
    refactorFiles = (file) => {
       if(file) {
           let files = [];
           file.forEach((item) => {
                item.data.forEach(item => {
                    files.push(item)
                })
           });
           return files
       }
    };
    render(){
        const {
            id_treatment,
            id_user,
            type,
            id_doc,
            user_name,
            doc_name,
            status,
            conclusion,
            price,
            diagnostic,
            file,
            date,
            complaint,
            extr,
            begin,
            finish,
            comment,
            rate,
            size,
            name,
            time,
            startDate,
            endDate,
            comments,
            review,
            content,
            onGoto,
            rating,
            onGotoChat,
            isUser,
        } = this.props;

        const rootClass = cn('receptions',`${status}`);
        const statusClass = cn('patient-status', 'receptions-status',`${status}`);

        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone', 
            'video': "video-camera"
        }
        const goto = isUser?id_doc:id_user;
        return (
            <div className={rootClass} 
                onClick={(e) => {
                    onGotoChat(id_treatment);
                    this.handleClick(e);
                }}>
                <div className="flex-col"><div className="patient-name">
                    <div className='go-to' 
                        onClick={(e) => {                            
                            onGoto(goto);
                            this.handleClick(e);
                        }}>{isUser ? doc_name : user_name}</div></div>
                </div>
                <div className="flex-col">
                    {extr && <div className="patient-status receptions-status-extra"></div>}
                    <div className={statusClass}></div>
                    <div className="patient-date">{moment(date*1000).format('DD.MM.YYYY')}</div>
                    <div className="patient-time">
                        {begin ? moment(+begin*1000).format('HH:mm') : moment(+date*1000).format('HH:mm')}
                        {finish ? `-${moment(finish).format('HH:mm')}`: null}
                    </div>
                    <div className="patient-icon"><Icon svg type={extr?"emergency-call":key_val[type]} size={16}
                    style={extr?{color:"red"}:null}/></div>
                    {/*добавить ещё иконку если экстренный*/}
                </div>
                <div className="flex-col">
                    <div className="patient-diagnostic">{diagnostic ? diagnostic:<span>&mdash;</span>}</div>
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
                        ) : (moment().format("X") > moment(+date*1000).format("X")) ? <span>Ожидайте заключения</span>:<span>&mdash;</span>
                    }  
                    </div>
                </div>
                <div className="flex-col">
                {
                    rate ? (
                        <Hoc>
                            <Rate defaultValue={rate} disabled/>
                            <div className="patient-review">{comment}</div>
                        </Hoc>
                    ) : conclusion ?  <Button btnText='НАПИСАТЬ ОТЗЫВ'
                                              onClick={console.log("click")}
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

HistoryReceptionsItem.propTypes = {
    id: PropTypes.number,
    id_user: PropTypes.string,
    status: PropTypes.oneOf(['new', 'topical', 'completed', 'extra']),
    type: PropTypes.string,
    diagnostic: PropTypes.string,
    name: PropTypes.string,
    comments: PropTypes.string,
    price: PropTypes.string,
    review: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    onGoto: PropTypes.func,
};

HistoryReceptionsItem.defaultProps = {
    id: 0,
    id_user: 0,
    size: 'small',
    status: 'new',
    name: '',
    diagnostic: '-',
    comment: '-',
    price: '-',
    rating: null,
    review: '-',
    date: '-',
    time: '-',
    onGoto: () => {},
};

export default HistoryReceptionsItem
