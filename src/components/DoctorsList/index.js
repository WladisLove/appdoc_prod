import React from 'react'
import PropTypes from 'prop-types';
import '../DoctorsListItem';
import DoctorsListItem from "../DoctorsListItem";
import './styles.css';

class DoctorsList extends React.Component {

    render() {
        const { doctors, open, isUser } = this.props;

        return (
            <div>
                <ul className='doctors-list'>
                    {doctors.map((item) => (
                        <DoctorsListItem isUser={isUser} open={open} key={item.info.id} doctor={item.info}/>
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