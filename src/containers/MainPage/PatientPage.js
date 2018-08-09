import React from 'react'
import Hoc from '../../hoc'
import {Row, Col,PatientNearRecord,PatientAnalyzes, PatientDoctor, TopPanelPatient,TreatmentTable, NewFreeVisitByPatient} from "appdoc-component"

const PatientPage = props => {
    return (
        <Hoc>
            <Row>
                <Col>
                    <TopPanelPatient
                        data={[
                            {
                                first: true,
                            }, {
                                className: "",
                                num: "35",
                                text: "возраст",
                            }, {
                                className: "",
                                num: "67",
                                text: "вес",
                            }, {
                                className: "",
                                num: "168",
                                text: "рост",
                            }, {
                                className: "",
                                num: "115/70",
                                text: "давление",
                            }, {
                                className: "",
                                num: "90",
                                text: "пульс",
                            },
                        ]}/>
                </Col>
            </Row>
            <Row>
                <Col xs={10} xxl={6} className='section' height={100}>
                    <PatientNearRecord
                        style={{height: 485}}
                        data={props.nearVisits}
                        onGoto={() => console.log('click')}
                        redirect={() => props.history.push('/calendar')}
                        nearVisitsLoaded = {props.nearVisitsLoaded}
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
                <Col xs={24} xxl={10} className='section'>
                    <PatientDoctor
                        data = {props.doctors}
                        onGoto={() => console.log('click')}
                        redirect={() => props.history.push('/doctors')}
                        intervals={props.intervals}
                        onGetAllDocIntervals={props.onGetAllDocIntervals}
                        onGetIntervalForDate={props.onGetIntervalForDate}
                        availableIntervals={props.availableIntervals}

                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TreatmentTable
                        isUser={props.isUser}
                        redirect={() => props.history.push('/treatment')}

                        data={props.completedTreatments}
                        onGoto={(id) => console.log(id)}
                        onGotoChat={(id) => console.log(id)}/>
                </Col>
            </Row>

        </Hoc>
    )
}

export default PatientPage;