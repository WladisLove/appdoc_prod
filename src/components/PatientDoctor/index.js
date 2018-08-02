import React from 'react';
import PropTypes from 'prop-types'

import PatientDoctorItem from '../PatientDoctorItem'
import NewVisitModalPage from '../NewVisitModalPage'
import Card from '../Card'
import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'


class PatientDoctor extends React.Component{

    state = {
        modal1Visible: false,
        doctorName: '',
    }

    setModal1Visible = (value, name, ID)=> {
        this.setState({
            modal1Visible: value,
            doctorName: name,
            doctorID: ID,
            isReceptionRecorded: false
        });
        if (value) this.props.onGetAllDocIntervals(ID);
    };

    doctorRender = (dataArr) => {
        let doctorArr = [];

        dataArr.map((item,index) => {
            doctorArr.push(<PatientDoctorItem key={index} {...item} checkModal1Visible={this.setModal1Visible}/>)
        });

        return doctorArr;
    }

    render(){
        const { data, onGoto } = this.props;

        return (
            <div className='doctor-all'>
                <Card style={{height: 500}} title="Мои врачи" extra={
                    <div onClick={this.props.redirect} className='go-to'>
                        <Icon svg type='people' size={18} /> Весь список
                    </div>}>
                    {this.doctorRender(data)}
                </Card>
                <NewVisitModalPage
                    visible={this.state.modal1Visible}
                    onSave={(a) => {
                        console.log("onSave");
                    }}
                    isDateInvalid = {this.props.isReceptionRecorded}
                    onCancel={() => this.setModal1Visible(false)}
                    userName={this.state.doctorName}
                    intervals={this.props.intervals}
                    onChangeDate={this.props.onGetIntervalForDate}
                    availableIntervals={this.props.availableIntervals}
                    id={this.state.doctorID}
                    isReceptionRecorded = {this.props.isReceptionRecorded}
                    setModal1Visible = {this.setModal1Visible}
                />
            </div>
        )
    }
}

PatientDoctor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
};

PatientDoctor.defaultProps = {
    data: [],
    onGoto: () => {},
};

export default PatientDoctor