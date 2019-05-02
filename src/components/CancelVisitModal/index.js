import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'

import './styles.css'

const CancelVisitModal = (props) => {
    const {visible} = props;

    return (
        <Modal title={<Translate id="modal.title.cancelReception" />}
               visible={visible}
               onCancel={props.onCancel}
        >
            <Content {...props}/>
        </Modal>
    )
};

CancelVisitModal.propTypes = {
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

CancelVisitModal.defaultProps = {
    visible: false,
    limit: 5,
    rangeSet: [],
    onSave: () => {},
    onCancel: () => {}
};

export default CancelVisitModal;
