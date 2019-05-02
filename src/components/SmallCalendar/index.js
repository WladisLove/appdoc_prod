import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from 'react-calendar'
import Icon from '../Icon'
import {Translate} from 'react-localize-redux'

import './style.css'

class SmallCalendar extends React.Component {

    render() {
        const {date, isUser, highlightedDates} = this.props;
        return (
            <Translate>
                {({ activeLanguage }) => (
                    <Calendar onChange={this.props.onChange}
                                  value={date}
                                  nextLabel={<Icon type="arrow_right" size={10} svg/>}
                                  prevLabel={<Icon type="arrow_left" size={10} svg/>}
                                  locale={(activeLanguage && activeLanguage.code == 'ru') ? "ru-RU" : "en-US"}
                                  tileClassName={({date, view}) => {
                                      if (highlightedDates && isUser) {
                                          return view === 'month' && (highlightedDates.indexOf(moment(date).format("YYYY MM DD")) + 1) ? 'highlighted-day' : null
                                      }
                                  }}
                    />
                )}
            </Translate>
        );
    }
}

SmallCalendar.propTypes = {
    date: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
};

SmallCalendar.defaultProps = {
    date: new Date(),
    onChange: () => {
    },
};

export default SmallCalendar
