import React from 'react'

import { Layout } from 'antd'
// const { Content } = Layout;
import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable } from 'appdoc-component'
import Hoc from '../../hoc'


import './styles.css'
import {dataArr, scheduleArr, treatmentArr} from './mock-data'

class MainPage extends React.Component{

    render(){

        return (
                <Hoc>
					<Row className='section'>
						<div className='topPanel'>
							<Col span={6}>
									<TopPanelItem
										className='first-col'
										panelTitle="10 сентября 2017"
                      					panelText="Вторник  13:25"
										svg
										icon='calendar'
									>
									</TopPanelItem>
							</Col>

							<Col span={6}>
									<TopPanelItem
										panelTitle="Приемы сегодня"
										panelText="12"
										icon='info'
									>
									</TopPanelItem>
							</Col>

							<Col span={6}>
									<TopPanelItem
											panelTitle="Актуальные обращения"
											panelText="2"
											svg
											icon='clock'
									>
									</TopPanelItem>
							</Col>

							<Col span={6}>
									<TopPanelItem
										panelTitle="Мои пациенты"
										panelText="37"
										icon='user'
									>
									</TopPanelItem>
							</Col>
						</div>
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