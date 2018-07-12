import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import ProfileAvatar from '../ProfileAvatar'


import './style.css'
import '../../icon/style.css'

class AddNewPatientItem extends React.Component{

    onAddHandler = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onAdd(this.props.id);
    }

    render(){
        const { name, age, avatar, online, isSearchItem} = this.props;
        const rootClass = cn('new-patient-item');

        return (
            <div className='new-patient-item' onClick={() => this.props.onGoto(this.props.id)}>
                <div className='new-patient-avatar'>
                    <ProfileAvatar owner="patient" online={online} img={avatar} size='small'/>
                </div>
                <div className='new-patient-info'>
                    <div className='new-patient-name'>{name}</div>
                    <div className='new-patient-age'>{age} лет</div>
                </div>
                {
                    !isSearchItem && <div className='new-patient-btn'>
                        <Button
                            btnText=''
                            onClick={(e) => this.onAddHandler(e)}
                            size='file'
                            type='file'
                            icon='add-button'
                            svg
                        />
                    </div>
                }
            </div>
        )
    }
}

AddNewPatientItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.string,
    online: PropTypes.bool,
    isSearchItem: PropTypes.bool,
    onAdd: PropTypes.func,
};

AddNewPatientItem.defaultProps = {
    id: 0,
    name: '',
    age: '',
    online: false,
    avatar: '',
    isSearchItem: false,
    onAdd: () => {},
};

export default AddNewPatientItem