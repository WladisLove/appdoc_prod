import React from 'react'
import {connect} from 'react-redux';
import reqwest from 'reqwest';


import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable, NewVisitModal, CancelVisitModal } from 'appdoc-component'

import { Upload, Button, Input } from 'appdoc-component'

import Hoc from '../../hoc'
import {Form} from 'antd';
import axios from 'axios'

import * as actions from '../../store/actions'

import './styles.css'
import {dataArr, scheduleArr, treatmentArr, panelArr} from './mock-data'

const FormItem = Form.Item;

class ContentForm extends React.Component {
	state = {
		fileList: [],
		uploading: false,
	}

	handleUpload = () => {
		const { fileList } = this.state;
		//const formData = new FormData();
		let formData = {};
		console.log(fileList)

		fileList.forEach((file) => {
		  //formData.append('uploadfiles[]', file);
		  formData = {
			'uploadfiles[]': file,
		  }
		});
	
		this.setState({
		  uploading: true,
		});
		console.log(formData);
	
		// You can use any AJAX library you like
		reqwest({
		  url: 'http://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
		  method: 'post',
		  processData: false,
		  data: JSON.stringify(formData),
		  success: (res) => {
			this.setState({
			  fileList: [],
			  uploading: false,
			});
			console.log(res);
			alert('upload successfully.');
		  },
		  error: (err) => {
			this.setState({
			  uploading: false,
			});
			console.log(err);
			alert('upload failed.');
		  },
		});
	  }

    handleSubmit = (e) => {
		e.stopPropagation();
		  e.nativeEvent.stopImmediatePropagation();
		  e.preventDefault();
        let response = {
            file: this.props.form.getFieldValue('file') 
                ? this.props.form.getFieldValue('file').fileList 
                : [],
			id_zap: "12345",
			id_user: "54321"
		};
		console.log('eeeee', response);
		console.log(JSON.stringify(response))
		axios.post('http://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
                    JSON.stringify(response))
            .then(res => {
				console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };


    render() {
		const {getFieldDecorator} = this.props.form;
		
		const props = {
			action: 'http://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
			onRemove: (file) => {
			  this.setState(({ fileList }) => {
				const index = fileList.indexOf(file);
				const newFileList = fileList.slice();
				newFileList.splice(index, 1);
				return {
				  fileList: newFileList,
				};
			  });
			},
			beforeUpload: (file) => {
			  this.setState(({ fileList }) => ({
				fileList: [...fileList, file],
			  }));
			  return false;
			},
			fileList: this.state.fileList,
			onChange: () =>{
				console.log(this.state.fileList)
			}
		  };

        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('file')(
						<Upload 
							text="Go"
							name="uploadfiles"
							{...props}
							//action="http://178.172.235.105/~api/json/catalog.doc2/saveFilesChat"
							>
						</Upload>
                    )}
                </FormItem>
                <Button size='default'
                        btnText='Отправить'
						//htmlType="submit"
						onClick={this.handleUpload}
						//onClick={this.handleSubmit}
                        type='float'/>
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

class MainPage extends React.Component{
	state = {
		cancelModal: false,
		addModal: false,
	}

	componentDidMount(){
		this.props.reviews && !this.props.reviews.length && this.props.onGetAllReviews();
		this.props.onGetActualTreatments();
		let now = new Date();
		this.props.onGetTodayVisits(new Date(now.getFullYear(), now.getMonth(), now.getDate()),
										new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20));
		this.props.getDocTodayInfo();
	}

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}

	onAddVisit = () => {
		this.props.onGetDocPatients();
		this.setState({addModal: true});
		let now = new Date();
		this.props.onGetTodayVisits(new Date(now.getFullYear(), now.getMonth(), now.getDate()),
										new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20));
		this.props.getDocTodayInfo();
	}

	onSaveNewVisit = (obj) => {
        this.props.onAddNewVisit(obj);
        this.setState({
            addModal: false,
        })
	};
	
	/*shouldComponentUpdate(nextProps, nextState){
		return this.props.visits.length !== nextProps.visits.length
			|| this.props.docTodayInfo.receptionsToday !== nextProps.docTodayInfo.receptionsToday
			|| this.props.docTodayInfo.patients !== nextProps.docTodayInfo.patients
			|| this.state.cancelModal !== nextState.cancelModal
			|| this.state.addModal !== nextState.addModal
			|| this.props.patients.length !== nextProps.patients.length;
	}*/

    render(){
        return (
                <Hoc>
					<Row>
						<Col span={24} className='section'>
							{/*<TopPanel  {...this.props.docTodayInfo}/>*/}
<div>
			<Content/>
</div>

							
						</Col>
					</Row>

					<Row>
						<Col xs={24} xxl={14} className='section'>
							<TableNoHead data={this.props.visits}
										onGoto={(val) => this.gotoHandler(val)}
										onBegin={() => this.props.history.push('/chat')}
										onCancel={() => {this.setState({cancelModal: true})}}
										onAdd = {this.onAddVisit}
							/>
						</Col>
						<Col xs={24} xxl={10} className='section'>
							<Reviews data={this.props.reviews}
									 numToDisplay = {7}
									 onGoto={(val) => this.gotoHandler(val)}
									 onGotoChat={(id) => this.props.history.push('/chat')}
									 redirect={() => this.props.history.push('/reviews')}/>
						</Col>
					</Row>
					<Row>
						<Col span={24} className='section'>
							<TreatmentTable data={this.props.actualTreatments}

											onGoto={(id) => this.gotoHandler(id)}
											onGotoChat = {(id) => this.props.history.push('/chat')}

											redirect={() => this.props.history.push('/treatment')}/>
						</Col>
					</Row>
					<NewVisitModal visible={this.state.addModal}
									date={new Date()}
									isChoosebleTime={true}
									patients={this.props.patients}
									onCancel={() => {this.setState({addModal: false})}}
									onSave = {(obj) => this.onSaveNewVisit(obj)}
					/>
					<CancelVisitModal visible={this.state.cancelModal} 
									onGoto={() => {}}
									onCancel={() => {this.setState({cancelModal: false})}}
									onSave={() => {this.setState({cancelModal: false})}}
					/>
                </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
		patients: state.patients.docPatients,
		visits: state.schedules.visits,
		reviews: state.reviews.reviews,
		actualTreatments: state.treatments.actualTreatments,
		docTodayInfo: state.doctor.todayInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
		onGetDocPatients: () => dispatch(actions.getDocPatients()),
		onAddNewVisit: (obj) => dispatch(actions.addVisit(obj)),

		onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
		onGetAllReviews: () => dispatch(actions.getAllReviews()),
		onGetActualTreatments: () => dispatch(actions.getActualTreatments()),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		getDocTodayInfo: () => dispatch(actions.getDocTodayInfo()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
