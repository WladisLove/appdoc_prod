import React from 'react'
import {connect} from 'react-redux';
import Row from "../../components/Row";
import Col from "../../components/Col";
import HistoryReceptions from "../../components/HistoryReceptions";
import moment from "moment"

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css';
import PatientProfileDoctorItem from "../../components/PatientProfileDoctorItem";
import DoctorPageNewVisit from "../../components/DoctorPageNewVisit";
import ReviewsTree from "../../components/ReviewsTree";

class PatientsPage extends React.Component{

    componentWillMount(){
        this.props.getPatientInfo(this.props.match.params.id);
        this.props.onGetAllReviews(0, this.props.match.params.id);
        this.props.onGetInfoDoctor(this.props.match.params.id);
    }

    getDoctorSpecialityStr = () => {
        let specialityStr = "";

        if (this.props.profileDoctor.works) {
            this.props.profileDoctor.educationsgroup1.forEach((item, i, arr) => {
                specialityStr += item.speciality;
                if (i < arr.length - 1) specialityStr += ", ";
            });
        }

        return specialityStr;
    };

    getDoctorLanguagesArr = () => {
        let languagesArr = [], languagesObjArr = [];

        if (typeof this.props.profileDoctor.language === "string") {
            languagesArr = this.props.profileDoctor.language.split(' ');
        }

        languagesObjArr = languagesArr.map((item) => {
            return {language: item};
        });

        return languagesObjArr;
    };

    getDoctorMapsArr = () => {
        let mapsArr = [];

        if (this.props.profileDoctor.works) {
            mapsArr = this.props.profileDoctor.works.map((item) => {
                return {map: (item.worknow + " - " + item.adress)};
            });
        }

        return mapsArr;
    };

    getDoctorExperienceArr = () => {
        let experienceArr = [];

        if (this.props.profileDoctor.educationsgroup1) {
            this.props.profileDoctor.educationsgroup1.map((item) => {
                experienceArr.push({
                    experience: (item.education
                        + ", специальность - " + item.speciality
                        + ", " + item.finishucationyear + " г.")
                });
            });

            this.props.profileDoctor.educationsgroup2.map((item) => {
                experienceArr.push({
                    experience: (item.education
                        + ", специальность - " + item.ciklname
                        + ", " + moment(item.ucationyears[1] * 1000)._d.getFullYear() + " г.")});
            });
        }

        return experienceArr;
    };

    render(){
        const { fio, academicdegree, academicstatus, category, experience, consultationPrice, isChildConsult} = this.props.profileDoctor;
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
                              doctorRate={this.props.ratingAll}
                              doctorReviews={this.props.commentCount}
                              doctorFavorite={true}
                              doctorName={fio}
                              doctorSpeciality={this.getDoctorSpecialityStr()}
                              doctorCategory={academicdegree + '. ' + academicstatus + '. ' + category + '.'}
                              doctorExp={experience}
                              doctorPrice={consultationPrice}
                              doctorLanguages={this.getDoctorLanguagesArr()}
                              doctorChild={isChildConsult}
                              doctorMaps={this.getDoctorMapsArr()}
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
                                         onShowMore = {(numberOfRequest) => this.props.onGetAllReviews(numberOfRequest, this.props.match.params.id)}

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
        ratingAll: state.reviews.ratingAll,
        commentCount: state.reviews.commentCount,
        profileDoctor: state.profileDoctor,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo: (id) => dispatch(actions.getSelectedPatientInfo(id)),
        addPatient: (id) => dispatch(actions.addPatient(id, '', true)),
        onMakeNewAppointment: (obj) => console.log(obj, "DISPATCH IS WORKING"),
        onGetAllReviews: (numberOfRequest, doc_id) => dispatch(actions.getAllReviews(numberOfRequest, 7, doc_id)),
        onGetInfoDoctor: (doc_id) => dispatch(actions.getInfoDoctor(doc_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);