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

            <Layout.Content>
                <Hoc>
					<Row className='section top-panel'>
						<div className='topPanel'>
							<Col span={6} className='flexCol'>
								<TopPanelItem
									className='first-col'
									PanelTitle="10 сентября 2017"
									PanelText="Вторник  13:25"
									svg
									icon='calendar'
								>
								</TopPanelItem>
							</Col>

							<Col span={6} className='flexCol'>
								<TopPanelItem
								PanelTitle="Приемы сегодня"
								PanelText="12"
								icon='info'
								>
								</TopPanelItem>
							</Col>

							<Col span={6} className='flexCol'>
								<TopPanelItem
									PanelTitle="Актуальные обращения"
									PanelText="2"
									svg
									icon='clock'
								>
								</TopPanelItem>
							</Col>

							<Col span={6} className='flexCol'>
								<TopPanelItem
									PanelTitle="Мои пациенты"
									PanelText="37"
									icon='user'
								>
								</TopPanelItem>
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
            </Layout.Content>
        )
    }
}

export default MainPage;