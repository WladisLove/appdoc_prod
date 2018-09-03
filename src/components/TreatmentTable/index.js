import React from 'react';
import PropTypes from 'prop-types'

import TreatmentTableItem from '../TreatmentTableItem'
import Card from '../Card'
import Icon from '../Icon'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'
import Spinner from "../Spinner";

class TreatmentTable extends React.Component{

    treatmentRender = (dataArr) => {
        return dataArr.map((item) => {
            return (<TreatmentTableItem {...item} 
                                onGotoChat = {this.props.onGotoChat}
                                onGoto={this.props.onGoto} 
                                data={this.props.data} 
                                key={item.id_treatment}
                                isUser = {this.props.isUser}

            />)
        });
    };

    render(){
        const {data} = this.props;
        return (
            <div className='treatment-all'>
                <Card title={this.props.isUser ? "Прошедшие приемы" : "Актуальные обращения" }

                        extra={<div className='go-to' onClick={this.props.redirect}>
                            <Icon svg size={16} type="order-form" /> <span>Все обращения</span>
                        </div>}>
                    <ScrollArea
                        speed={1}
                        className=""
                        contentClassName="content"
                        horizontal={true}
                    >

                                <div className="tableheader">
                                    <div className="flex-col"><div className="tableheader-name">{this.props.isUser ? "Врач" : "Имя пациента"}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Дата приема</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Диагноз</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Комментарий к приему</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Стоимость</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Заключение</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Отзыв</div></div>
                                    <div className="flex-col"><div className="tableheader-name">Файлы</div></div>
                                </div>
                        {this.props.treatmentsLoaded !== true ?
                            <div className="treatment-all-spinner"><Spinner/></div>
                            : data.length ? this.treatmentRender(data)
                                : <div className='entry-list'>{this.props.isUser ? "Приёмов нет" : "Обращений нет"}</div>}
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