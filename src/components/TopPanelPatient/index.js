import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '../Icon'
import TopPanelPatientItem from '../TopPanelPatientItem';
import './style.css'
import '../../icon/style.css'

class TopPanelPatient extends React.Component{

	panelRender = (dataArr) => {
        let panelArr = [];

        dataArr.map((item, index) => {
            panelArr.push(<TopPanelPatientItem {...item} key={'top-panel-'+index}/>)
        });

        return panelArr;
    };

    render(){
        return (
            <div className='top-panel top-panel-patient'>
                {this.panelRender(this.props.data)}
            </div>
        )
    }
}

TopPanelPatient.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

TopPanelPatient.defaultProps = {
    data: [],
};


export default TopPanelPatient