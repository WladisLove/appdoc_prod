import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import Popover from '../Popover'
import PopoverFile from '../PopoverFile'
import Hoc from '../Hoc'

import './style.css'
import '../../icon/style.css'

class TreatmentTableItem extends React.Component{

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }

    render(){
        const {type, id, id_user, files, name, size, time, date, diagnostic, comments, price, conclusion, rating, title, review, content, onGoto,startDate, endDate, onGotoChat} = this.props;
        const rootClass = cn('treatment');
        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone', 
            'video': "video-camera",
        }

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
                            onGoto(id_user)
                            this.handleClick(e);
                        }} className='go-to'>{name}</div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="patient-date">
                        {moment(startDate*1000).format('DD.MM.YYYY')}</div>
                    <div className="patient-time">
                    {moment(startDate*1000).format('HH:mm')} - {moment(endDate*1000).format('HH:mm')}
                    </div>
                    <div className="patient-icon">
                        <Icon svg type={key_val[type]} size={16}/>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="patient-diagnostic">{diagnostic}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-comment">{comments}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-price">{price}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-conclusion">
                    {/*conclusion*/}
                    {
                        conclusion ? (
                            <a href={conclusion.link} download onClick={this.handleClick}>
                                {conclusion.Name}
                            </a>
                        ) : <span>&mdash;</span>
                    }  
                    </div>
                </div>
                <div className="flex-col">
                {
                    rating ? (
                        <Hoc>
                            <Rate defaultValue={rating} disabled/>
                            <div className="patient-review">{review}</div>
                        </Hoc>
                    ) : <span>&mdash;</span>
                }
                </div>
                <div className="flex-col"
                    onClick={this.handleClick}>
                    <PopoverFile data={files}></PopoverFile>
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
    conclusion: PropTypes.oneOfType([
        PropTypes.shape({
            Name: PropTypes.string,
            link: PropTypes.string,
    })]),
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