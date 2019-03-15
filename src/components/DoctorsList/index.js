import React from 'react'
import PropTypes from 'prop-types';
import '../DoctorsListItem';
import DoctorsListItem from "../DoctorsListItem";
import './styles.css';

class DoctorsList extends React.Component {

    render() {
        const { doctors, open } = this.props;

        return (
            <div>
                <ul className='doctors-list'>
                    {doctors.map((item) => (
                        <DoctorsListItem open={open} key={item._main.id} doctor={item.doctor}/>
                        )
                    )}
                </ul>
            </div>
        )
    }

}

DoctorsList.propTypes = {
    doctors: PropTypes.array,
};

DoctorsList.defaultProps = {
    doctors: [],
};

export default DoctorsList;