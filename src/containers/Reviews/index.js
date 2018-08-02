import React from 'react'
import {connect} from 'react-redux';

import Row from "../../components/Row";
import Col from "../../components/Col";
import ReviewsTree from "../../components/ReviewsTree";
import RateIndicator from "../../components/RateIndicator";
import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Reviews extends React.Component{

	componentDidMount(){
		this.props.isDoctor ? this.props.onGetAllReviews() : this.props.onGetAllReviewsByPatient();
	}

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patient'+id);
	}

    render(){
		 const reviews = this.props.isDoctor ? this.props.reviews : this.props.reviewsByPatient;
		console.log(reviews)

        return (

            <Hoc>
                <Row>
                    <Col span={24}>
                        <h1 className='page-title'>{this.props.isDoctor ? "Отзывы пациентов" : "Мои отзывы"}</h1>
                    </Col>
                </Row>
            	<Row>
            		<Col xs={24} xxl={16} className='section'>
							<ReviewsTree data={reviews} 
										limit={7} 
										onSend = {obj => this.props.onSendAnswer(obj)}
										onGoto={(val) => this.gotoHandler(val)}
										onGotoChat={(id) => this.props.history.push('/chat')}

							/>
					</Col>
					{this.props.isDoctor && <Col xs={24} xxl={8} className='section'>
						<RateIndicator rateValue={this.props.ratingAll} reviewsNum={reviews.length}/>
					</Col>}
            	</Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
		reviews: state.reviews.reviews,
		ratingAll: state.reviews.ratingAll,
		isDoctor: state.auth.mode !== "user",
		reviewsByPatient: state.reviews.reviewsByPatient
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAllReviews: () => dispatch(actions.getAllReviews()),
		onSendAnswer: (answer) => dispatch(actions.putCommentAnswer(answer)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onGetAllReviewsByPatient: (pagination) => dispatch(actions.getAllReviewsByPatient(pagination))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);