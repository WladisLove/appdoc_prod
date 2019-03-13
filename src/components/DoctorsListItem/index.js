import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import { NavLink } from 'react-router-dom'

class DoctorsListItem extends React.Component {

    handleClick = () => {
        const { open } = this.props;
        const { id } = this.props.doctor;
        open(id);
    };

    render() {
        const { name, specialty, age, id } = this.props.doctor;
        const { isUser } = this.props;
        let info = null;
        if(isUser) {
            info = (
                <div onClick={this.handleClick} className='doctors-list-item-info'>
                    <NavLink to={`doctor${id}`}>{name}</NavLink>
                    <div>Specialty:{specialty}</div>
                    <div>Age:{age}</div>
                </div>)
        } else {
            // info = (
            //     <div className='doctors-list-item-info'>
            //         <NavLink to={`doctor${id}`}>{name}</NavLink>
            //         <div>Specialty:{specialty}</div>
            //         <div>Age:{age}</div>
            //     </div>)
            info = (
                <div className='doctors-list-item-info'>
                    <h3>{name}</h3>
                    <div>Specialty:{specialty}</div>
                    <div>Age:{age}</div>
                </div>)
        }

        return(
            <li className='doctors-list-item'>
                <div className='doctors-list-item-avatar'>
                    <img src="" alt=""/>
                </div>
                {info}
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