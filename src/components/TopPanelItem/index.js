import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'
import ab from '../../autobahn';

class TopPanelItem extends React.Component{

    render(){

        const {className, panelText, type, panelTitle, svg} = this.props;

        const rootClass = cn( `${className}`, 'panelItem')
        let panelTextStyle = {}
        let panelTitleStyle = {}

        let panelIdStyle = "";
        if (type == "next") panelIdStyle = "-next";
        return (
            <div className={rootClass}>
                {<p className={'panelItem-num' + panelIdStyle} style={panelTextStyle}>{panelText}</p>}
                <div className='panelItem-header'>

                    {!svg && <span></span>} 
                    {type !== 'icon' && <p className={'panel-title'} style={panelTitleStyle}>{panelTitle}</p>}
                </div>
                
            </div>
        )
    }
}


TopPanelItem.propTypes ={
    className: PropTypes.string,
    panelTitle: PropTypes.string,
    panelText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    iconSize: PropTypes.number,
    svg: PropTypes.bool,
    firstItem: PropTypes.bool
}

TopPanelItem.defaultProps = {
    className: '',
    panelTitle: '',
    panelText: '',
    svg: true,
    iconSize: 30,
    firstItem: false,
}

export default TopPanelItem