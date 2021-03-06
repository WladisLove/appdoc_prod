import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'
import './styles.css'

const NewVisitByPatientModal = (props) => {

    return (
        <Modal title={<Translate id="modal.title.makeAnReception" />}
               visible={props.visible}
               onCancel={props.onCancel}
                >
             <Content {...props}/>
        </Modal>
        )

}

NewVisitByPatientModal.propTypes = {
    visible: PropTypes.bool,
    date: PropTypes.number,
    patients: PropTypes.array,
    isChoosebleTime: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

NewVisitByPatientModal.defaultProps = {
    visible: false,
    date: null,
    patients: [],
    isChoosebleTime: false,
    onSave: () => {},
    onCancel: () => {},
};

export default NewVisitByPatientModal;
