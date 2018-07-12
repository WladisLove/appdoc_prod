import React from 'react';
import PropTypes from 'prop-types'

import TreatmentTableItem from '../TreatmentTableItem'
import Card from '../Card'
import Icon from '../Icon'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'

class TreatmentTable extends React.Component{

    treatmentRender = (dataArr) => {
        let treatmentArr = [];

        dataArr.map((item, index) => {
            treatmentArr.push(<TreatmentTableItem {...item} 
                                    onGotoChat = {this.props.onGotoChat}
                                    onGoto={this.props.onGoto} 
                                    data={this.props.data} 
                                    key={item.id + ''+index}/>)
        });

        return treatmentArr;
    };

    render(){
        const {data} = this.props;
        return (
            <div className='treatment-all'>
                <Card title="Актуальные обращения" 
                        extra={<div className='go-to' onClick={this.props.redirect}>
                            <Icon svg size={16} type="order-form" /> <span>Все обращения</span>
                        </div>}>
                    <ScrollArea
                            speed={1}
                            className="scroll"
                            contentClassName="content"
                    >
                    <div className="tableheader">
                        <div className="flex-col"><div className="tableheader-name">Имя пациента</div></div>
                        <div className="flex-col"><div className="tableheader-name">Дата приема</div></div>
                        <div className="flex-col"><div className="tableheader-name">диагноз</div></div>
                        <div className="flex-col"><div className="tableheader-name">Комментарий к приему</div></div>
                        <div className="flex-col"><div className="tableheader-name">стоимость</div></div>
                        <div className="flex-col"><div className="tableheader-name">заключение</div></div>
                        <div className="flex-col"><div className="tableheader-name">отзыв</div></div>
                        <div className="flex-col"><div className="tableheader-name"></div></div>
                    </div>
                    
                        {data.length ? 
                            this.treatmentRender(data) 
                            : <div className='entry-list'>Обращений нет</div>}
                    </ScrollArea>
                  </Card>
            </div>
        )
    }
}

TreatmentTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
    onGotoChat: PropTypes.func,
};

TreatmentTable.defaultProps = {
    data: [],
    onGoto: () => {},
    onGotoChat: () => {},
};

export default TreatmentTable