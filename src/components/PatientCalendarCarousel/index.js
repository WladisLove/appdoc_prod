import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import NewVisitModalPage from '../NewVisitModalPage'
import Button from '../Button'
import './style.css'
import '../../icon/style.css'

class PatientCalendarCarousel extends React.Component {

    state = {
        modalVisible: false,
        isFull: false,
        rowCount: 4,
        intervals: []
    };
    setModalVisible(modalVisible) {
        this.setState({modalVisible});
    }


    renderAvailableAppointments = (intervals) => {
        let headers =[];
        let timeIntervals = [];
        if(!intervals) { return }
        for (let i = 0; i < intervals.length; i++) {
            let time = [];
            if (intervals[i].intervalOb.length) {
                headers.push(moment(this.props.intervals[i].date*1000).format('ddd D MMMM'));
                for(let j=0; j<intervals[i].intervalOb.length; j++) {
                    for(let t = +intervals[i].intervalOb[j].start; t < +intervals[i].intervalOb[j].end; t+=300) {
                        time.push(moment(+t*1000).format('H:mm'));
                    }
                }
                timeIntervals.push(time);
            }
        }
            console.log(timeIntervals)
        {
            return headers.map((item, indexDay)=>
                <div className='calendar-carousel-col'>
                    <div className='calendar-carousel-day' key={indexDay+1}>{item}</div>
                    { this.state.rowCount ?
                        timeIntervals[indexDay].slice(0, this.state.rowCount).map((item, indexTime)=>
                            <div className='calendar-carousel-time' onClick={() => this.setModalVisible(true)} key={indexTime+1}>{item}</div>
                        )
                        :
                        timeIntervals[indexDay].map((item, indexTime)=>
                            <div className='calendar-carousel-time' onClick={() => this.setModalVisible(true)} key={indexTime+1}>{item}</div>
                        )
                    }
                </div>
            )
        }
    };

    render() {
        const {intervals} = this.props;
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

                    {this.renderAvailableAppointments(intervals)}
                </div>
                <div className="table-footer"
                     key="btn"
                >
                    <Button size='link'
                            type='link'
                            title='Показать ещё'
                            icon={this.state.isFull ? 'circle_arrow_up' : 'circle_arrow_down'}
                            onClick={() => this.setState({
                                rowCount: this.state.rowCount === 4 ? 0 : 4,
                                isFull: !this.state.isFull
                            })}/>
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