import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import { Translate } from 'react-localize-redux'
import Button from '../Button'
import Rate from '../Rate'
import ProfileAvatar from '../ProfileAvatar'

import './style.css'
import '../../icon/style.css'

class PatientDoctorItem extends React.Component{


    render(){
        const { doctorAvatar, doctorName, doctorSpeciality, doctorRate, doctorRank, doctorCategory, doctorExp,
            id, intervals} = this.props;
        const rootClass = cn('doctor-item');

        return (
            <div className={rootClass}>
                <div className='doctor-item-avatar'>
                    <ProfileAvatar
                        img={doctorAvatar}
                        owner='doctor'
                        size="small"
                />
                </div>
                <div className='doctor-item-block'>
                    <div className='doctor-item-info'>
                        <div className='doctor-item-doctor__name' onClick={()=>{this.props.onGoto(this.props.id)}}>{doctorName}</div>
                        <div className='doctor-item-doctor__specialty'>{doctorSpeciality}</div>
                        <div className='doctor-item-doctor__rating'><Rate defaultValue={doctorRate} disabled/></div>
                    </div>
                    <div className='doctor-item-text'>
                        <div>{doctorRank} {doctorCategory}</div>
                        <div><Translate id="doctor.workExperience" /> {doctorExp}</div>
                    </div>
                    <div className='doctor-item-btn'>
                        <Translate>
                            {({ translate }) =>
                                (<Button
                                    onClick={() => this.props.checkModal1Visible(true, doctorName, id)}
                                    btnText={intervals.length ? translate('button.title.signUpForReception').toLowerCase() : translate('button.title.noFreeTime').toLowerCase()}
                                    size='small'
                                    type='float'
                                    icon='form'
                                    disable={!intervals.length}
                                />)
                            }
                        </Translate>
                    </div>
                </div>
            </div>
        )
    }
}


PatientDoctorItem.propTypes = {
    doctorID: PropTypes.number,
    doctorAvatar: PropTypes.string,
    doctorName: PropTypes.string,
    doctorSpecialty: PropTypes.string,
    doctorRate: PropTypes.number,
    doctorRank: PropTypes.string,
    doctorCategory: PropTypes.string,
    doctorExp: PropTypes.string,
    intervals: PropTypes.array
};

PatientDoctorItem.defaultProps = {
    doctorID: 0,
    doctorAvatar: '',
    doctorName: '',
    doctorSpecialty: '',
    doctorRate: 0,
    doctorRank: '',
    doctorCategory: '',
    doctorExp: '',
    intervals: []
};

export default PatientDoctorItem
