import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import Modal from '../Modal'
import Content from './content'
import './styles.css'

const ReportBugModal = (props) => {
    const {visible, onCancel} = props;
    return (
        <Modal title={<Translate id="modal.title.errorReport" />}
               visible={visible}
               onCancel={onCancel}
        >
            <Content {...props}/>
        </Modal>
    )
};

ReportBugModal.propTypes = {
    visible: PropTypes.bool,
    userName: PropTypes.string,
    onCancel: PropTypes.func,
    onSend: PropTypes.func,
};

ReportBugModal.defaultProps = {
    visible: false,
    onCancel: () => {},
    onSend: () => {},
};

export default ReportBugModal;
