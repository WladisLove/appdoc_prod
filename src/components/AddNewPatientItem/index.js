import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import ProfileAvatar from '../ProfileAvatar'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'

class AddNewPatientItem extends React.Component{

    onAddHandler = (e, flag, translate) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        flag==="add" ? this.props.onAdd(this.props.id) :  this.props.onDelete(this.props.id, this.props.name, translate);
    }
    highlight = (text, higlight) => {
        let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return <span>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
    }
    render(){
        const { id, name, age, avatar, online, isSearchItem, usertype, academicdegree,
            academicstatus, category, specialitys, favorite, searchQuery, myDoctorsPage} = this.props;
        const isHideAddButton = this.props.isFavorite;

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className='new-patient-item' onClick={() => this.props.onGoto(this.props.id)}>
                        <div className='new-patient-avatar'>
                            <ProfileAvatar id={id} owner="patient" online={online} img={avatar} size='small'/>
                        </div>
                        <div className='new-patient-info'>
                            <div className='new-patient-name'>{this.highlight(name, searchQuery)}</div>
                            <div className='new-patient-age'>
                                {
                                    usertype === "doc" ?
                                        <span>
                                            {specialitys.length ? this.highlight(specialitys.join(". ") + ". ", searchQuery) : ""}
                                            {((academicdegree !== 'Нет степени') && academicdegree) ? academicdegree + ". " : ""}
                                            {((academicstatus !== 'Нет звания') && academicstatus) ? academicstatus + ". " : ""}
                                            {((category !== 'Нет категории') && category) ? category + ". " : ""}
                                        </span>
                                        : `${age} ${translate('yearsOld')}`
                                }
                            </div>
                        </div>
                        {
                            !isHideAddButton &&!isSearchItem && <div className='new-patient-btn'>
                                {!favorite ?
                                    <Button
                                        btnText=''
                                        onClick={(e) => this.onAddHandler(e, "add", translate)}
                                        size='file'
                                        type='file'
                                        icon='add-button'
                                        svg
                                    /> :
                                    <Button
                                        btnText=''
                                        onClick={(e) => this.onAddHandler(e, "delete", translate)}
                                        size='file'
                                        type='file'
                                        icon='empty'
                                        svg
                                    />
                                }
                            </div>
                        }
                    </div>)
                }
            </Translate>
        </div>)
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
    usertype: PropTypes.string
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
