import React from 'react'
import { Row, Col, TopPanel, TableNoHead, Reviews, TreatmentTable, NewVisitModal, CancelVisitModal } from 'appdoc-component'
import Hoc from '../../hoc'

const DoctorPage = props => {

    const gotoHandler = (id) => {
		props.onSelectPatient(id);
		props.history.push('/patient'+id);
	}

    return (
        <Hoc>
					<Row>
						<Col span={24} className='section'>
							<TopPanel  {...props.docTodayInfo}/>
						</Col>
					</Row>

					<Row>
						<Col xs={24} xxl={14} className='section'>
							<TableNoHead data={props.visits}
										onGoto={(val) => gotoHandler(val)}
										onBegin={(val) => {
											props.onSelectReception(val)
											props.history.push('/chat')
										}}
										onCancel={props.showCancel}
										onAdd = {props.onAdd}
							/>
						</Col>
						<Col xs={24} xxl={10} className='section'>
							<Reviews data={props.reviews}
									 numToDisplay = {7}
									 onGoto={(val) => gotoHandler(val)}
									 onGotoChat={(id) => {
                                        props.onSelectTretment(id);
                                        props.history.push('/chat');
                                    }}
									 redirect={() => {props.history.push('/reviews');}}/>
						</Col>
					</Row>
					<Row>
						<Col span={24} className='section'>
							<TreatmentTable data={props.actualTreatments}

											onGoto={(id) => gotoHandler(id)}
											onGotoChat = {(id) => {
                                                props.onSelectTretment(id);
												props.history.push('/chat');
											}}

											redirect={() => props.history.push('/treatment')}/>
						</Col>
					</Row>
					<NewVisitModal visible={props.addModal}
									date={new Date()}
									isChoosebleTime={true}
									patients={props.patients}
									onCancel={props.closeAdd}
									onSave = {(obj) => props.onSaveNewVisit(obj)}
					/>
					<CancelVisitModal visible={props.cancelModal} 
									onGoto={() => {}}
									onCancel={props.closeCancel}
									onSave={props.saveCancel}
					/>
                </Hoc>
    )
}

export default DoctorPage;