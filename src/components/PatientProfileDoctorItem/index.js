import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Icon from '../Icon'
import RatePanel from '../RatePanel'
import ProfileAvatar from '../ProfileAvatar'
import Content from './content'

import './style.css'
import '../../icon/style.css'

class PatientProfileDoctorItem extends React.Component{

    render(){
        const { doctorRate, doctorReviews, doctorFavorite, doctorName, doctorSpeciality, doctorCategory, doctorExp, doctorPrice, doctorLanguages, doctorChild } = this.props;
        const rootClass = cn('profile__doctor-item');

        return (
            <div className='profile__doctor'>
                <div className={rootClass}>
                    <div className='profile__doctor-item-block'>
                        <div className='profile__doctor-item-rate'>
                            <RatePanel 
                                rateValue={doctorRate}
                                timesRated={doctorReviews}
                            />
                        </div>
                        <div className='profile__doctor-item-favorites'>
                            {doctorFavorite && (
                                <Icon type='heart_filled' size={20} svg />
                            )}
                        </div>
                    </div>
                    <div className='profile__doctor-item-block'>
                        <div className='profile__doctor-item-avatar'>
                            <ProfileAvatar 
                              img='https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3036143-poster-p-1-5-strategies-for-big-picture-thinking.png'
                              owner='doctor'
                              size="large"
                              online={true}
                            />
                        </div>
                        <div className='profile__doctor-item-info'>
                            <div className='profile__doctor-item-name'>{doctorName}</div>
                            <div className='profile__doctor-item-speciality'>{doctorSpeciality}</div>
                            <div className='profile__doctor-item-category'>{doctorCategory}</div>
                            <div className='profile__doctor-item-exp'>Стаж работы {doctorExp} лет</div>
                        </div>
                        <div className='profile__doctor-item-block'>
                            <div className='profile__doctor-item-price'>
                                <div className='profile__doctor-item-price-title'>Стоимость<br />консультации</div>
                                <div className='profile__doctor-item-price-coast'>{doctorPrice} руб</div>
                            </div>
                            <div className='profile__doctor-item-language'>
                                <div className='profile__doctor-item-language-title'>Знание языков</div>
                                {doctorLanguages.map((item, index)=> <div className='profile__doctor-item-language-li' key={index+1}>{item.language}</div>)}
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