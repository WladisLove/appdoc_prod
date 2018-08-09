import React from 'react'
import {connect} from 'react-redux';
import {Row, Col, HistoryReceptions, ReviewsTree, PatientProfileDoctorItem, DoctorPageNewVisit} from "appdoc-component";

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css';

class PatientsPage extends React.Component{

    componentWillMount(){
        console.log(this.props.match.params.id, "DOCTOR ID");
        this.props.getPatientInfo(this.props.match.params.id);
        this.props.onGetAllReviews(2697)

    }

    render(){
        const {diseases = [], treatments = [], infoUser = {}} = this.props.info;
        const info = this.props.info.infoUser;
        if(false) {
            return(
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <h3>Страница не найдена</h3>
                    <p>Проверьте введённый адрес</p>
                </div>
            )
        } else {
        return (
            <Hoc>
                <div>
                    <Row>
                        <Col span={24}>
                            <h1 className='page-title'>Профиль врача</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xxl={15} className='section'>
                          <PatientProfileDoctorItem
                              doctorRate={4}
                              doctorReviews={15}
                              doctorFavorite={true}
                              doctorName='Петрова Александра Константиновна'
                              doctorSpeciality='терапевт'
                              doctorCategory='Высшая категория, кандидат медицинских наук'
                              doctorExp='Стаж работы 17 лет '
                              doctorPrice='35'
                              doctorLanguages={[
                                  {language: 'Английский'},
                                  {language: 'Русский'},
                              ]}
                              doctorChild={true}

                              doctorMaps={[
                                  {map: '«Доктор рядом» в Ховрино ул.Фестивальная, д.32'},
                                  {map: '«Доктор рядом» в Лосиноостровском ул. летчика Бабушкина, д.42'},
                              ]}
                              doctorExperience={[
                                  {experience: 'Рязанский медицинский институт имени академика И.П. Павлова, специальность - Лечебное дело, в 1993 году.'},
                                  {experience: 'Рязанский медицинский институт имени академика И.П. Павлова, Интернатура, Психиатрия и психотерапия ФУВ, 1994 г.'},
                                  {experience: 'Государственный научный центр социальной и судебной психиатрии им. В.П.Сербского, Москва, Социальная, судебная и общая психиатрия, 2003г.'},
                                  {experience: 'Первый Московский государственный медицинский университет имени И.М.Сеченова, Психиатрия, 2008г. '},
                              ]}
                          />
                        </Col>
                        <Col xs={24} xxl={9} className='section'>
                            <DoctorPageNewVisit
                            onMakeNewAppointment = {this.props.onMakeNewAppointment}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <HistoryReceptions data={treatments}
                                               onGotoChat={(id) => this.props.history.push('/chat')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className='reviews-section'>
                            <ReviewsTree data={this.props.reviews}
                                         limit={7}
                                         onGoto={(val) => this.gotoHandler(val)}
                                         isOnDoctorPage = {true}


                            />
                        </Col>
                    </Row>
                </div>
            </Hoc>
        )}
    }
}



const mapStateToProps = state => {
    return {
        info: state.patients.selectedPatientInfo,
        id_user: state.patients.selectedId,
        reviews: state.reviews.reviews,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo: (id) => dispatch(actions.getSelectedPatientInfo(id)),
        addPatient: (id) => dispatch(actions.addPatient(id, '', true)),
        onMakeNewAppointment: (obj) => console.log(obj, "DISPATCH IS WORKING"),
        onGetAllReviews: (doc_id) => dispatch(actions.getAllReviews(doc_id)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);