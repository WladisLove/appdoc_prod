import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './styles.css'

class ProfileAvatar extends React.Component{

    render() {
        const {img, online, owner, size} = this.props;
        const back = 'url(' + img + ') center';

        const onlineClass = online ? 'profileAvatar-status-online' : 'profileAvatar-status-offline';
        const rootClass = cn('profileAvatar',onlineClass, `profileAvatar-size-${size}`, `profileAvatar-owner-${owner}`);
        const avatarClass = cn('profileImg');
        const indicatorClass = cn(`profileAvatar-indicator`);

        return(
            <div className={rootClass}>
                <div className={avatarClass} style={{background: back,backgroundSize: 'cover',}}>
                    <div className={indicatorClass}></div>
                </div>
            </div>

        )
    }
}

ProfileAvatar.propTypes = {
    img: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    online: PropTypes.bool,
    owner: PropTypes.oneOf(['patient','doctor']).isRequired,
};

ProfileAvatar.defaultProps = {
    img: '',
    owner: 'doctor',
    size: 'medium'
};

export default ProfileAvatar;