import React from 'react'
import Row from "../../components/Row";
import Col from "../../components/Col";
import TopPanel from "../../components/TopPanel";
import Reviews from "../../components/Reviews";
import TreatmentTable from "../../components/TreatmentTable";
import NewVisitModal from "../../components/NewVisitModal";
import TableNoHead from "../../components/TableNoHead";
import CancelVisitModal from "../../components/CancelVisitModal";

import Hoc from '../../hoc'
import HistoryReceptionsTabs from "../../components/HistoryReceptionsTabs";

const DoctorPage = 	props => {

    const gotoHandler = (id) => {
		props.onSelectPatient(id);
		props.history.push('/app/patient'+id);
	}
    return (
        <Hoc>
					<Row className="section-panel">
						<Col xs={24} xxl={24} className='section'>
							<TopPanel  {...props.docTodayInfo}/>
						</Col>
					</Row>

					<Row>
						<Col xs={12} xxl={14} className='section'>
							<TableNoHead data={props.visits}
										onGoto={(val) => gotoHandler(val)}
										onBegin={(val) => {
											props.onSelectReception(val)
											props.history.push('/app/chat')
										}}
										onCancel={props.showCancel}
										onAdd = {props.onAdd}
										getStatusUser={props.getStatusUser}
							/>
						</Col>
						<Col xs={12} xxl={10} className='section'>
							<Reviews data={props.reviews}
									 numToDisplay = {7}
									 onGoto={(val) => gotoHandler(val)}
									 onGotoChat={(id) => {
                                        props.onSelectTretment(id);
                                        props.history.push('/app/chat');
                                    }}
									 isDoctor={true}
									 redirect={() => {props.history.push('/app/reviews');}}/>
						</Col>
					
					
						<Col xs={24} xxl={24} className='section'>
							<TreatmentTable data={props.actualTreatments}
											dataCount = {props.treatmentsCount}
											onGoto={(id) => gotoHandler(id)}
											onGotoChat = {(id) => {
                                                props.onSelectTretment(id);
												props.history.push('/app/chat');
											}}
                                            getCompletedApps ={props.getCompletedApps}
                                            onSubmitReview={props.onSubmitReview}
											redirect={() => props.history.push('/app/treatment')}
                                            addConclusion = {props.addConclusion}
                                            makeArchiveOfFiles = {props.makeArchiveOfFiles}



                            />
						</Col>
					</Row>
					<NewVisitModal visible={props.addModal}
									date={new Date()}
									isChoosebleTime={true}
								    intervals={props.intervals}
									patients={props.patients}
									onCancel={props.closeAdd}
									onSave = {props.onSaveNewVisit}
					/>
					<CancelVisitModal visible={props.cancelModal}
									onGoto={() => {}}
									onCancel={props.closeCancel}
									onSave={props.saveCancel}
								  	singleCancel={true}
								  	appIdToCancel={props.appIdToCancel}
					/>
                </Hoc>
    )
}

export default DoctorPage;
