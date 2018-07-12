import React from 'react';
import PropTypes from 'prop-types'

import PatientNearRecordItem from '../PatientNearRecordItem'
import Card from '../Card'
import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'


class PatientNearRecord extends React.Component{

    nearRender = (dataArr) => {
        let nearArr = [];

        dataArr.map((item,index) => {
            nearArr.push(<PatientNearRecordItem key={index} {...item}/>)
        });

        return nearArr;
    }

    render(){
        const { data, onGoto } = this.props;

        return (
            <div className='record-all'>
                <Card title="Ближайшие записи" extra={<div onClick={onGoto} className='go-to'><Icon svg type='calendar' size={18} /> Все</div>}>
                {this.nearRender(this.props.data)}
                </Card>
            </div>
        )
    }
}

PatientNearRecord.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
};

PatientNearRecord.defaultProps = {
    data: [],
    onGoto: () => {},
};

export default PatientNearRecord