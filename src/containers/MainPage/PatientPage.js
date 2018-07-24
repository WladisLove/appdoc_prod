import React from 'react'
import Hoc from '../../hoc'
import Row from "../../components/Row";
import Col from "../../components/Col";
import PatientNearRecord from "../../components/PatientNearRecord";
import PatientAnalyzes from "../../components/PatientAnalyzes";
import PatientDoctor from "../../components/PatientDoctor";
import TopPanelPatient from "../../components/TopPanelPatient";
import TreatmentTable from "../../components/TreatmentTable";
const PatientPage = props => {
    {console.log(props)}
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
                    />
                </Col>
                <Col xs={14} xxl={8} className='section'>
                    <PatientAnalyzes data={[{
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
                    }]}/>
                </Col>
                <Col xs={24} xxl={10} className='section'>
                    <PatientDoctor
                        data = {props.doctors}
                        onGoto={() => console.log('click')}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TreatmentTable
                        isUser={props.isUser}

                        data={props.completedTreatments}
                        onGoto={(id) => console.log(id)}
                        onGotoChat={(id) => console.log(id)}/>
                </Col>
            </Row>
        </Hoc>
    )
}

export default PatientPage;