import React from 'react'
import {connect} from 'react-redux';
import {message} from "antd"
import Row from "../../components/Row";
import Col from "../../components/Col";
import ReviewsTree from "../../components/ReviewsTree";
import RateIndicator from "../../components/RateIndicator";
import Hoc from '../../hoc'
import { Translate } from 'react-localize-redux'

import * as actions from '../../store/actions'

import './styles.css'


class Reviews extends React.Component{

	gotoHandler = (id) => {
	    if(this.props.isDoctor) {
            this.props.onSelectPatient(id);
            this.props.history.push('/app/patient'+id);
        } else {
            this.props.history.push('/app/doctor'+id);
        }

	};


    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "NEXT PROPS REVIEW")
    }

    render() {
        const reviews = this.props.isDoctor ? this.props.reviews : this.props.reviewsByPatient;
        const reviewsLoadCount = 3;

        return (

            <Hoc>
                <Row>
                    <Col span={24}>
                        <h1 className='page-title'>{this.props.isDoctor ? <Translate id="review.patients" /> : <Translate id="review.my" />}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} xxl={16} className='section'>
                        <ReviewsTree data={reviews}
                                     limit={reviewsLoadCount}
                                     numberOfReviews={this.props.commentCount}
                                     onLoad={this.props.isDoctor ?
										 this.props.onGetAllReviews : this.props.onGetAllReviewsByPatient}
                                     onSend={this.props.onSendAnswer}
                                     onGoto={(val) => this.gotoHandler(val)}
                                     onGotoChat={(id) => {
                                         this.props.onSelectTretment(id);
                                         this.props.history.push('/app/chat');

                                     }}
									 isDoctor={this.props.isDoctor}
                        />
                    </Col>
                    {this.props.isDoctor && <Col xs={24} xxl={8} className='section'>
                        <RateIndicator rateValue={this.props.ratingAll} reviewsNum={this.props.commentCount}/>
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
		commentCount: state.reviews.commentCount,
		isDoctor: state.auth.mode !== "user",
		reviewsByPatient: state.reviews.reviewsByPatient,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAllReviews: (numberOfRequest, reviewsLoadCount, dateStart, dateEnd) =>
			dispatch(actions.getAllReviews(numberOfRequest, reviewsLoadCount, dateStart, dateEnd)),
		onSendAnswer: (answer) => dispatch(actions.putCommentAnswer(answer)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onSelectTretment: (id) => dispatch(actions.selectTreatment(id)),
        onGetAllReviewsByPatient: (numberOfRequest, reviewsLoadCount, dateStart, dateEnd) =>
            dispatch(actions.getAllReviewsByPatient(numberOfRequest, reviewsLoadCount, dateStart, dateEnd)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
