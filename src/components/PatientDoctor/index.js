import React from 'react';
import PropTypes from 'prop-types'

import PatientDoctorItem from '../PatientDoctorItem'
import NewVisitModalPage from '../NewVisitModalPage'
import Card from '../Card'
import Icon from '../Icon'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'
import {message} from "antd";
import Spinner from "../Spinner";
import Button from "../Button";


class PatientDoctor extends React.Component{

    state = {
        modal1Visible: false,
        doctorName: '',
        isRecordInProcess: false,
        submitSuccess: true,
        loading: true
    };

    setModal1Visible = (value, name, ID)=> {
        this.setState({
            modal1Visible: value,
            doctorName: (value) ? name : this.state.doctorName,
            doctorID: (value) ? ID : this.state.doctorID,
        });
        if (value) this.props.onGetAllDocIntervals(ID);
    };

    doctorRender = (dataArr) => {
        let doctorArr = [];
        if(dataArr.length) {
            dataArr.map((item,index) => {
                doctorArr.push(<PatientDoctorItem onGoto={this.props.onGoto} key={index} {...item} checkModal1Visible={this.setModal1Visible}/>)
            });
        } else {
            doctorArr.push(
                <div>
                    <Translate>
                        {({ translate }) =>
                            (<div className='noMyDoctors'>
                                <span>
                                    {translate('patient.noDoctors')}
                                </span>
                            <Button btnText={translate('button.title.add')}
                                    onClick={this.props.redirect}
                                    size='small'
                                    type='float'/>
                            </div>)
                        }
                    </Translate>
            </div>)
        }


        return doctorArr;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.myDoctorsLoaded) {
            this.setState({loading: false});
        }
    };


    render(){
        const { data, onGoto } = this.props;

        return (
            <div className='doctor-all'>
                <Card style={{height: 500}} title={<Translate id="patient.myDoctors" />} extra={
                    <div onClick={this.props.redirect} className='go-to'>
                        <Icon svg type='people' size={18} /> <Translate id="allList" />
                    </div>}>
                    {this.state.loading ? <Spinner/> : this.doctorRender(data)}
                </Card>
                <NewVisitModalPage
                    visible={this.state.modal1Visible}
                    onSave={this.props.onAddVisit}
                    onCancel={() => this.setModal1Visible(false)}
                    userName={this.state.doctorName}
                    intervals={this.props.intervals}
                    onChangeDate={this.props.onGetIntervalForDate}
                    availableIntervals={this.props.availableIntervals}
                    id={this.state.doctorID}
                    submitSuccess={this.state.submitSuccess}
                />
            </div>
        )
    }
}

PatientDoctor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
    isReceptionRecorded: PropTypes.bool,
    receptionRecordedID: PropTypes.string
};

PatientDoctor.defaultProps = {
    data: [],
    onGoto: () => {},
    isReceptionRecorded: false,
    receptionRecordedID: "0"
};

export default PatientDoctor
