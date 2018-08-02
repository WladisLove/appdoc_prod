import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import ProfileAvatar from '../ProfileAvatar'
import Card from '../Card'
import Button from '../Button'
import Icon from '../Icon'
import NewMessageModal from '../NewMessageModal'
import NewVisitModalPage from '../NewVisitModalPage'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'

class ProfilePatient extends React.Component{
    state = {
        modal1Visible: false,
        modal2Visible: false,
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    render(){
        const {name, img, status, lastDate, speciality, doctor, birthday, age, height, weight} = this.props;
        const [fname, ...rest] = name.split(' ');
        let doctorType = '';
        Array.isArray(speciality) && speciality.forEach(el => {
            doctorType += el + ', ';
        });

        return (
            <div className='profile-patient'>
                <Card title="Общая информация" className="patient-card">
                    <ScrollArea
                            speed={0.5}
                            contentClassName="flex-div"
                            smoothScrolling={true}
                    >
                        <ProfileAvatar 
                          img={img}
                          owner='patient'
                          size="large"
                          online={status}
                          />

                        <div className="patient-info">
                                <div className="patient-name">{fname}<br/>{rest.concat(' ')}</div>
                                <div className="patient__last-active">
                                    Последнее обращение: {moment((+lastDate)*1000).format('DD.MM.YYYY')} / {doctorType} {doctor}
                                </div>
                                <div className="btn-row">
                                    <Button onClick={() => this.setModal1Visible(true)}
                                        btnText='записать на прием'
                                        size='default'
                                        type='float'
                                        icon='form'
                                        iconSize={12}
                                    />

                                <Button onClick={() => this.setModal2Visible(true)}
                                        btnText=''
                                        size='icon'
                                        type='light-blue'
                                        icon='mail'
                                        svg
                                        iconSize={16}
                                        title='Отправить сообщение'
                                />
                                {
                                    !this.props.isMy &&
                                <Button 
                                        className="btn-add"
                                        btnText=''
                                        size='file'
                                        type='file'
                                        icon='add-button'
                                        svg
                                        title='Добавть в мои пациенты'
                                        iconSize={28}
                                        onClick={() => this.props.onAdd(this.props.id)}
                                />
                                }
                            </div>
                      </div>

                      <div className="patient-info__more">
                            <div className="patient-row">
                                <span className="title">Дата рождения:</span>
                                <span className="text">{moment((+birthday)*1000).format('DD.MM.YYYY')}</span>
                            </div>
                            <div className="patient-row">
                                <span className="title">Возраст:</span>
                                <span className="text">{age}</span>
                            </div>
                            <div className="patient-row">
                                <span className="title">Рост:</span>
                                <span className="text">{height} см</span>
                            </div>
                            <div className="patient-row">
                                <span className="title">Вес:</span>
                                <span className="text">{weight} кг</span>
                            </div>
                      </div> 
                    </ScrollArea>

                </Card>

                <NewMessageModal 
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    userName={name}
                />

                <NewVisitModalPage 
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    userName={name}
                    onSave = {(obj) => console.log(obj)}
                />
            </div>
        )
    }
}

ProfilePatient.propTypes = { 
    name: PropTypes.string,
    img: PropTypes.string,
    status: PropTypes.string,
    lastDate: PropTypes.number,
    speciality: PropTypes.array,
    doctor: PropTypes.string,
    birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    age: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProfilePatient.defaultProps = {
    name: '',
    img: '',
    status: '',
    lastDate: 0,
    speciality: [],
    doctor: '',
    birthday: 0,
    age: '',
    height: '',
    weight: ''
};

export default ProfilePatient