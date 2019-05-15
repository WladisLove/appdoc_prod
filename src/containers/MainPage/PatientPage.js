import React from 'react'
import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";
import PatientNearRecord from "../../components/PatientNearRecord";
import PatientAnalyzes from "../../components/PatientAnalyzes";
import PatientDoctor from "../../components/PatientDoctor";
import TopPanelPatient from "../../components/TopPanelPatient";
import TreatmentTable from "../../components/TreatmentTable";
import NewFreeVisitByPatient from "../../components/NewFreeVisitByPatient";
import {geolocated} from 'react-geolocated';
import { Translate } from 'react-localize-redux'

class PatientPage extends React.Component {
    gotoHandler = (id) => {
        this.props.onSelectPatient(id);
        this.props.history.push('/app/doctor'+id);
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.coords && nextProps.coords ){
			this.props.onSaveGeolocation(nextProps.coords);
		}       
    }
    
    render() {
        return (
            <Hoc>
                <Row>
                    <Col>
                        <Translate>
                        {({ translate }) =>
                            (
                        <TopPanelPatient
                            data={[
                                {
                                    first: true,
                                }, {
                                    className: "",
                                    num: this.props.userInfoShort.PatientAge || '—',
                                    text: translate('age').toLowerCase(),
                                    notChangeable: true,
                                }, {
                                    className: "",
                                    num: this.props.userInfoShort.PatientWeight || '—',
                                    text: translate('weight').toLowerCase(),
                                }, {
                                    className: "",
                                    num: this.props.userInfoShort.PatientHeight || '—',
                                    text: translate('height').toLowerCase(),
                                }, {
                                    className: "pressure",
                                    num: this.props.userInfoShort.PatientPressure || '—',
                                    text: translate('pressure').toLowerCase(),
                                    doubleValueInput: true,
                                }, {
                                    className: "",
                                    num: this.props.userInfoShort.PatientPulse || '—',
                                    text: translate('pulse').toLowerCase(),
                                },
                            ]}
                            onSave={this.props.onSendUserPoleValue}
                        />)}
                        </Translate>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} xxl={6} className='section' height={100}>
                        <PatientNearRecord
                            style={{height: 485}}
                            data={this.props.nearVisits}
                            onGoto={() => this.props.history.push('/app/doctors')}
                            redirect={() => this.props.history.push('/app/calendar')}
                            nearVisitsLoaded = {this.props.nearVisitsLoaded}
                            cancelAppByPatient = {this.props.cancelAppByPatient}
                        />
                    </Col>
                    <Col xs={14} xxl={8} className='section'>
                        <PatientAnalyzes data={
                            [{
                                comeDate: true,
                                analyzesDate: "10 января",
                                analyzesType: "blood",
                                analyzesText: "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)",
                            }, {
                                analyzesDate: "10 января",
                                analyzesType: "ultrasound",
                                analyzesText: "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)",
                            }, {
                                analyzesDate: "10 января",
                                analyzesType: "heart",
                                analyzesText: "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)",
                            }, {
                                analyzesDate: "10 января",
                                analyzesType: "heart",
                                analyzesText: "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)",
                            }, {
                                analyzesDate: "10 января",
                                analyzesType: "heart",
                                analyzesText: "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)",
                            }]
                        }/>
                    </Col>
                    <Col xs={10} xxl={10} className='section'>
                        <PatientDoctor
                            data = {this.props.doctors}
                            onGoto={this.gotoHandler}
                            redirect={() => this.props.history.push('/app/doctors')}
                            intervals={this.props.intervals}
                            onGetAllDocIntervals={this.props.onGetAllDocIntervals}
                            onGetIntervalForDate={this.props.onGetIntervalForDate}
                            availableIntervals={this.props.availableIntervals}
                            isUser={true}
                            onAddVisit = {this.props.onAddVisit}
                            isReceptionRecorded={this.props.isReceptionRecorded}
                            receptionRecordedID={this.props.receptionRecordedID}
                            myDoctorsLoaded={this.props.myDoctorsLoaded}
                        />
                    </Col>
                    <Col xs={14} xxl={24} className='section'>
                    <TreatmentTable
                        isUser={this.props.isUser}
                        redirect={() => this.props.history.push('/app/treatment')}
                        data={this.props.completedApps ? this.props.completedApps.result : []}
                        dataCount = {this.props.completedApps ? this.props.completedApps.count : 0}
                        onGoto={this.gotoHandler}
                        onGotoChat={(id) => console.log(id)}
                        getCompletedApps ={this.props.getCompletedApps}
                        onSubmitReview={this.props.onSubmitReview}
                        makeArchiveOfFiles = {this.props.makeArchiveOfFiles}
                    />
                </Col>
                </Row>
               
    
            </Hoc>
            )
        
    }
}


export default geolocated()(PatientPage);
