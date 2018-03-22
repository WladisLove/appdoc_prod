import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable, NewVisitModalPage } from 'appdoc-component'
import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'
import {dataArr, scheduleArr, treatmentArr, panelArr} from './mock-data'

class MainPage extends React.Component{

    render(){
		console.log(this.props.reviews);

		!this.props.reviews.length && this.props.onGetAllReviews();

        return (
                <Hoc>
					<Row>
						<Col span={24} className='section'>
							<TopPanel  {...panelArr}/>
						</Col>
					</Row>

					<Row>
						<Col xs={24} xxl={14} className='section'>
							<TableNoHead data={scheduleArr}/>
						</Col>
						<Col xs={24} xxl={10} className='section'>
							<Reviews data={this.props.reviews}
									 numToDisplay = {7}
									 redirect={() => this.props.history.push('/reviews')}/>
						</Col>
					</Row>
					<Row>
						<Col span={24} className='section'>
							<TreatmentTable data={treatmentArr}
											redirect={() => this.props.history.push('/treatment')}/>
						</Col>
					</Row>
					<NewVisitModalPage visible={false}/>
                </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviews.reviews,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllReviews: () => dispatch(actions.getAllReviews()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
