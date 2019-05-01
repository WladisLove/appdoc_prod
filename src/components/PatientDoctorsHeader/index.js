import React from 'react';
import PropTypes from 'prop-types'
import Button from '../Button'
import Input from '../Input'
import {search} from '../../helpers/searching'
import './style.css'
import '../../icon/style.css'
import {Icon} from 'antd'
import { Translate } from 'react-localize-redux'


class PatientDoctorsHeader extends React.Component{
    state = {
        searchRes: this.props.data,
        filtered: false,
        sortByName: "down",
        searchInputValue: "",
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            searchRes: nextProps.data,
        })
    }

    onInputChange = (e) => {
        if (e.target.value !== ' ') {
            this.setState({searchInputValue: e.target.value});
            this.props.onSearch(e.target.value);
        }
    };

    render(){
        return (<div>
                <Translate>
                    {({ translate }) =>
                        (<div className="patient-doctors-header">
                            <div className="patient-doctors-actions">
                                <div className="flex-col">
                                    <Button
                                        onClick={this.props.addNewDoctorVisible}
                                        btnText={translate('button.title.add')}
                                        size='default'
                                        type='yellow'
                                        icon='plus'
                                        iconSize={11}
                                        svg
                                    />
                                </div>
                                {this.props.data.length !== 0 && <div className="flex-col ico-btn">
                                    <button className="sortByName" onClick={()=>{
                                        this.props.onSort(this.state.sortByName==="down"?"up":"down");
                                        this.setState({sortByName: this.state.sortByName==="down"?"up":"down"});
                                    }}>
                                        <span> {translate('sortBy')}: <span style={{fontWeight: 700}}>{translate('patient.form.input.fullName')} </span><Icon type={this.state.sortByName} /></span>
                                    </button>
                                    <Input.Search
                                        placeholder={`${translate('search')}...`}
                                        onChange={this.onInputChange}
                                        onSearch={this.props.onSearch}
                                        value={this.state.searchInputValue}
                                    />
                                </div>}
                            </div>
                            {this.props.data.length !== 0 && <div className="legend">
                                <span className="AppAfterAnalyses">{translate('reception.byResults')}</span>
                                <span className="AppWithVideoAudio">{translate('reception.available')}</span>
                                <span className="AppUnavailable">{translate('reception.unavailable')}</span>
                            </div>}
                        </div>)
                    }
                </Translate>
        </div>)
    }
}

PatientDoctorsHeader.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onAdd: PropTypes.func,
    onSort: PropTypes.func,
    onSearch: PropTypes.func,
    onGoto: PropTypes.func,
    onChangeDate:  PropTypes.func,
};

PatientDoctorsHeader.defaultProps = {
    data: [],
    onAdd: () => {},
    onSort: () => {},
    onSearch: () => {},
    onGoto: () => {},
    onChangeDate: () => {},
};

export default PatientDoctorsHeader
