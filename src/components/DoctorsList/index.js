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
                <ul className='doctors-list'>
                    {doctors.map((item,i) => (
                        <DoctorsListItem open={this.props.open} key={i} doctor={item.info} id={i}/>
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