import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'

import './styles.css'

const CompletionAdmission = (props) => {
    const {visible} = props;

    return (
        <Modal title={<Translate id="modal.title.completeReception" />}
               visible={visible}
               onCancel={props.onCancel}
        >
            <Content {...props}/>
        </Modal>
    )
};

CompletionAdmission.propTypes = {
    visible: PropTypes.bool,
    limit: PropTypes.number,
    rangeSet: PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    }),
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

CompletionAdmission.defaultProps = {
    visible: false,
    limit: 5,
    rangeSet: [],
    onSave: () => {},
    onCancel: () => {}
};

export default CompletionAdmission;
