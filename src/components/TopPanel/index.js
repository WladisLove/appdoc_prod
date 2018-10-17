import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import Icon from '../Icon'
import TopPanelItem from '../TopPanelItem';
import './style.css'
import '../../icon/style.css'
import Button from '../Button';

class TopPanel extends React.Component{
    state = {
        time: moment(),
    };

    componentDidMount(){
        this.tick();
        this.timeout = setTimeout(this.firstTick,(60-moment().second())*1000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearInterval(this.timer);
    }
    
    firstTick = () => {
        this.tick();
        this.timer = setInterval(this.tick, 60000);
    };

    tick = () => {
        this.setState({time: moment()});
    };

    render(){
        console.log("props", this.props);
        const {time} = this.state;
        const {receptionsToday, receptionsActual, patients} = this.props;

        return (
            <div className='top-panel'>
                <div className='top-panel-description'>
                    <h3 className='top-panel-description-h3'>Пока ждешь начала тренировки, можешь посмотреть наше новое видео</h3>
                    <p>Lorem ipsum et ultricies pellentesque nibh auctor malesuada 
                    sit molestie leo et non auctor non diam, duis et sed elementum sit 
                    metus, nulla porta duis. Metus gravida pharetra gravida risus eros 
                    sapien vitae in tempus ut, lorem pharetra sodales in eu: arc.
                    </p>
                    <Button
                        btnText='Перейти к видео'
                        size='large'
                        type='yellow'
                    />
                </div>
                <TopPanelItem 
                            panelTitle="Следующая тренировка"
                            panelText={"24 дек"}
                            type = {"next"}
                            />
                <TopPanelItem 
                            panelTitle="Осталось тренировок"
                            panelText={"3"}/>
                <TopPanelItem 
                            panelTitle="До оплаты"
                            panelText={"24"}/>
            </div>
        )
    }
}

TopPanel.propTypes = {
    receptionsToday: PropTypes.number,
    receptionsActual: PropTypes.number,
    patients: PropTypes.number,
};

TopPanel.defaultProps = {
    receptionsToday: 0,
    receptionsActual: 0,
    patients: 0,
};


export default TopPanel