import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import Modal from '../Modal'
import Content from './content'

import './styles.css'

const ReviewsModal = (props) => {
    const {visible} = props;

    return (
        <Modal title={<Translate id="modal.title.reviewOnReception" />}
               visible={visible}
               onCancel={props.onCancel}
               afterClose={props.afterClose}
        >
            <Content {...props}/>
        </Modal>
    )
};

ReviewsModal.propTypes = {
    visible: PropTypes.bool,
    limit: PropTypes.number,
    rangeSet:
        PropTypes.arrayOf(PropTypes.shape({
            defaultStartValue: PropTypes.object,
            placeholderStart: PropTypes.string,
            defaultEndValue: PropTypes.object,
            placeholderEnd: PropTypes.string,
        })),
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

ReviewsModal.defaultProps = {
    visible: false,
    limit: 5,
    rangeSet: [],
    onSave: () => {},
    onCancel: () => {}
};

export default ReviewsModal;
