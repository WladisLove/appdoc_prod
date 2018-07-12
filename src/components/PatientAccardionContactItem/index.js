import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import ProfileAvatar from '../ProfileAvatar'
import Button from '../Button'
import Input from '../Input'

import './style.css'
import '../../icon/style.css'

class PatientAccardionContactItem extends React.Component{

    render(){
        const { contactFio, contactPhone, contactEmail, contactAdress, contactPas, contactNewPas } = this.props;
        const rootClass = cn('patient-contacts');
        
        return (
            <div className={rootClass}>
                <div className='patient-contacts-title'>контактные данные</div>
                <div className='patient-contacts-block'>
                    <div className='patient-contacts-avatar'>
                        <ProfileAvatar 
                            img='https://boltai.com/wp-content/uploads/2017/07/3_main_new.1494599956.jpg'
                            owner='patient'
                            size="large"
                            online={true}
                        />
                        <div className='patient-contacts-controls'>
                            <Button
                                btnText=''
                                size='icon'
                                type='icon'
                                icon='retweet'
                                iconSize={16}
                            />
                            <Button
                                btnText=''
                                size='icon'
                                type='icon'
                                icon='close'
                                iconSize={13}
                            />
                        </div>
                        
                    </div>
                    <div className='patient-contacts-info'>
                        <Input addonBefore='ФИО' defaultValue={contactFio}/>
                        <Input addonBefore='Телефон' defaultValue={contactPhone}/>
                        <Input addonBefore='E-mail' defaultValue={contactEmail}/>
                        <Input addonBefore='Адрес' defaultValue={contactAdress}/>
                    </div>
                </div>

                <div className='patient-contacts-title'>изменить пароль</div>
                <div className='patient-contacts-block'>
                    <div className='patient-contacts-password'>
                        <Input type='password' addonBefore='Текущий пароль' defaultValue={contactPas}/>
                        <Input addonBefore='Новый пароль' defaultValue={contactNewPas}/>
                    </div>
                </div>

                <Button
                    btnText='Сохранить изменения'
                    size='default'
                    type='float'
                />
            </div>
        )
    }
}

PatientAccardionContactItem.propTypes = {
    contactFio: PropTypes.string,
    contactPhone: PropTypes.string,
    contactEmail: PropTypes.string,
    contactAdress: PropTypes.string,
    contactPas: PropTypes.string,
    contactNewPas: PropTypes.string,
};

PatientAccardionContactItem.defaultProps = {
    contactFio: '',
    contactPhone: '',
    contactEmail: '',
    contactAdress: '',
    contactPas: '',
    contactNewPas: '',
};

export default PatientAccardionContactItem