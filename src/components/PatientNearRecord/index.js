import React from 'react';
import PropTypes from 'prop-types'
import PatientNearRecordItem from '../PatientNearRecordItem'
import Card from '../Card'
import Icon from '../Icon'
import Spinner from "../Spinner"
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'
import Button from "../Button";


class PatientNearRecord extends React.Component{
    state = {
        isLoading: true
    };

    nearRender = (dataArr) => {
        let nearArr = [];
        if(dataArr.length) {
            dataArr.map((item,index) => {
                nearArr.push(<PatientNearRecordItem key={index} {...item} cancelAppByPatient={this.props.cancelAppByPatient}/>)
            });
        } else {
            nearArr.push(<div>
                            <Translate>
                                {({ translate }) =>
                                  (<div className='noNearRecords'>
                                      <span>
                                          {translate('notifications.noRecords')}
                                      </span>
                                      <Button btnText={translate('button.title.signUp')}
                                              onClick={this.props.onGoto}
                                              size='small'
                                              type='float'/>
                                  </div>)
                                }
                            </Translate>
                        </div>)
        }


        return nearArr;
    }
    componentWillReceiveProps(props) {
        if(props.nearVisitsLoaded) {
            this.setState({isLoading: false});
        }
    }

    render(){
        return (
            <div className='record-all'>
                <Card title={<Translate id="reception.nearRecords" />} style={{height: 500}} extra={<div onClick={this.props.redirect} className='go-to'><Icon svg type='calendar' size={18} /> <Translate id="all" /></div>}>
                    {this.state.isLoading ? <Spinner/> : this.nearRender(this.props.data)}
                </Card>
            </div>
        )
    }
}

PatientNearRecord.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
};

PatientNearRecord.defaultProps = {
    data: [],
    onGoto: () => {},
};

export default PatientNearRecord
