import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import HistoryReceptionsItems from '../HistoryReceptionsItems'
import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'

class HistoryReceptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            limit: this.props.limit,
            limitedShow: true,
        }
    }

    historyRender = (dataArr) => {
        let historyArr = [];

        dataArr.map((item,i) => {
            if(this.state.limit > i || !this.state.limitedShow){
                historyArr.push(<HistoryReceptionsItems {...item} 
                                                    onGotoChat = {this.props.onGotoChat}
                                                    key={'histRecept'+i}/>)
            }
        });

        historyArr.push(this.renderShowMoreBtn(dataArr))

        return historyArr;
    };

    renderShowMoreBtn = (arr) => {
        if (this.state.limit < arr.length && this.state.limitedShow){
            return (
                <div className="table-footer">
                        <Button
                            btnText='Показать еще'
                            size='link'
                            type='link'
                            icon='circle_arrow_down'
                            onClick = {() => {this.setState({limitedShow: false})}}
                        />
                    </div>)
        }
    };

    render(){
        return (
            <div className='receptions-all'>
                <Card title="История обращений">
                    <div className="tableheader">
                        <div className="flex-col"><div className="receptions-status new">Новые</div></div>
                        <div className="flex-col"><div className="receptions-status topical">Актуальные</div></div>
                        <div className="flex-col"><div className="receptions-status completed">Завершенные</div></div>
                        <div className="flex-col"><div className="receptions-status extra">Экстренные</div></div>
                    </div>
                    <div className="tableheader menu-header">
                        <div className="flex-col"><div className="tableheader-name">Дата приема</div></div>
                        <div className="flex-col"><div className="tableheader-name">диагноз</div></div>
                        <div className="flex-col"><div className="tableheader-name">Комментарий к приему</div></div>
                        <div className="flex-col"><div className="tableheader-name">стоимость</div></div>
                        <div className="flex-col"><div className="tableheader-name">заключение</div></div>
                        <div className="flex-col"><div className="tableheader-name">отзыв</div></div>
                        <div className="flex-col"><div className="tableheader-name"></div></div>
                    </div>
                    {this.historyRender(this.props.data)}
                    
                  </Card>
            </div>
        )
    }
}

HistoryReceptions.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    onGotoChat: PropTypes.func,
};

HistoryReceptions.defaultProps = {
    data: [],
    limit: 7,
    onGotoChat: () => {},
};

export default HistoryReceptions