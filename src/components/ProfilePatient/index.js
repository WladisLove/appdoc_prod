import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { Translate } from 'react-localize-redux'
import ProfileAvatar from '../ProfileAvatar'
import Card from '../Card'
import Button from '../Button'
import Icon from '../Icon'
import NewMessageModal from '../NewMessageModal'
import NewVisitModalPage from '../NewVisitModalPage'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'
import {message} from "antd";

class ProfilePatient extends React.Component{
    state = {
        modal1Visible: false,
        modal2Visible: false,
        isRecordInProcess: false,
        submitSuccess: true
    };

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
        if (modal1Visible) this.props.onGetAllDocIntervals();
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    render(){
        const {name, img, status, lastDate, speciality, doctor, birthday, age, height, weight, id} = this.props;
        let doctorType = '';
        Array.isArray(speciality) && speciality.forEach(el => {
            doctorType += el + ', ';
        });

        return (
            <Translate>
                {({ translate }) =>
                    (<div className='profile-patient'>
                        <Card title={translate('generalInformation')} className="patient-card">
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
                                        <div className="patient-name">{name}</div>
                                        <div className="patient__last-active">
                                            {translate('treatment.last')}: {lastDate ? `${moment((+lastDate)*1000).format('DD.MM.YYYY')} /
                                            ${doctorType} ${doctor}`: <span>&mdash;</span>}
                                        </div>
                                        <div className="btn-row">
                                            <Button onClick={() => this.setModal1Visible(true)}
                                                btnText={translate('button.title.makeAnReception')}
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
                                                title={translate('button.title.sendMessage')}
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
                                                title={translate('button.title.addToMyPatients')}
                                                iconSize={28}
                                                onClick={() => this.props.onAdd(this.props.id)}
                                        />
                                        }
                                    </div>
                              </div>

                              <div className="patient-info__more">
                                    <div className="patient-row">
                                        <span className="title">{translate('dateOfBirth')}:</span>
                                        <span className="text">{moment((+birthday)*1000).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div className="patient-row">
                                        <span className="title">{translate('age')}:</span>
                                        <span className="text">{age}</span>
                                    </div>
                                    <div className="patient-row">
                                        <span className="title">{translate('height')}:</span>
                                        <span className="text">{height} {translate('cm')}</span>
                                    </div>
                                    <div className="patient-row">
                                        <span className="title">{translate('weight')}:</span>
                                        <span className="text">{weight} {translate('kg')}</span>
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
                            onSave={this.props.onSaveReception}
                            onCancel={() => this.setModal1Visible(false)}
                            userName={name}
                            intervals={this.props.intervals}
                            onChangeDate={this.props.onGetIntervalForDate}
                            availableIntervals={this.props.availableIntervals}
                            id={id}
                            submitSuccess={this.state.submitSuccess}
                        />
                    </div>)
                }
            </Translate>
        )
    }
}

ProfilePatient.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    status: PropTypes.bool,
    lastDate: PropTypes.number,
    speciality: PropTypes.array,
    doctor: PropTypes.string,
    birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    age: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.number
};

ProfilePatient.defaultProps = {
    name: '',
    img: '',
    status: null,
    lastDate: 0,
    speciality: [],
    doctor: '',
    birthday: 0,
    age: '',
    height: '',
    weight: '',
    id: 0
};

export default ProfilePatient
