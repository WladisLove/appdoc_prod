import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import ProfileAvatar from '../ProfileAvatar'
import RatePanel from '../RatePanel'
import Hoc from "../Hoc"
import './styles.css'

class DoctorProfileCard extends React.Component{

    shouldComponentUpdate(nextProps){
        return (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.img !== nextProps.img)
                    || (this.props.name !== nextProps.name)
                    || (this.props.isShort !== nextProps.isShort)
    }

    render(){

        const {short, name, specialty, isUser} = this.props;
        let specialtyOneArray =[];
        let spec = [];
        console.log(specialty, "SPECIALITY");
        specialty.map((elem)=> {
            specialtyOneArray.push(...elem)
        });
        if(Array.isArray(specialty)) {
            const style = "doctorProfileCard-specialty-block";
            for(let i = 0; i < specialty.length; i++){
                if(specialty.length == i+1){
                    spec.push(<div className={style}><span>{specialty[i]}</span></div>);
                    continue
                }
                spec.push(<div className={style}><span>{specialty[i]}, </span><br/></div>)
            }

        }

        const rootClass = short ?
            (isUser ?
            "patientProfileCard-short" : "doctorProfileCard-short")
            : (isUser ?
                "patientProfileCard" : "doctorProfileCard");

        return (
            <div
                className={rootClass}
                onClick={() => this.props.history.push('/app/personal-info')}
            >
                <ProfileAvatar owner="doctor" {...this.props} short={short} size={(short ? 'medium' : 'large')}/>
                <div className={'doctorProfileCard-name'}>{name}</div>
                {
                    isUser ? null : (
                        <Hoc>
                            <div className={'doctorProfileCard-specialty'}>
                                {spec}
                            </div>
                            <RatePanel {...this.props} disable={true}/>
                        </Hoc>
                    )
                }
            </div>
        )
    }
}

DoctorProfileCard.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.array,
    short: PropTypes.bool,
    rateValue: PropTypes.number,
    timesRated: PropTypes.number,
    isUser: PropTypes.bool,
};

DoctorProfileCard.defaultProps = {
    name: '',
    specialty: [],
    short: false,
    isUser: false,
};

export default withRouter(DoctorProfileCard);
