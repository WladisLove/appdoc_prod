import React from 'react'

import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable } from 'appdoc-component'
import Hoc from '../../hoc'


import './styles.css'
import {dataArr, scheduleArr, treatmentArr, panelArr} from './mock-data'

class MainPage extends React.Component{

    render(){

        return (
                <Hoc>
					<Row>
						<Col span={24} className='section'>
							<TopPanel  data={panelArr}/>
						</Col>
					</Row>

					<Row>
						<Col xs={24} xxl={14} className='section'>
							<TableNoHead data={scheduleArr}/>
						</Col>
						<Col xs={24} xxl={10} className='section'>
							<Reviews data={dataArr}/>
						</Col>
					</Row>
					<Row>
						<Col span={24} className='section'>
							<TreatmentTable data={treatmentArr}/>
						</Col>
					</Row>
                </Hoc>
        )
    }
}

export default MainPage;
