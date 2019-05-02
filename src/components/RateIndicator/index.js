import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import RatePanel from '../RatePanel'
import Icon from '../Icon'
import './styles.css'

const RateIndicator = (props) => {
    return(
        <div className="rateIndicator">
            <div className="rateIndicator-main">
                <div className="rateIndicator-main-title">
                    <Translate id="myRating" />
                </div>
                <RatePanel starSize={24} {...props}/>
                <div className="rateIndicator-main-reviewsNum">
                    <Icon type="chat" svg size={17}/>
                    {props.reviewsNum} <Translate id="review.lot2" />
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
