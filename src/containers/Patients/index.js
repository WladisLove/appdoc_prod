import React from 'react'
import {connect} from 'react-redux';
import moment from 'moment'
import Row from "../../components/Row";
import Col from "../../components/Col";
import PatientTable from "../../components/PatientTable";
import AddNewPatient from "../../components/AddNewPatient";
import NewMessageModal from "../../components/NewMessageModal";
import NewVisitModalPage from "../../components/NewVisitModalPage";

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css';

class Patients extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addNew_show: false,
            modal1Visible: false,
            modal2Visible: false,
			id: null,
			name: ""
        }
    }

    setModal1Visible = (modal1Visible, id, name)=> {
        this.setState({modal1Visible, id, name,
			isReceptionRecorded: false});
        if (modal1Visible) this.props.onGetAllDocIntervals();
    };


    setModal2Visible = (modal2Visible, id, name) => {
        this.setState({modal2Visible, id, name});
    };

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patient'+id);
	};

	componentDidMount(){
		this.props.onGetDocPatients();
	}

	showModalHandler = () => {
		this.setState({addNew_show: true});
	};

    render(){
        return (
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'>Мои пациенты</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
						<PatientTable countPatient='9'
										data={this.props.docPatients}
										onSearch = {(val) => console.log(val)}
										onAdd = {this.showModalHandler}
										onGoto={(id) => this.gotoHandler(id)}
										onNewVisit={(val) => console.log(val)}
										onNewMessage = {(val) => this.props.onSendMessage(val)}
										onDelete = {(val) => this.props.removePatient(val)}
                                        setModal1Visible = {this.setModal1Visible}
                                        setModal2Visible = {this.setModal2Visible}
										/>
            		</Col>
            	</Row>
				<AddNewPatient
                    data={this.props.notDocPatients}
                    visible={this.state.addNew_show}
                    onCancel={() => {
                        this.setState({addNew_show: false});
                        this.props.onClearNotDocPatients();
                    }}
                    onSearch = {(name) => this.props.onGetNotDocPatients(name)}
                    onAdd={(id)=>this.props.addPatient(id)}

                />

                <NewVisitModalPage
                    visible={this.state.modal1Visible}
                    onSave={(a) => {
                        this.props.onSaveReception(a)
                    }}
					isDateInvalid = {this.props.isReceptionRecorded}
                    onCancel={() => this.setModal1Visible(false)}
                    userName={this.state.name}
                    intervals={this.props.intervals}
                    onChangeDate={this.props.onGetIntervalForDate}
                    availableIntervals={this.props.availableIntervals}
                    id={this.state.id}
                    isReceptionRecorded = {this.props.isReceptionRecorded}
                    setModal1Visible = {this.setModal1Visible}
                />

                <NewMessageModal
                     visible={this.state.modal2Visible}
                     onSend={(a) => {
                         this.setModal2Visible(false);
                         this.props.onNewMessage(a)
                     }}
                     onCancel={() => this.setModal2Visible(false)}
                     userName={this.state.name}
                     id={this.state.id}
                />

            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
		docPatients: state.patients.docPatients,
		notDocPatients: state.patients.notDocPatients,
		intervals: state.patients.intervals,
		isReceptionRecorded: state.patients.isReceptionRecorded,
		availableIntervals: state.profileDoctor.workIntervals
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetDocPatients: () => dispatch(actions.getDocPatients()),
		onGetNotDocPatients: (name) => dispatch(actions.getNotDocPatients(name)),
		onClearNotDocPatients: () => dispatch(actions.clearNotDocPatients()),
		addPatient: (id, name) => dispatch(actions.addPatient(id, name)),
		removePatient: (id_user, id_doctor) => dispatch(actions.removePatient(id_user, id_doctor)),
		onSendMessage: (message) => dispatch(actions.sendMessage(message)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		onGetIntervalForDate: (beginDay, endDay) => dispatch(actions.getDateIntervalWithoutMakingApp(beginDay, endDay)),
        onSaveReception: (reception) => dispatch(actions.setReception(reception)),
		onGetAllDocIntervals: (id) => dispatch(actions.getAllDocIntervals(id))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
