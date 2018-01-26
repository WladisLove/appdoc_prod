import React from 'react'

import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable } from 'appdoc-component'
import Hoc from '../../hoc'


import './styles.css'
import {dataArr, scheduleArr, treatmentArr, panelArr} from './mock-data'

class MainPage extends React.Component{

    render(){

        return (
                <Hoc>
					<Row className='section'>
						<Col span={24}>
							<TopPanel  data={panelArr}/>
						</Col>
					</Row>

					<Row className="section">
						<Col span={14}>
							<TableNoHead data={scheduleArr}/>
						</Col>
						<Col span={10}>
							<Reviews data={dataArr}/>
						</Col>
					</Row>
					<Row className="section">
						<Col span={24}>
							<TreatmentTable data={treatmentArr}/>
						</Col>
					</Row>
                </Hoc>
        )
    }
}

export default MainPage;
