import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Button from '../Button'
import './styles.css'

class WarningModal extends React.Component{

    render(){
        const {visible, message, onClick} = this.props;

        return (
            <Modal title='Внимание'
                   warning = {true}
                   visible={visible}
            >
                <div className="root">
                    {message}
                    <div className="root-btn">
                        <Button size='default' type='float' btnText='ок' onClick={onClick}/>
                    </div>
                </div>
            </Modal>
        )
    }
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

