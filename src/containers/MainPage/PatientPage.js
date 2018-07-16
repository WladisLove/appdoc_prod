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
                        data={[{
                            doctorName: "Тимошенко А.И.",
                            doctorSpecialty: "Терапевт",
                            dateDay: "12",
                            dateMonth: "января",
                            time: "16:00 - 16:20",
                        },
                            {
                                doctorName: "Тимошенко А.И.",
                                doctorSpecialty: "Терапевт",
                                dateDay: "12",
                                dateMonth: "января",
                                time: "16:00 - 16:20",
                            },
                            {
                                doctorName: "Тимошенко А.И.",
                                doctorSpecialty: "Терапевт",
                                dateDay: "12",
                                dateMonth: "января",
                                time: "16:00 - 16:20",
                            }]}
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
                        data={[{
                            doctorAvatar: "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3036143-poster-p-1-5-strategies-for-big-picture-thinking.png",
                            doctorName: "Тимошенко А.И.",
                            doctorSpecialty: "Терапевт",
                            doctorRate: 3,
                            doctorRank: "Доктор медицинских наук",
                            doctorCategory: "Первая категория",
                            doctorExp: "8 лет",
                        }, {
                            doctorAvatar: "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3036143-poster-p-1-5-strategies-for-big-picture-thinking.png",
                            doctorName: "Тимошенко А.И.",
                            doctorSpecialty: "Терапевт",
                            doctorRate: 3,
                            doctorRank: "Доктор медицинских наук",
                            doctorCategory: "Первая категория",
                            doctorExp: "8 лет",
                        }]}
                        onGoto={() => console.log('click')}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TreatmentTable
                        isUser={props.isUser}

                        data={[{
                            id: 1,
                            id_user: 2223,
                            status: "new",
                            name: "Иванова А. К.",
                            startDate: new Date(2017, 9, 14, 15).getTime() / 1000,
                            endDate: new Date(2017, 9, 14, 16).getTime() / 1000,
                            type: 'chat',
                            diagnostic: "Сахарный диабет",
                            comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                            price: "112 руб.",
                            conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                            conclusionDownloadName: "Заключение 252525.pdf",
                            conclusionDownloadLink: '#',
                            review: "Lorem ipsum dolor sit amet, consectetuer...",
                            rating: 3,
                        }, {
                            id: 3,
                            id_user: 2223,
                            status: "new",
                            name: "Иванова А. К.",
                            startDate: new Date(2017, 9, 15, 15).getTime() / 1000,
                            endDate: new Date(2017, 9, 15, 16).getTime() / 1000,
                            type: 'chat',
                            diagnostic: "Сахарный диабет",
                            comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                            price: "112 руб.",
                            conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                            conclusionDownloadName: "Заключение 252525.pdf",
                            review: "Lorem ipsum dolor sit amet, consectetuer...",
                        },
                        ]}
                        onGoto={(id) => console.log(id)}
                        onGotoChat={(id) => console.log(id)}/>
                </Col>
            </Row>
        </Hoc>
    )
}

export default PatientPage;