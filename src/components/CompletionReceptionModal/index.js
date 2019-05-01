import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'

import './styles.css'

const CompletionReceptionModal = (props) => {
    const {visible, onCancel} = props;

    return (
        <Modal title={<Translate id="modal.title.completeReception" />}
               visible={visible}
               onCancel={onCancel}
        >
            <Content {...props}/>
        </Modal>
    )

}

CompletionReceptionModal.propTypes = {
    visible: PropTypes.bool,
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
};

CompletionReceptionModal.defaultProps = {
    visible: false,
    onComplete: () => {},
    onCancel: () => {},
};

export default CompletionReceptionModal;
