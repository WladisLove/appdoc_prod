import React from 'react';
import PropTypes from 'prop-types'

import MainReview from './MainReview'

import './style.css'
import '../../icon/style.css'

class Review extends React.Component{

    render(){
        const {fio} = this.props;
        let authorFIO = fio.split(' ');
        let author = authorFIO[0] + " ";

        for(let i = 1, len = authorFIO.length; i < len; i++){
            author = author + authorFIO[i].slice(0,1) + ". " 
        }

        return <MainReview {...this.props} author={author}/>;
    }
} 

Review.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id_zap: PropTypes.string,
    id_user: PropTypes.string,

    fio: PropTypes.string,
    comment: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    dateCommentDoc: PropTypes.string,
    makingAppDate: PropTypes.string,
    rating: PropTypes.string,
    commentDoc: PropTypes.string,

    avatar: PropTypes.string,
    online: PropTypes.bool,

    isSecondAllowed: PropTypes.bool,

    onSend: PropTypes.func,
    onTreatmentClick: PropTypes.func,
};

Review.defaultProps = {
    id: '0',
    id_zap: "0",
    id_user: "0",

    fio: '',
    comment: '',
    makingAppDate: '',
    rating: "0",
    commentDoc: "",

    isSecondAllowed: true,

    onSend: () => {},
    onTreatmentClick: () => {},
};

export default Review