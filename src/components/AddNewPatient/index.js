import React from 'react'
import PropTypes from 'prop-types'
import ScrollArea from 'react-scrollbar'
import AddNewPatientItem from '../AddNewPatientItem'
import Modal from '../Modal'
import Input from '../Input'
import './styles.css'


class AddNewPatient extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            patients: props.data,
        };
        this.inp;
    }
    

    patientsRender = (dataArr) => {
        return dataArr.map((item, index) => {
            return (<AddNewPatientItem {...item}
                                        onAdd={this.props.onAdd} 
                                        key={item.id + ''+index}/>)
        });

    };

    componentWillReceiveProps(nextProps){
        nextProps.visible === false ? this.state.inputValue = '' : null;
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange = (e) => {
        this.setState({inputValue: e.target.value});
        clearTimeout(this.timer);
        e.target.value.length > 2 ?  this.timer = setTimeout(this.triggerChange, 800) : null;

    };

    triggerChange = () => {
        this.props.onSearch(this.state.inputValue)
    };

    handleKeyDown = (e) => {
        if(e.keyCode===13 && e.target.value.length > 2) {
            clearTimeout(this.timer);
            this.props.onSearch(this.state.inputValue);
        }
    };
    handleSearch = (e) => {
        if (this.state.inputValue.length > 2) this.props.onSearch(this.state.inputValue);
    };
    render(){
        this.inp && console.log(this.inp.input.input.value)

        const {visible, onCancel} = this.props;

        return (
            <Modal title='Добавление пациента в свой список'
                   visible={visible}
                   onCancel={onCancel}
                   width={560}
            >
                <div className='new-patient'>
                    <div className='new-patient-search'>
                        <Input.Search placeholder="Введите ФИО пациента" 
                                    ref={inp => this.inp = inp}
                                      onSearch={this.handleSearch}
                                      onChange={this.handleChange}
                                      onKeyDown={this.handleKeyDown}
                                      value={this.state.inputValue} />
                    </div>
                    <div className='new-patient-title'>Результаты поиска</div>
                    <ScrollArea
                            speed={1}
                            className="new-patient-list"
                            contentClassName="content"
                            horizontal={false}
                    >
                        {this.props.data.length === 0 ?
                        (<div className="no-patients">Пациенты не найдены</div>)
                        : this.patientsRender(this.props.data)}
                    </ScrollArea>
                </div>
            </Modal>
        )

    }
}

AddNewPatient.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func, 
    onSearch: PropTypes.func,
};

AddNewPatient.defaultProps = {
    data: [],
    visible: false,
    onCancel: () => {},
    onAdd: () => {},
    onSearch: () => {},
};

export default AddNewPatient;