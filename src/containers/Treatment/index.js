import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux';

import { Icon, Row, Col, HistoryReceptions, HistoryReceptionsTabs } from 'appdoc-component'

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Treatment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            treatments: [],
        }
    }

    componentDidMount(){
        console.log('here');
        this.props.onGetTreatments();
        /*axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/2732')
            .then(rez => {
                console.log(rez);
                this.setState({treatments: rez.data})
            })
            .catch(err => console.log(err))*/
    }

    render(){
        console.log(this.state)


        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
            			<HistoryReceptionsTabs data={this.props.treatments}/>
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
		treatments: state.treatments.treatments,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetTreatments: () => dispatch(actions.getAllTreatments()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);