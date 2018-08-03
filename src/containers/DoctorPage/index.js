import React from 'react'
import {connect} from 'react-redux';
import Row from "../../components/Row";
import Col from "../../components/Col";
import HistoryReceptions from "../../components/HistoryReceptions";
import moment from 'moment'

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css';
import PatientProfileDoctorItem from "../../components/PatientProfileDoctorItem";
import DoctorPageNewVisit from "../../components/DoctorPageNewVisit";
import ReviewsTree from "../../components/ReviewsTree";
import PatientDoctorItem from "../../components/PatientDoctorItem";

class PatientsPage extends React.Component{

    componentWillMount(){
        this.props.getPatientInfo(this.props.match.params.id);
        this.props.onGetAllReviews(this.props.match.params.id);
        this.props.onGetInfoDoctor(this.props.match.params.id);
    }

    getDocAvgRate = () => {
        if (!this.props.reviews) return 0;
        let rateArr = this.props.reviews;
        let sum = rateArr.reduce((acc, curVal) => {
            return acc + parseInt(curVal.rating);
        }, 0);
        return sum / rateArr.length;
    };

    getDoctorExperienceArr = () => {
        let experienceArr = [];

        if (this.props.profileDoctor.educationsgroup1) {
            this.props.profileDoctor.educationsgroup1.map((item) => {
                experienceArr.push({
                    experience: (item.education
                        + ", специальность - " + item.speciality
                        + ", " + moment(item.finishucationyear[1] * 1000)._d.getFullYear() + " г.")
                });
            });

            this.props.profileDoctor.educationsgroup2.map((item) => {
                experienceArr.push({experience: item.education});
            });
        }

        return experienceArr;
    };

    render(){
        console.log(this.props.profileDoctor)
        const { fio, academicdegree, academicstatus, category, experience, consultationPrice, language, isChildConsult} = this.props.profileDoctor;
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
                              doctorRate={this.getDocAvgRate()}
                              doctorReviews={this.props.reviews.length}
                              doctorFavorite={true}
                              doctorName={fio}
                              doctorSpeciality='терапевт'
                              doctorCategory={academicdegree + '. ' + academicstatus + '. ' + category}
                              doctorExp={experience}
                              doctorPrice={consultationPrice}
                              doctorLanguages={[
                                  {language: language},
                                  {language: 'Русский'},
                              ]}
                              doctorChild={isChildConsult}
                              doctorMaps={[
                                  {map: '«Доктор рядом» в Ховрино ул.Фестивальная, д.32'},
                                  {map: '«Доктор рядом» в Лосиноостровском ул. летчика Бабушкина, д.42'},
                              ]}
                              doctorExperience={this.getDoctorExperienceArr()}
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
        profileDoctor: state.profileDoctor,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo: (id) => dispatch(actions.getSelectedPatientInfo(id)),
        addPatient: (id) => dispatch(actions.addPatient(id, '', true)),
        onMakeNewAppointment: (obj) => console.log(obj, "DISPATCH IS WORKING"),
        onGetAllReviews: (doc_id) => dispatch(actions.getAllReviews(doc_id)),
        onGetInfoDoctor: (doc_id) => dispatch(actions.getInfoDoctor(doc_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);