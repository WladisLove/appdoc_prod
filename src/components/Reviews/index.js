import React from 'react';
import PropTypes from 'prop-types'

import Review from '../Review'
import Card from '../Card'
import Icon from '../Icon'
import ScrollArea from 'react-scrollbar'
import './style.css'

class Reviews extends React.Component{

    reviewRender = (dataArr) => {
        const num = this.props.numToDisplay;
        let revArr = [];

        for (let i = 0, len = dataArr.length; i < num && i < len; i++){
            revArr.push(<Review {...dataArr[i]}
                                onGoto={this.props.onGoto}
                                onGotoChat={this.props.onGotoChat}
                                isSecondAllowed={false}
                                key={dataArr[i].id}/>)
        }

        return revArr;
    };

    render(){
        const {data} = this.props;

        return (
                <Card title="Новые отзывы"
                      className="reviews"
                      extra={<a onClick={this.props.redirect}>
                                <Icon type="chat" svg size={20}/> 
                                <span>Все отзывы</span>
                            </a>}>
                    <ScrollArea
                            speed={1}
                            className="reviews-list"
                            contentClassName="content"
                    >
                    {data.length ? 
                        this.reviewRender(data) 
                        : <div className='entry-list'>Отзывов нет</div>}
                    </ScrollArea>
                </Card>
        )
    }
}

Reviews.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    numToDisplay: PropTypes.number,
    redirect: PropTypes.func,
    onGoto: PropTypes.func,
    onGotoChat: PropTypes.func,
};

Reviews.defaultProps = {
    data: [],
    numToDisplay: 7,
    redirect: () => {},
    onGoto: () => {},
    onGotoChat: () => {},
};

export default Reviews