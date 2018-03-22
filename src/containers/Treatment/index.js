import React from 'react'
import axios from 'axios'
import { Icon, Row, Col, HistoryReceptions, HistoryReceptionsTabs } from 'appdoc-component'

import Hoc from '../../hoc'

import {historyArr} from './mock-data'
import './styles.css'


class Treatment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            treatments: [],
        }
    }

    componentDidMount(){
        console.log('here')
        axios.get('http://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/2732')
            .then(rez => {
                console.log(rez);
                this.setState({treatments: rez.data})
            })
            .catch(err => console.log(err))
    }

    render(){
        console.log(this.state)


        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
            			<HistoryReceptionsTabs data={this.state.treatments}/>
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Treatment;