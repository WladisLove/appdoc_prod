import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import moment from 'moment'

import './style.css'
import '../../icon/style.css'

class PatientAccardionDiseaseItem extends React.Component{

    render(){
        const { title, diseases,} = this.props;
        const rootClass = cn('disease');
        console.log(diseases, "BOLEZNI");
        return (
            <div className={rootClass}>
                <div className='disease-item'>
                    <div className='disease-item-list'>
                       {diseases.map((item, index)=> <div className='disease-item-li' key={index+1}>{item.diseases} (c {moment(item.date*1000).format("DD.MM.YYYY")})</div>)}
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