import React from 'react'
import PropTypes from 'prop-types'
import ScrollArea from 'react-scrollbar'
import AddNewDoctorItem from '../AddNewPatientItem'
import Modal from '../Modal'
import Input from '../Input'
import './styles.css'


class AddNewDoctor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            patients: props.data,
            inputValue: ""
        };
    }
    

    doctorsRender = (dataArr) => {
        return dataArr.map((item, index) => {
            return (<AddNewDoctorItem {...item}
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
        const {visible, onCancel} = this.props;

        return (
            <Modal title='Добавление доктора в свой список'
                   visible={visible}
                   onCancel={onCancel}
                   width={560}
            >
                <div className='new-doctor'>
                    <div className='new-doctor-search'>
                        <Input.Search placeholder="Введите ФИО доктора"
                                    ref={inp => this.inp = inp}
                                    onSearch={this.handleSearch}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                    value={this.state.inputValue}  />
                    </div>
                    <div className='new-doctor-title'>Результаты поиска</div>
                    <ScrollArea
                            speed={1}
                            className="new-doctor-list"
                            contentClassName="content"
                            horizontal={false}>
                        {this.state.inputValue.length > 2 ?
                            (
                                this.props.data.length === 0 ? 
                                    (<div className="no-doctors">Доктора не найдены</div>)
                                    : this.doctorsRender(this.props.data)
                            )
                            : (<div className="no-doctors">Введите больше символов для поиска</div>)}
                    </ScrollArea>
                </div>
            </Modal>
        )

    }
}

AddNewDoctor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func, 
    onSearch: PropTypes.func,
};

AddNewDoctor.defaultProps = {
    data: [],
    visible: false,
    onCancel: () => {},
    onAdd: () => {},
    onSearch: () => {},
};

export default AddNewDoctor;