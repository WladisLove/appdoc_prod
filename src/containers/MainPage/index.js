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
								<div className='flexCol'>
									<TopPanelItem
										className='first-col'
										panelTitle="10 сентября 2017"
                      					panelText="Вторник  13:25"
										svg
										icon='calendar'
									>
									</TopPanelItem>
								</div>
							</Col>

							<Col span={6}>
								<div className='flexCol'>
									<TopPanelItem
										panelTitle="Приемы сегодня"
										panelText="12"
										icon='info'
									>
									</TopPanelItem>
								</div>
							</Col>

							<Col span={6}>
								<div className='flexCol'>
									<TopPanelItem
											panelTitle="Актуальные обращения"
											panelText="2"
											svg
											icon='clock'
									>
									</TopPanelItem>
								</div>
							</Col>

							<Col span={6}>
								<div className='flexCol'>
									<TopPanelItem
										panelTitle="Мои пациенты"
										panelText="37"
										icon='user'
									>
									</TopPanelItem>
								</div>
							</Col>
						</div>
					</Row>

					<Row className="section">
						<Col span={14} className='flexCol'>
							<TableNoHead data={scheduleArr}/>
						</Col>
						<Col span={10} className='flexCol'>
							<Reviews data={dataArr}/>
						</Col>
					</Row>
					<Row className="section">
						<Col span={24} className='flexCol'>
							<TreatmentTable data={treatmentArr}/>
						</Col>
					</Row>
                </Hoc>
        )
    }
}

export default MainPage;