import React from 'react';
import moment from 'moment'

import Icon from '../Icon'

const SecondaryReview = (props) => {

    return (
        <div className="reviewSec">
            <div className="reviewSec-icon">
                <Icon type="enter" svg size={24}/>
            </div>
            <div className="reviewSec-body">
                <div className="reviewSec-body-time">
                    {moment(props.dateCommentDoc).format('HH:mm DD.MM.YYYY')}
                </div>
                <div>
                    {props.text}
                </div>
            </div>
        </div>
    )
};

export default SecondaryReview;