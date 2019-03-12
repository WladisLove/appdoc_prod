import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class DoctorsListItem extends React.Component {

    handleClick = () => {
        const { open } = this.props;
        const { id } = this.props.doctor;
        open(id);
    };

    render() {
        const { name, specialty, age } = this.props.doctor;
        return(
            <li className='doctors-list-item'>
                <div className='doctors-list-item-avatar'>
                    <img src="" alt=""/>
                </div>
                <div onClick={this.handleClick} className='doctors-list-item-info'>
                    <h3>{name}</h3>
                    <div>Specialty:{specialty}</div>
                    <div>Age:{age}</div>
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