import React from 'react'
import PropTypes from 'prop-types';
import '../DoctorsListItem';
import DoctorsListItem from "../DoctorsListItem";
import './styles.css';

class DoctorsList extends React.Component {

    render() {
        const { doctors } = this.props;
        return (
            <div>
                <ul class='doctors-list'>
                    {doctors.map(item =>
                        <DoctorsListItem key={item.id} doctor={item} />
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