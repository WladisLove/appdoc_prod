import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './styles.css'

class ProfileAvatar extends React.Component{

    render() {
        const {img, online, size} = this.props;
        const back = 'url(' + img + ') center';

        const onlineClass = online ? 'profileAvatar-status-online' : 'profileAvatar-status-offline';
        const rootClass = cn('profileAvatar', onlineClass, `profileAvatar-size-${size}`);
        const avatarClass = cn('profileImg');
        return(
            <div className={rootClass}>
                <div className={avatarClass} style={{background: back,backgroundSize: 'cover',}}>

                </div>
            </div>

        )
    }
}

ProfileAvatar.propTypes = {
    img: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    online: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

ProfileAvatar.defaultProps = {
    img: '',
    size: 'medium'
};

export default ProfileAvatar;
