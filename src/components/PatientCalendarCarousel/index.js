import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import NewVisitModalPage from '../NewVisitModalPage'
import Button from '../Button'
import './style.css'
import '../../icon/style.css'

class PatientCalendarCarousel extends React.Component{

    state = {
        modalVisible: false,
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }
    
    render(){
        const { carouselTimes, carouselDays} = this.props;
        const rootClass = cn('calendar-carousel');

        return (
            <div className={rootClass}>
                    <div className='calendar-carousel-slide'>
                        <Button className='btn-prev'
                            btnText=''
                            size='icon'
                            type='icon'
                            icon='arrow_left'
                            svg
                        />
                        <Button className='btn-next'
                            btnText=''
                            size='icon'
                            type='icon'
                            icon='arrow_right'
                            svg
                        />
                        {
                            carouselDays.map((item, index)=> 
                                <div className='calendar-carousel-col'>
                                    <div className='calendar-carousel-day'>{item.day}</div>
                                    {
                                        carouselTimes.map((item, index)=> 
                                            <div className='calendar-carousel-time' onClick={() => this.setModalVisible(true)} key={index+1}>{item.time}</div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                <NewVisitModalPage 
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                />
            </div>
        )
    }
}

PatientCalendarCarousel.propTypes = {
    doctorRate: PropTypes.number,
    carouselTimes: PropTypes.array,
    carouselDays: PropTypes.array,
};

PatientCalendarCarousel.defaultProps = {
    doctorRate: 0,
    carouselTimes: [],
    carouselDays: [],
};

export default PatientCalendarCarousel