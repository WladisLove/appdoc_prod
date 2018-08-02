import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import './styles.css'

const NewVisitModal = (props) => {
    
    return (
        <Modal title='Запись на прием'
               visible={props.visible}
               onCancel={props.onCancel}
                >
             <Content {...props}/>
        </Modal>
        )
    
}

NewVisitModal.propTypes = {
    visible: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    patients: PropTypes.array,
    isChoosebleTime: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

NewVisitModal.defaultProps = {
    visible: false,
    date: null,
    patients: [],
    isChoosebleTime: false,
    onSave: () => {},
    onCancel: () => {},
};

export default NewVisitModal;