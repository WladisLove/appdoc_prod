import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import './style.css'
import '../../icon/style.css'

class PatientAccardionDiseaseItem extends React.Component{

    render(){
        const { title, diseases,} = this.props;
        const rootClass = cn('disease');
        
        return (
            <div className={rootClass}>
                <div className='disease-item'>
                    <div className='disease-item-title'>{title}</div>
                    <div className='disease-item-list'>
                       {diseases.map((item, index)=> <div className='disease-item-li' key={index+1}>{item.disease} (c {item.diseaseDate})</div>)}
                    </div>
                </div>
            </div>
        )
    }
}

PatientAccardionDiseaseItem.propTypes = {
    title: PropTypes.string,
    diseases: PropTypes.array,
    diseaseDate: PropTypes.string,

};

PatientAccardionDiseaseItem.defaultProps = {
    title: '',
    diseases: [],
    diseaseDate: '',

};

export default PatientAccardionDiseaseItem