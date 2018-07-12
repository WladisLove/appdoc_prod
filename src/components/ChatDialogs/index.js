import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import ScrollArea from 'react-scrollbar'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import ChatDialog from '../ChatDialog'

import './style.css'
import '../../icon/style.css'

class ChatDialogs extends React.Component{
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

    dialogRender = (dataArr) => {
        let dialogArr = [];

        dataArr.map((item, index) => {
            dialogArr.push(<ChatDialog {...item} 
                onGotoChat={this.props.onGotoChat}
                onGoto={this.props.onGoto}
                key={item.id + ''+index}/>)
        });

        return dialogArr;
    };

    render(){
        const { name, consultation, size, time, online, img, status, data} = this.props;
        const rootClass = cn('dialog');


        return (
            <div className={rootClass}>
                <div className='dialog-title'>Ожидают приема<span className='dialog-num_item'>{data.length}</span></div>
                <ScrollArea
                    speed={1}
                    className="dialog-list"
                    contentClassName="content"
                    horizontal={false}
                >
                    {this.dialogRender(this.props.data)}
                </ScrollArea>
            </div>
        )
    }
}

ChatDialogs.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

ChatDialogs.defaultProps = {
    data: [],
};

export default ChatDialogs