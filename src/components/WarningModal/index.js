import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import Modal from '../Modal'
import Button from '../Button'
import './styles.css'

const WarningModal = (props) => {

    const {visible, message, onClick} = props;

    return (
        <Modal title={<Translate id="modal.title.attention" />}
                warning = {true}
                visible={visible}>
            <div className="root">
                {message}
                <div className="root-btn">
                        <Button size='default' type='float' btnText='ок' onClick={onClick}/>
                </div>
            </div>
        </Modal>
        )
}

WarningModal.propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.string,
    onClick: PropTypes.func,
};

WarningModal.defaultProps = {
    visible: false,
    message: '',
    onClick: () => {},
};

export default WarningModal;
