import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Collapse } from 'antd';
const Panel = Collapse.Panel;

import Icon from '../Icon'
import './style.css'
import '../../icon/style.css'

class PopoverItem extends React.Component {
    render() {
        const { labName, labPrice, labAdress } = this.props;

        const header = (labAdress);
        return (
            <div className='analyzes-popover-item'>  
                <div className='analyzes-popover-block'>
                    <div className='analyzes-popover-name'>{labName}</div>
                    <div className='analyzes-popover-price'>{labPrice} руб</div>
                </div>
                <Collapse accordion className='analyzes-popover-adress'>
                    <Panel header={header}>
                        {labAdress}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

PopoverItem.propTypes ={
    labName: PropTypes.string,
    labPrice: PropTypes.string,
    labAdress: PropTypes.string,
}

PopoverItem.defaultProps = {
    labName: '',
    labPrice: '0,00',
    labAdress: '',
}

export default PopoverItem