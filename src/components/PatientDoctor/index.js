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

    checkModal1Visible = (value, name = '') => {
        this.setState({
            modal1Visible: value,
            doctorName: name,
        })
    }

    doctorRender = (dataArr) => {
        let doctorArr = [];

        dataArr.map((item,index) => {
            doctorArr.push(<PatientDoctorItem key={index} {...item} checkModal1Visible={this.checkModal1Visible}/>)
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
                    onOk={() => this.checkModal1Visible(false)}
                    onCancel={() => this.checkModal1Visible(false)}
                    userName={this.state.doctorName}
                    date={new Date(2018,1,4,8,10)}
                    onSave = {(obj) => console.log(obj)}
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