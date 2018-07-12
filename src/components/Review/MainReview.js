import React from 'react';
import moment from 'moment'

import ProfileAvatar from '../ProfileAvatar'
import Rate from '../Rate'
import Button from '../Button'
import SecondaryReview from './SecondaryReview'
import AnswerArea from './AnswerArea'

import {dateToString} from '../../helpers/prepareDate'

class MainReview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showComment: false,
            showAnswerArea: false, // TO FIX -> false
        }
    }

    showComment = () => {
        this.setState(prev => ({showComment:!this.state.showComment}));
    };

    showAnswArea = () => {
        this.setState(prev => ({showAnswerArea:!this.state.showAnswerArea}));
    };

    answAreaHandler = (message) => {
        this.setState(prev => ({showAnswerArea:false}));
        this.props.onSend({
            id: this.props.id,
            message
        });
    };

    render(){

        const {author, 
            avatar, 
            date, 
            dateCommentDoc, 
            online, 
            comment, 
            rating, 
            makingAppDate, 
            commentDoc, 
            isSecondAllowed,
            onTreatmentClick} = this.props;
        let treatment = `Обращение от ${(moment.unix(+makingAppDate)).format('DD.MM.YYYY')}`;
        let time = dateToString(new Date(+date));

        const commentDisplay = this.state.showComment ? 'block' : 'none';
        const answAreaDisplay = this.state.showAnswerArea ? 'block' : 'none';

        return (
            <div className='review-root'>
                <div className='review'>
                <ProfileAvatar owner="patient" 
                                img={avatar} 
                                online={online} 
                                size='small'/>
                <div className="patient-info">
                    <div className="flex-row">
                        <div className="patient-name go-to"
                            onClick={()=>this.props.onGoto(this.props.id_user)}
                        >
                            {author}
                        </div>

                        <div className="patient-time">{time}</div>
                        <Rate disabled defaultValue={+rating}/>
                    </div>
                    <div className="flex-row">
                        <div className="patient-text">{comment}</div>
                    </div>
                    <Button
                        btnText={treatment}
                        size='go'
                        iconSize={16}
                        type='go'
                        icon='circle_arrow_right'
                        svg
                        onClick={()=>this.props.onGotoChat(this.props.id_zap)}
                    />
                </div>
                <div className="review-answerBtn">
                    {
                        isSecondAllowed && (commentDoc ?
                            <Button btnText={this.state.showComment ? 'Скрыть ответ' : 'Посмотреть ответ'}
                                    size='file'
                                    type='file'
                                    icon={this.state.showComment ? 'circle_arrow_up' : 'circle_arrow_down'}
                                    svg
                                    onClick={this.showComment}
                            />
                            :
                            (!commentDoc && !this.state.showAnswerArea &&
                                <Button onClick={this.showAnswArea}
                                        btnText='Ответить'
                                        size='mini'
                                        type='blue'
                                        className='review-answerBtn-answer'/>))
                    }
                </div>
                </div>
                <div className="review-root-comment" style={{display: commentDisplay}}>
                    {commentDoc && <SecondaryReview date={+dateCommentDoc} text={commentDoc}/>}
                </div>
                <div className="review-root-answerArea" style={{display: answAreaDisplay}}>
                    { !commentDoc && <AnswerArea onSend={message => this.answAreaHandler(message)}/>}
                </div>
            </div>
        )
    }
}

export default MainReview