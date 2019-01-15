import React from 'react'

import Modal from '../Modal'
import Content from './content'
import { Translate } from 'react-localize-redux'
import { PropTypes } from 'prop-types';
import './styles.css'

const NewVisitModalPage = (props) => {
        const {visible, onCancel} = props;
        return (
            <Modal title={<Translate id="modal.title.makeAnReception" />}
                   visible={visible}
                   onCancel={onCancel}
            >
                <Content {...props}/>
            </Modal>
        )

};

NewVisitModalPage.propTypes = {
    visible: PropTypes.bool,
    patients: PropTypes.array,
    intervals: PropTypes.array,
    userName: PropTypes.string,
    availableIntervals: PropTypes.array,
    submitSuccess: PropTypes.bool,

    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onChangeDate: PropTypes.func,
};

NewVisitModalPage.defaultProps = {
    visible: false,
    patients: [],
    intervals: [],
    userName: '',
    availableIntervals: [],
    submitSuccess: true,

    onSave: () => {},
    onCancel: () => {},
    onChangeDate: () => {},
};

export default NewVisitModalPage;
