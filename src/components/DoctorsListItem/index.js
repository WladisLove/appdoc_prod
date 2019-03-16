import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import { NavLink } from 'react-router-dom'

class DoctorsListItem extends React.Component {

    handleClick = () => {
        const { open } = this.props;
        const { basic } = this.props.doctor;
        open(basic);
    };

    render() {
        const { name, phone, basic, avatar, email } = this.props.doctor;

        return(
            <li className='doctors-list-item'>
                <div className='doctors-list-item-avatar'>
                    <img src={avatar} alt=""/>
                </div>
                <div  className='doctors-list-item-info'>
                    <NavLink to={`doctor${basic}`}>{name}</NavLink>
                    <div onClick={this.handleClick}>
                        <div>Email:{email}</div>
                        <div>Phone:{phone}</div>
                    </div>
                </div>
            </li>
        )
    }
}

DoctorsListItem.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.string,
    age: PropTypes.number,
};

DoctorsListItem.defaultProps = {
    name: '',
    specialty: '',
    age: 0,
};

export default DoctorsListItem;