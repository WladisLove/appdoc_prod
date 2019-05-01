import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'


const NewPaymentForm = (props) => {

    return (
        <Modal title='Оплата'
            visible={props.visible}
            onCancel={props.onCancel}
        >
            <Content {...props} />
        </Modal>
    )

}

NewPaymentForm.propTypes = {
};

NewPaymentForm.defaultProps = {
};

export default NewPaymentForm;