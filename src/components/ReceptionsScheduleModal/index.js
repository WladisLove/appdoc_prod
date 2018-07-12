import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Content from './content'
import './styles.css'

const ReceptionsScheduleModal = (props) => {
    const {visible, onCancel} = props;

    return (
        <Modal title='График приемов'
               visible={visible}
               onCancel={onCancel}
        >
            <Content {...props}
            />
        </Modal> 
    )
};

ReceptionsScheduleModal.propTypes = {
    visible: PropTypes.bool,
    receptionLimit: PropTypes.number,
    callLimit: PropTypes.number,
    dateSet: PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    }),
    timeSetCall: PropTypes.arrayOf(PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    })),
    timeSetReception: PropTypes.arrayOf(PropTypes.shape({
        defaultStartValue: PropTypes.object,
        placeholderStart: PropTypes.string,
        defaultEndValue: PropTypes.object,
        placeholderEnd: PropTypes.string,
    })),
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    selOptions: PropTypes.array,
};

ReceptionsScheduleModal.defaultProps = {
    visible: false,
    receptionLimit: 5,
    callLimit: 5,
    dateSet: {},
    timeSetCall: [],
    timeSetReception: [],
    onSave: () => {},
    onCancel: () => {},
    selOptions: [],
};

export default ReceptionsScheduleModal;