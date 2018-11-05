import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'

class TopPanelItem extends React.Component{

    render(){

        const {className, panelText, type, firstItem, panelTitle, icon, iconSize, svg} = this.props;

        const rootClass = cn( `${className}`, 'panelItem')
        let panelTextStyle = {}
        let panelTitleStyle = {}

        return (
            <div className={rootClass}>
                <div className='panelItem-header'>
                     {icon && (
                        <Icon svg={svg} type={icon} size={iconSize}/>
                    )}
                    {!svg && <span></span>} 
                    {type !== 'icon' && <span className={'panel-title'} style={panelTitleStyle}>{panelTitle}</span>}
                </div>
                {<span className={'panelItem-num'} style={panelTextStyle}>{panelText}</span>}
            </div>
        )
    }
}


TopPanelItem.propTypes ={
    className: PropTypes.string,
    panelTitle: PropTypes.string,
    panelText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    svg: PropTypes.bool,
    firstItem: PropTypes.bool
}

TopPanelItem.defaultProps = {
    className: '',
    panelTitle: '',
    panelText: '',
    svg: true,
    icon: '',
    iconSize: 30,
    firstItem: false,
}

export default TopPanelItem