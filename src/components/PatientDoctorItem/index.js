import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import ProfileAvatar from '../ProfileAvatar'
import NewVisitModalPage from '../NewVisitModalPage'

import './style.css'
import '../../icon/style.css'

class PatientDoctorItem extends React.Component{
    state = {
        modal1Visible: false,
        modal2Visible: false,
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    render(){
        const { doctorAvatar, doctorName, doctorSpecialty, doctorRate, doctorRank, doctorCategory, doctorExp} = this.props;
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
                        <div className='doctor-item-doctor__name'>{doctorName}</div>
                        <div className='doctor-item-doctor__specialty'>{doctorSpecialty}</div>
                        <div className='doctor-item-doctor__rating'><Rate defaultValue={doctorRate} disabled/></div>
                    </div>
                    <div className='doctor-item-text'>
                        <div>{doctorRank}. {doctorCategory}.</div>
                        <div>Стаж работы {doctorExp}.</div>
                    </div>
                    <div className='doctor-item-btn'>
                        <Button
                            onClick={() => this.setModalVisible(true)}
                            btnText='записаться на прием'
                            size='small'
                            type='float'
                            icon='form'
                        />
                    </div>
                </div>

                <NewVisitModalPage 
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    userName=''
                    date={new Date(2018,1,4,8,10)}
                    onSave = {(obj) => console.log(obj)}
                />
            </div>
        )
    }
}

PatientDoctorItem.propTypes = {
    doctorAvatar: PropTypes.string,
    doctorName: PropTypes.string,
    doctorSpecialty: PropTypes.string,
    doctorRate: PropTypes.number,
    doctorRank: PropTypes.string,
    doctorCategory: PropTypes.string,
    doctorExp: PropTypes.string,

};

PatientDoctorItem.defaultProps = {
    doctorAvatar: '',
    doctorName: '',
    doctorSpecialty: '',
    doctorRate: 0,
    doctorRank: '',
    doctorCategory: '',
    doctorExp: '',

};

export default PatientDoctorItem