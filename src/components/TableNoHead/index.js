import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import TableNoHeadItem from '../TableNoHeadItem'
import Card from '../Card'
import Button from '../Button'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'
import Icon from '../Icon'

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
                <Card title="Ближайшие тренировки" extra={<a className="schedule-all-link"><Icon type="circle_arrow_right" /> <span>Все</span></a>}>
                    <div className="scroll">
                    {/**/}
                         <ScrollArea
                            speed={0.8}
                            className="scroll"
                            smoothScrolling={true}>
                            {data.length ? 
                                this.scheduleRender(data) 
                                : <div className='entry-list priem-net'>тренировок нет</div>}
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