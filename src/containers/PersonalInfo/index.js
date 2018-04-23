import React from 'react'

import { Icon, Row, Col, PersonalContact, PersonalEducation, PersonalExperience, PersonalInformation,WarningModal } from 'appdoc-component'
import Hoc from '../../hoc'
import './styles.css'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import{compileToClientDoctor, compileToServerDoctor} from './compilerDoc'




class PersonalInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.props.onGetInfoDoctor();
    };

    onVisible = () => {
      this.setState({visible:false}) ;
    };

    onSubmit = (profileDoctor) => {
        profileDoctor = compileToServerDoctor(profileDoctor);
        this.props.onSendNewInfoDoctor(profileDoctor);
        this.setState({visible:true}) ;
    };
    render(){
        let doctor = compileToClientDoctor(this.props.profileDoctor);

        return (

            <Hoc>
            	<Row>
            		<Col xs={24} xxl={18}>
            			<PersonalContact
                            profileDoctor={ doctor}
                            onSubmit ={this.onSubmit}
			            />
            		</Col>
            	</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
            			<PersonalEducation
                            profileDoctor={ doctor}
                            onSubmit ={this.onSubmit}
                        />
            		</Col>
            	</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
            			<PersonalExperience
                            profileDoctor={doctor}
                            onSubmit ={this.onSubmit}
                        />
            		</Col>
            	</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
            			<PersonalInformation
                            profileDoctor={doctor}
                            onSubmit ={this.onSubmit}
                        />
            		</Col>
            	</Row>
                <WarningModal visible={this.state.visible} onClick={this.onVisible}
                              message="Изменения всупят в силу после проверки администратором"/>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        profileDoctor: state.profileDoctor,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetInfoDoctor: () => dispatch(actions.getInfoDoctor()),
        onSendNewInfoDoctor: (info) => dispatch(actions.sendNewInfoDoctor(info))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
/*

export default PersonalInfo;*/
