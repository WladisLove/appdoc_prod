import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'
import './styles.css'

const TermsModal = (props) => {

    return (
        <Modal title={<Translate id="auth.userAgreement" />}
               visible={props.visible}
               onCancel={props.onCancel}
               width='90%'
               height='calc(100% - 200px)'
               >
             <Content {...props}/>
        </Modal>
        )

}

TermsModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

TermsModal.defaultProps = {
    visible: false,
    onCancel: () => {},
};

export default TermsModal;
