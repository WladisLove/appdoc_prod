import React from 'react'

import Modal from '../Modal'
import Content from './content'
import './styles.css'
import { PropTypes } from 'prop-types';

const NewVisitModalPage = (props) => {
        const {visible, onCancel} = props;
        return (
            <Modal title='Запись на прием'
                   visible={visible}
                   onCancel={onCancel}
            >
                <Content {...props}/>
            </Modal>
        )

};

NewVisitModalPage.propTypes = {
    visible: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    patients: PropTypes.array,
    intervals: PropTypes.array,
    userName: PropTypes.string,
    availableIntervals: PropTypes.array,

    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onChangeDate: PropTypes.func,
};

NewVisitModalPage.defaultProps = {
    visible: false,
    date: null,
    patients: [],
    intervals: [],
    userName: '',
    availableIntervals: [],

    onSave: () => {},
    onCancel: () => {},
    onChangeDate: () => {},
};

export default NewVisitModalPage;