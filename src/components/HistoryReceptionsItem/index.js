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

class HistoryReceptionsItem extends React.Component{

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }

    render(){
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
            review,
            content,
            onGoto,
            rating,
            onGotoChat,
        } = this.props;
        const rootClass = cn('receptions',`${status}`);
        const statusClass = cn('patient-status', 'receptions-status',`${status}`);

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
                }}>
                <div className="flex-col"><div className="patient-name">
                    <div className='go-to' 
                        onClick={(e) => {                            
                            onGoto(id_user);
                            this.handleClick(e);
                        }}>{name}</div></div>
                </div>
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
                    <div className="patient-conclusion">
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
                    <PopoverFile data={this.props.data}></PopoverFile>
                </div>
            </div>
        )
    }
}

HistoryReceptionsItem.propTypes = {
    id: PropTypes.number,
    id_user: PropTypes.number,
    status: PropTypes.oneOf(['new', 'topical', 'completed', 'extra']),
    type: PropTypes.string.isRequired,
    diagnostic: PropTypes.string,
    name: PropTypes.string,
    comments: PropTypes.string,
    price: PropTypes.string,
    conclusion: PropTypes.oneOfType([
        PropTypes.shape({
            Name: PropTypes.string,
            link: PropTypes.string,
    })]),
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
    conclusion: null,
    rating: null,
    review: '-',
    date: '-',
    time: '-',
    onGoto: () => {},
};

export default HistoryReceptionsItem
