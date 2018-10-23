import React from 'react'
import PropTypes from 'prop-types'

import ProfileAvatar from '../ProfileAvatar'

import './styles.css'

class ProfileCard extends React.Component{
    shouldComponentUpdate(nextProps) {
        return (
            (this.props.img !== nextProps.img) ||
            (this.props.name !== nextProps.name) ||
            (this.props.isShort !== nextProps.isShort)
        )
    }
    render(){
        const {short, name} = this.props;
        const rootClass = short ? "profileCard-short" : "profileCard";
        return (
            <div className={rootClass}>
                <ProfileAvatar owner="doctor" {...this.props} short={short} size={(short ? 'medium' : 'large')}/>
                <div className={'doctorProfileCard-name'}>{name}</div>
            </div>
        )
    }
}

ProfileCard.propTypes = {
    name: PropTypes.string,
    short: PropTypes.bool,
};

ProfileCard.defaultProps = {
    name: '',
    short: false,
};

export default ProfileCard;
