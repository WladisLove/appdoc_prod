import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import './styles.css'

const NewVisitTypeModal = (props) => {
    
    return (
        <Modal visible={props.visible}
               onCancel={props.onCancel}
               className="newVisitTypeModal"
                >
             <Content {...props}/>
        </Modal>
        )
    
}

NewVisitTypeModal.propTypes = {
    visible: PropTypes.bool,
    onFree: PropTypes.func,
    onPay: PropTypes.func,
    onCancel: PropTypes.func,
};

NewVisitTypeModal.defaultProps = {
    visible: false,
    onFree: () => {},
    onPay: () => {},
    onCancel: () => {},
};

export default NewVisitTypeModal;