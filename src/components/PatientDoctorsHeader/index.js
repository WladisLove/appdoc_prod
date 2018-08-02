import React from 'react';
import PropTypes from 'prop-types'
import Button from '../Button'
import Input from '../Input'
import {search} from '../../helpers/searching'
import './style.css'
import '../../icon/style.css'
import {Icon} from 'antd'


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
        return (
                <div className="patient-doctors-header">
                    <div className="patient-doctors-actions">
                        <div className="flex-col">
                            <Button
                                onClick={this.props.addNewDoctorVisible}
                                btnText='Добавить'
                                size='default'
                                type='yellow'
                                icon='plus'
                                iconSize={11}
                                svg
                            />
                        </div>
                        <div className="flex-col ico-btn">
                            <button className="sortByName" onClick={()=>{
                                this.props.onSort(this.state.sortByName==="down"?"up":"down");
                                this.setState({sortByName: this.state.sortByName==="down"?"up":"down"});
                            }}>
                                <span> Сортировать по: <span style={{fontWeight: 700}}>ФИО </span><Icon type={this.state.sortByName} /></span>
                            </button>
                            <Input.Search
                                placeholder="Поиск..."
                                onChange={this.onInputChange}
                                onSearch={this.props.onSearch}
                                value={this.state.searchInputValue}
                            />
                        </div>
                    </div>
                    <div className="legend">
                        <span className="AppAfterAnalyses">Приёмы по результатам анализов</span>
                        <span className="AppWithVideoAudio">Доступные приёмы</span>
                        <span className="AppUnavailable">Недоступные приёмы</span>
                    </div>
                </div>
        )
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