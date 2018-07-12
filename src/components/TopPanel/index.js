import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import Icon from '../Icon'
import TopPanelItem from '../TopPanelItem';
import './style.css'
import '../../icon/style.css'

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
        const {time} = this.state;
        const {receptionsToday, receptionsActual, patients} = this.props;

        return (
            <div className='top-panel'>
                <TopPanelItem   className="first-col"
                            panelTitle={time.format("DD MMMM YYYY")}
                            panelText={time.format("dddd HH:mm")}
                            icon='calendar'/>
                <TopPanelItem 
                            panelTitle="Приемы сегодня"
                            panelText={receptionsToday}
                            icon='mark'/>
                <TopPanelItem 
                            panelTitle="Актуальные обращения"
                            panelText={receptionsActual}
                            icon='clock'/>
                <TopPanelItem 
                            panelTitle="Мои пациенты"
                            panelText={patients}
                            icon='people'/>
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