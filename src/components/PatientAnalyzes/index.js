import React from 'react';
import PropTypes from 'prop-types'

import PatientAnalyzesItem from '../PatientAnalyzesItem'
import Card from '../Card'
import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'


class PatientAnalyzes extends React.Component{

    analyzesRender = (dataArr) => {
        let analyzesArr = [];

        dataArr.map((item,index) => {
            analyzesArr.push(<PatientAnalyzesItem key={index} {...item}/>)
        });

        return analyzesArr;
    }

    render(){
        const { data } = this.props;

        return (
            <div className='analyzes-all'>
                <Card title="Напоминания">
                    {this.analyzesRender(this.props.data)}
                </Card>
            </div>
        )
    }
}

PatientAnalyzes.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

PatientAnalyzes.defaultProps = {
    data: [],
};

export default PatientAnalyzes