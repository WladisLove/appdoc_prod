import React from 'react';
import PropTypes from 'prop-types'

import Icon from '../Icon'
import RatePanel from '../RatePanel'
import ProfileAvatar from '../ProfileAvatar'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'

const PatientPageDoctorItem = props => {
    console.log(props, "PROPS EVERY DOC");
    const handleClick = () => {
        props.onDelete(props.id, props.doctorName);
    }

    const { id, doctorRate, doctorReviews, doctorFavorite, doctorName, doctorCategory, doctorExp,
            doctorPrice, doctorLanguages, doctorChild, doctorAvatar, speciality} = props;
    const onGoTo = () => {
        props.onGoTo(id);
    };
    const renderSpecialities = (speciality) => {

        if(speciality.length) {
            return speciality.reduce((acc, current)=> {
                return `${acc}, ${current}`
            })
        } else {
            return (<Translate id="doctor.noSpecialties" />)
        }

    };

    const showLanguageOptions = (doctorLanguages) => {
        let data = []
        doctorLanguages.map((item, index) => {
            if(item instanceof Object && (item.hasOwnProperty('language') || item.hasOwnProperty('title'))){
                data.push(<div className='page__doctor-item-language-li'>
                            {item.title ? item.title : item.language}
                        </div>)
            }        
            else{
                data.push(<div className='page__doctor-item-language-li'>
                    {item }
                </div>)   
            }  
        })
        
        return data;
    }

    return (
            <div className='page__doctor-item'>
                <div className='page__doctor-item-block'>
                    <div className='page__doctor-item-rate'>
                        <RatePanel
                            rateValue={doctorRate}
                            timesRated={doctorReviews}
                        />
                    </div>
                    <div className='page__doctor-item-favorites'>
                        {doctorFavorite && (
                            <Icon
                                type='empty'
                                size={20}
                                svg
                                onClick={handleClick}
                            />
                        )}
                    </div>
                </div>
                <div className='page__doctor-item-block'>
                    <div className='page__doctor-item-avatar'>
                        <ProfileAvatar
                          img={doctorAvatar}
                          owner='doctor'
                          size="large"
                          online={true}
                        />
                    </div>
                    <div className='page__doctor-item-info'>
                        <div
                            className='page__doctor-item-name'
                            onClick={onGoTo}>{doctorName}
                        </div>


                        <div className='page__doctor-item-speciality'>{renderSpecialities(speciality)}</div>
                        <div className='page__doctor-item-category'>{doctorCategory}</div>
                        <div className='page__doctor-item-exp'><Translate id="doctor.workExperience" /> {doctorExp}</div>
                    </div>
                </div>
                <div className='page__doctor-item-block'>
                    <div className='page__doctor-item-price'>
                        <div className='page__doctor-item-price-title'><Translate id="consultationCost" /></div>
                        <div className='page__doctor-item-price-coast'>{doctorPrice} <Translate id="currency" /></div>
                    </div>
                    {doctorLanguages &&
                        <div className='page__doctor-item-language'>

                             <div className='page__doctor-item-language-title'>
                                <Translate id="languagesKnowledge" />
                            </div>
                            {
                                showLanguageOptions(doctorLanguages)
                            }
                        </div>
                    }
                    <div className='page__doctor-item-child'>
                        {doctorChild && (
                            <Icon type='toy_kids' size={50} svg />
                        )}
                    </div>
                </div>
            </div>
        )
}

PatientPageDoctorItem.propTypes = {
    doctorRate: PropTypes.number,
    doctorReviews: PropTypes.number,
    doctorFavorite: PropTypes.bool,
    doctorChild: PropTypes.bool,
    doctorName: PropTypes.string,
    doctorSpeciality: PropTypes.string,
    doctorCategory: PropTypes.string,
    doctorExp: PropTypes.string,
    doctorPrice: PropTypes.string,
    doctorLanguages: PropTypes.array,
};

PatientPageDoctorItem.defaultProps = {
    doctorRate: 0,
    doctorReviews: 0,
    doctorFavorite: false,
    doctorChild: false,
    doctorName: '',
    doctorSpeciality: '',
    doctorCategory: '',
    doctorExp: '',
    doctorPrice: '',
    doctorLanguages: [],
};

export default PatientPageDoctorItem
