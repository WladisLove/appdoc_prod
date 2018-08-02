import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import PopoverFile from '../PopoverFile'

import './style.css'
import '../../icon/style.css'

class HistoryReceptionsItems extends React.Component{

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }

    render(){
        //const {type, size, time, date, status, diagnostic, comments, price, conclusion, conclusionDownload, review, content} = this.props;
        const {
            id,
            id_user,
            type,
            size,
            name,
            time,
            startDate,
            endDate,
            status,
            diagnostic,
            comments,
            price,
            conclusion,
            conclusionDownloadName,
            conclusionDownloadLink,
            review,
            content,
            onGoto,
            rating,
            onGotoChat,
        } = this.props;
        const rootClass = cn('reception',`${status}`);
        const statusClass = cn('patient-status', 'reception-status',`${status}`);

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
                    <div className={statusClass}></div>
                    <div className="patient-date">{moment(startDate*1000).format('DD.MM.YYYY')}</div>
                    <div className="patient-time">
                    {moment(startDate*1000).format('HH:mm')} - {moment(endDate*1000).format('HH:mm')}
                    </div>
                    <div className="patient-icon"><Icon svg type={key_val[type]} size={16} /></div>
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
                    <div className="patient-conclusion">{conclusion}</div>
                    <a href={conclusionDownloadLink} download onClick={this.handleClick}>
                        {conclusionDownloadName}
                    </a>
                </div>
                <div className="flex-col">
                    <Rate defaultValue={rating} disabled/>
                    <div className="patient-review">{review}</div>
                </div>
                <div className="flex-col"
                        onClick = {this.handleClick}>
                    <PopoverFile placement="bottomRight" content={content} trigger="click"/>                         
                </div>
            </div>
        )
    }
}

HistoryReceptionsItems.propTypes = {
    id: PropTypes.number,
    status: PropTypes.oneOf(['new', 'topical', 'completed', 'extra']),
    type: PropTypes.string.isRequired,
    diagnostic: PropTypes.string,
    comments: PropTypes.string,
    price: PropTypes.string,
    conclusion: PropTypes.string,
    conclusionDownload: PropTypes.string,
    review: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string
};

HistoryReceptionsItems.defaultProps = {
    id: 0,
    size: 'small',
    status: 'new',
    diagnostic: '-',
    comment: '-',
    price: '-',
    conclusion: '-',
    conclusionDownload: '',
    review: '-',
    date: '-',
    time: '-',
};

export default HistoryReceptionsItems