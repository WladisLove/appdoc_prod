import React from 'react'
import { Icon, Row, Col, HistoryReceptionsTabs } from 'appdoc-component'
import Hoc from '../../hoc'

import {historyArr} from './mock-data'
import './styles.css'


class Treatment extends React.Component{

    render(){


        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
            			<HistoryReceptionsTabs data={historyArr}/>
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Treatment;