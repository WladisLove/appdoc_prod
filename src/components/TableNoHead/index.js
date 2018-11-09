import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import TableNoHeadItem from '../TableNoHeadItem'
import Card from '../Card'
import Button from '../Button'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'

class TableNoHead extends React.Component{

    scheduleRender = (dataArr) => {
        return dataArr.map((item,index) => {
            return (<TableNoHeadItem {...item} 
                                    key={'nogead-item'+index}
                                    onBegin={this.props.onBegin}
                                    onCancel={this.props.onCancel}
                                    onGoto={this.props.onGoto}
            />)
        });
    };

    render(){
        const rootClass = cn('schedule-all');
        const {data} = this.props;
        
        return (
            <div className={rootClass}>
                <Card title="График работы на сегодня" extra={<div className="sum">Приемы: {data.length}</div>}>
                    <div className="scroll">
                    {/**/}
                        <div className="tableheader">
                            <div className="flex-col">
                                <Button
                                    btnText='Добавить'
                                    onClick={this.props.onAdd}
                                    size='default'
                                    type='yellow'
                                    icon='plus'
                                    iconSize={11}
                                    svg
                                    title='Добавить новый приём'
                                />
                            </div>
                            {/*<div className="flex-col ico-btn">
                                <Button 
                                    size='link'
                                    type='link'
                                    icon='printer'
                                    svg
                                    title='Распечатать'
                                />
                                <Button 
                                    size='link'
                                    type='link'
                                    icon='pdf-file'
                                    title='Скачать pdf-файл'
                                />
                                <Button 
                                    size='link'
                                    type='link'
                                    icon='xls-file'
                                    title='Скачать xls-файл'
                                />
                            </div>*/}
                        </div>
                        <ScrollArea
                            speed={0.8}
                            className="scroll"
                            smoothScrolling={true}>
                            {data.length ? 
                                this.scheduleRender(data) 
                                : <div className='entry-list'>Приемов нет</div>}
                        </ScrollArea>
                    </div>
                  </Card>
            </div>
        )
    }
}

TableNoHead.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onAdd: PropTypes.func,
    onBegin: PropTypes.func,
    onCancel: PropTypes.func,
    onGoto: PropTypes.func,
};

TableNoHead.defaultProps = {
    data: [],
    onAdd: () => {},
    onBegin: () => {},
    onCancel: () => {},
    onGoto: () => {},
};


export default TableNoHead