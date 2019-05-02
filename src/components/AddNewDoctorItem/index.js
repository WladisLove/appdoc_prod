import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import ProfileAvatar from '../ProfileAvatar'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'

class AddNewDoctorItem extends React.Component{

    onAddHandler = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onAdd(this.props.id);
    };

    render(){
        const { name, age, avatar, online, isSearchItem} = this.props;
        const rootClass = cn('new-doctor-item');

        return (
            <div className='new-doctor-item' onClick={() => this.props.onGoto(this.props.id)}>
                <div className='new-doctor-avatar'>
                    <ProfileAvatar owner="doctor" online={online} img={avatar} size='small'/>
                </div>
                <div className='new-doctor-info'>
                    <div className='new-doctor-name'>{name}</div>
                    <div className='new-doctor-age'>{age} <Translate id="yearsOld" /></div>
                </div>
                {
                    !isSearchItem && <div className='doctor-btn'>
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

AddNewDoctorItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.string,
    online: PropTypes.bool,
    isSearchItem: PropTypes.bool,
    onAdd: PropTypes.func,
};

AddNewDoctorItem.defaultProps = {
    id: 0,
    name: '',
    age: '',
    online: false,
    avatar: '',
    isSearchItem: false,
    onAdd: () => {},
};

export default AddNewDoctorItem
