import React from 'react'
import PropTypes from 'prop-types'

import Calendar from 'react-calendar'
import Icon from '../Icon'

import './style.css'

class SmallCalendar extends React.Component{

    render(){
        const  {date} = this.props;
        return ( <Calendar onChange={this.props.onChange}
                           value={date}
                           nextLabel={<Icon type="arrow_right" size={10} svg/>}
                           prevLabel={<Icon type="arrow_left" size={10} svg/>}
        />);
    }
}

SmallCalendar.propTypes = {
    date: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
};

SmallCalendar.defaultProps = {
    date: new Date(),
    onChange: () => {},
};

export default SmallCalendar