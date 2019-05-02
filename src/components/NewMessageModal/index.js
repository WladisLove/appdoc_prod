import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import Modal from '../Modal'
import Content from './content'
import './styles.css'

const NewMessageModal = (props) => {
    const {visible, onCancel} = props;
    return (
        <Modal title={<Translate id="newMessage" />}
               visible={visible}
               onCancel={onCancel}
        >
            <Content {...props}/>
        </Modal>
    )
};

NewMessageModal.propTypes = {
    visible: PropTypes.bool,
    userName: PropTypes.string,
    onCancel: PropTypes.func,
    onSend: PropTypes.func,
};

NewMessageModal.defaultProps = {
    visible: false,
    userName: '',
    onCancel: () => {},
    onSend: () => {},
};

export default NewMessageModal;
