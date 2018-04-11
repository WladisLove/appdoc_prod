import React from 'react'
import {connect} from 'react-redux';

import { Row, Col, ReviewsTree, RateIndicator } from 'appdoc-component'
import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Reviews extends React.Component{

	componentDidMount(){
		this.props.onGetAllReviews();
	}

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}

    render(){
		const {reviews} = this.props;

        return (

            <Hoc>
            	<Row>
            		<Col xs={24} xxl={16} className='section'>
							<ReviewsTree data={reviews} 
										limit={7} 
										onSend = {obj => this.props.onSendAnswer(obj)}
										onGoto={(val) => this.gotoHandler(val)}
										onGotoChat={(id) => this.props.history.push('/chat')}

							/>
					</Col>
					<Col xs={24} xxl={8} className='section'>
						<RateIndicator rateValue={4} reviewsNum={reviews.length}/>
					</Col>
            	</Row>
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
		onSendAnswer: (answer) => dispatch(actions.putCommentAnswer(answer)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);