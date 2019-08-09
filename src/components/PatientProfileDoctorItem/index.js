import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Icon from '../Icon'
import RatePanel from '../RatePanel'
import ProfileAvatar from '../ProfileAvatar'
import Content from './content'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'

class PatientProfileDoctorItem extends React.Component{
    constructor(props){
        super(props);
    }

    showLanguageOptions = (doctorLanguages) => {
        let data = [];
        
        const { availLanguages } = this.props;
        console.log(doctorLanguages, availLanguages, "LANGLANGLANG")
        doctorLanguages.forEach((item, index) => {
            availLanguages.forEach(lang => {
                if (lang.id === item || lang.id == item.id) {
                    data.push(<div>{lang.title}</div>)
                }
            });
        });

        return data;
    }

    render(){
        const { id, doctorRate, doctorReviews, doctorFavorite, doctorName, doctorSpeciality, doctorCategory, doctorPrice, doctorLanguages, doctorChild } = this.props;
        const rootClass = cn('profile__doctor-item');

        return (
            <div className='profile__doctor'>
                <div className={rootClass}>
                    <div className='profile__doctor-item-block'>
                        <div className='profile__doctor-item-rate'>
                            <RatePanel
                                rateValue={doctorRate}
                                timesRated={doctorReviews}
                                disable={true}

                            />
                        </div>
                        {/*FAVORITE ICON*/}
                        {/*<div className='profile__doctor-item-favorites'>
                            {doctorFavorite && (
                                <Icon type='heart_filled' size={20} svg />
                            )}
                        </div>*/}
                    </div>
                    <div className='profile__doctor-item-block'>
                        <div className='profile__doctor-item-avatar'>
                            <ProfileAvatar
                                id={id}
                              img={this.props.doctorAvatar}
                              owner='doctor'
                              size="large"
                              online={true}
                            />
                        </div>
                        <div className='profile__doctor-item-info'>
                            <div className='profile__doctor-item-name'>{doctorName}</div>
                            <div className='profile__doctor-item-speciality'>{doctorSpeciality}</div>
                            <div className='profile__doctor-item-category'>{doctorCategory}</div>
                        </div>
                        <div className='profile__doctor-item-block'>
                            <div className='profile__doctor-item-price'>
                                <div className='profile__doctor-item-price-title'><Translate id="consultationCost" /></div>
                                <div className='profile__doctor-item-price-coast'>{doctorPrice} <Translate id="currency" /></div>
                            </div>
                            <div className='profile__doctor-item-language'>

                                <div className='profile__doctor-item-language-title'><Translate id="languagesKnowledge" /></div>
                                {
                                    this.showLanguageOptions(doctorLanguages)
                                }

                            </div>
                            <div className='profile__doctor-item-child'>
                                {doctorChild && (
                                    <Icon type='toy_kids' size={50} svg />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Content {...this.props} />
            </div>
        )
    }
}

PatientProfileDoctorItem.propTypes = {
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

PatientProfileDoctorItem.defaultProps = {
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

export default PatientProfileDoctorItem
