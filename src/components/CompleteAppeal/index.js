import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Button from '../Button'
import { Translate } from 'react-localize-redux'

import './styles.css'

const CompleteAppealModal = (props) => {

    const {visible, onCancel, onAdd, onComplete} = props;

    return (
        <Modal title={<Translate id="modal.title.completeTreatment" />}
               visible={visible}
               onCancel={onCancel}
        >
            <div>
                <Translate>
                    {({ translate }) =>
                        (<div className='completeAppealModal'>
                            <Button btnText={translate('button.title.add')}
                                    onClick={onAdd}
                                    size='default'
                                    type='float'
                                    icon='form'/>
                            <br/>
                            <Button btnText={translate('button.title.treatmentComplete')}
                                    onClick={onComplete}
                                    size='default'
                                    type='yellow'/>
                        </div>)
                    }
                </Translate>
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
