import React from 'react';
import PropTypes from 'prop-types'

import './style.css'
import '../../icon/style.css'
import PatientDoctorsHeader from "../PatientDoctorsHeader";
import PatientDoctorsItem from "../PatientDoctorsItem";
import {search} from '../../helpers/searching'
import { Translate } from 'react-localize-redux'


class PatientDoctors extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: props.data};
    }

    componentDidMount() {
        this.sortDoctorsByName("down");
    }
    componentWillReceiveProps(props) {
            this.setState({data:props.data})

    }
    sortDoctorsByName = (direction) => {
        let doctors = this.state.data;
        doctors.sort(function(a, b) {
            if (a.doctorName < b.doctorName) return -1;
            if (a.doctorName > b.doctorName) return 1;
            return 0;
        });
        if (direction && direction === "up") doctors.reverse();
        this.setState({data: doctors});
    };

    searchDoctorsByName = (name) => {
        if (name) {
            this.setState({data: search(name, this.props.data)});
        }
        else this.setState({data: this.props.data});
    };

    render() {
        return (
            <div>
                <PatientDoctorsHeader
                    {...this.props}
                    onSort={this.sortDoctorsByName}
                    onSearch={this.searchDoctorsByName}
                />

                {this.state.data.length === 0 ?
                    (<div className="no-doctors"><Translate id="patient.addDoctors" /></div>)
                    : (this.state.data.map((item, index)=>
                    <PatientDoctorsItem
                        key = {index+1}
                        {...item}
                        doctorFavorite={true}
                        onGoTo={this.props.onGoTo}
                        onDelete = {this.props.onDelete}
                        newVisitVisible = {this.props.newVisitVisible} />
                ))}
            </div>
        )
    }
}

PatientDoctorsItem.propTypes = {
    doctorRate: PropTypes.number,
    doctorReviews: PropTypes.number,
    doctorFavorite: PropTypes.bool,
    doctorChild: PropTypes.bool,
    doctorName: PropTypes.string,
    doctorSpeciality: PropTypes.string,
    doctorCategory: PropTypes.string,
    doctorExp: PropTypes.string,
    doctorPrice: PropTypes.string,
    doctorLanguages: PropTypes.array,
};

PatientDoctorsItem.defaultProps = {
    doctorRate: 0,
    doctorReviews: 0,
    doctorFavorite: false,
    doctorChild: false,
    doctorName: '',
    doctorSpeciality: '',
    doctorCategory: '',
    doctorExp: '',
    doctorPrice: '',
    doctorLanguages: [],
};

export default PatientDoctors
