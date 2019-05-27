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

    getSpecString = () => {
        let specString = '';
        if(this.props.doctor && this.props.doctor.specialty) {
            this.props.doctor.specialty.forEach(spec=>{
                specString +=spec.selector.value + ", ";
            });
            return specString.slice(0, -2);
        }
        return "";
    };

    render() {
        const { name, basic, avatar } = this.props.doctor;

        return(
            <li className='doctors-list-item' onClick={this.handleClick}>
                <div style={{  backgroundImage: `url(${avatar})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',}}
                     className='doctors-list-item-avatar'>
                </div>
                <div  className='doctors-list-item-info'>
                    <NavLink to={`doctor${basic}`}>{name}</NavLink>
                    <div>
                        {this.getSpecString()}
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