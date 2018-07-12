import React from 'react'
import PropTypes from 'prop-types'

import RatePanel from '../RatePanel'
import Icon from '../Icon'
import './styles.css'

const RateIndicator = (props) => {
    return(
        <div className="rateIndicator">
            <div className="rateIndicator-main">
                <div className="rateIndicator-main-title">
                    Мой рейтинг
                </div>
                <RatePanel starSize={24} {...props}/>
                <div className="rateIndicator-main-reviewsNum">
                    <Icon type="chat" svg size={17}/>
                    {props.reviewsNum} отзывов
                </div>
            </div>
            <div className="rateIndicator-behind"/>
        </div>
    )
};

RateIndicator.propTypes = {
    reviewsNum: PropTypes.number,
};

RateIndicator.defaultProps = {
    reviewsNum: 0,
};

export default RateIndicator;