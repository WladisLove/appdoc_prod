import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import Popover from '../Popover'

import './style.css'
import '../../icon/style.css'

class DiseasesTableItem extends React.Component{

    render(){
        const {date, diseases} = this.props;

        return (
            <div className='diseases'>
                <div className="flex-col">
                    <div className="patient-date">{moment((+date)*1000).format('DD.MM.YYYY')}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-diseases">{diseases}</div>
                </div>
            </div>
        )
    }
}

DiseasesTableItem.propTypes = {
    diseases: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DiseasesTableItem.defaultProps = {
    diseases: '',
    date: 0,
};

export default DiseasesTableItem