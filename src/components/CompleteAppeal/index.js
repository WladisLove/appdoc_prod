import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Button from '../Button'
import './styles.css'

const CompleteAppealModal = (props) => {

    const {visible, onCancel, onAdd, onComplete} = props;

    return (
        <Modal title='Завершение обращения'
               visible={visible}
               onCancel={onCancel}
        >
            <div className='completeAppealModal'>
                <Button btnText="Добавить"
                        onClick={onAdd}
                        size='default'
                        type='float'
                        icon='form'/>
                <br/>
                <Button btnText="Завершить обращение"
                        onClick={onComplete}
                        size='default'
                        type='yellow'/>
            </div>
        </Modal>
    )
}

CompleteAppealModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func,
    onComplete: PropTypes.func,
};

CompleteAppealModal.defaultProps = {
    visible: false,
    onCancel: () => {},
    onAdd: () => {},
    onComplete: () => {},
};

export default CompleteAppealModal;