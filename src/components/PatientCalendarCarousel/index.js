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
        intervals: [],
        carouselStep: 0,
    };

    setModalVisible(modalVisible) {
        this.setState({modalVisible});
    }
    dateClickHandler = (e) => {
        console.log(e.target.getAttribute("data-timestamp"), "VALUE");
        this.props.newVisitVisible(true)
    };
    nextCarouselItem = () => {
        if (this.state.carouselStep < this.props.intervals.length - 3) {
            this.setState({
                carouselStep: this.state.carouselStep + 1
            })
        }
    };
    prevCarouselItem = () => {
        if (this.state.carouselStep > 0) {
            this.setState({
                carouselStep: this.state.carouselStep - 1
            })
        }
    };


    renderAvailableAppointments = (intervals) => {
        let headers = [];
        let timeIntervals = [];
        if (!intervals) {
            return
        }
        for (let i = 0; i < intervals.length; i++) {
            let time = [];
            if (intervals[i].intervalOb.length) {
                headers.push(moment(this.props.intervals[i].date * 1000).format('ddd D MMMM'));
                for (let j = 0; j < intervals[i].intervalOb.length; j++) {
                    for (let t = +intervals[i].intervalOb[j].start; t < +intervals[i].intervalOb[j].end; t += 300) {
                        time.push({
                            timeToDisplay: moment(+t * 1000).format('H:mm'),
                            timestamp: +t
                        });
                    }
                }
                timeIntervals.push(time);
            }
        }
        return headers.map((item, indexDay) =>
            <div className='calendar-carousel-col' key={indexDay + 1}>
                <div className='calendar-carousel-day' key={indexDay + 1}>{item}</div>
                {this.state.rowCount ?
                    timeIntervals[indexDay].slice(0, this.state.rowCount).map((item, indexTime) =>
                        <div className='calendar-carousel-time'
                             onClick={(e) => this.dateClickHandler(e)}
                             key={indexTime + 1}
                             data-timestamp={item.timestamp}
                        >
                            {item.timeToDisplay}
                        </div>
                    )
                    :
                    timeIntervals[indexDay].map((item, indexTime) =>
                        <div className='calendar-carousel-time'
                             onClick={()=>this.props.newVisitVisible(true)}
                             key={indexTime + 1}
                             data-timestamp={item.timestamp}
                        >
                            {item.timeToDisplay}
                         </div>
                    )
                }
            </div>
        )
    };

    render() {
        const {intervals} = this.props;
        console.log(this.props);
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
                            onClick={this.prevCarouselItem}
                    />
                    <Button className='btn-next'
                            btnText=''
                            size='icon'
                            type='icon'
                            icon='arrow_right'
                            svg
                            onClick={this.nextCarouselItem}
                    />
                    <div className="carouselPosition"
                         style={{transform: `translateX(-${this.state.carouselStep * 33}%)`}}>
                        {this.renderAvailableAppointments(intervals)}
                    </div>
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
    carouselDays: PropTypes.array,
};

PatientCalendarCarousel.defaultProps = {
    doctorRate: 0,
    carouselDays: [],
};

export default PatientCalendarCarousel