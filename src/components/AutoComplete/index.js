import React from 'react'
import PropTypes from 'prop-types'

import ScrollArea from 'react-scrollbar'
import AddNewPatientItem from '../AddNewPatientItem'
import Input from '../Input'
import Spinner from '../Spinner'
import {Modal} from 'antd';
import './style.css'

class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isVisible: false,
            inputValue: "",
            loading: false,
            searchRes: this.props.data,
        };
        this.input;
    }

    focusHandler = (e) => {
        this.setState({
            isVisible: false,
            searchRes: []
        });
    };

    componentWillMount() {
        this.timer = null;
    }

    onClickHandler = (id, flag) => {
        let user;
        flag === 'goto' ? (
                this.state.searchRes.some((el, i) => {
                    (el.id === id) ? user = el : null;
                    return el.id === id;
                }),
                this.input.inp.input.value = "",
                this.props.onGoto(id),
                this.setState({isVisible: false})
            )
            : flag === 'add' ? (
                this.props.onAdd(id, this.input.inp.input.value)
            )
            : (
                this.props.onDelete(id, this.input.inp.input.value)
            );
    };

    onDeletePatientHandler = (id, patientName) => {
        let that = this;
        Modal.confirm({
            title: `Вы действительно хотите удалить ${this.props.isUser ? `доктора` : `пациента`}?`,
            content: `${patientName} будет удален из списка ${this.props.isUser ? `докторов` : `пациентов`}`,
            width: '445px',
            okText: 'Да',
            cancelText: 'Нет',
            onOk() {
                that.onClickHandler(id, 'delete');
            },
          });

        
    }

    patientsRender = (dataArr) => {
        return dataArr.map((item) => {
            return (<AddNewPatientItem {...item} 
                                    onAdd = {(id) => {this.onClickHandler(id, 'add')}}
                                    onDelete = {this.onDeletePatientHandler}
                                    onGoto = {(id) => {this.onClickHandler(id, 'goto')}}
                                    key={item.id}/>)
        });
    };

    changeHandleSearch = (e) => {
        this.setState({inputValue: e.target.value});
        clearTimeout(this.timer);
        e.target.value.length > 2 ? this.timer = setTimeout(this.triggerChange, 800) : null;
    };

    triggerChange = () => {
        this.props.findName(this.state.inputValue);
        this.setState({
            loading: true,
            isVisible: true
        });
    };

    handleKeyDown = (e) => {
        if(e.keyCode===13) {
            if( e.target.value.length > 2 ) {
                clearTimeout(this.timer);
                this.setState({isVisible: true});
                this.triggerChange();
            }
        }
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            searchRes: nextProps.data,
            loading: false
        });
    }

    render() {
        const resultClass = (this.state.isVisible)? 'auto__complete-result auto__complete-result-focus' : 'auto__complete-result';
        const overlayClass = (this.state.isVisible)? 'auto__complete-overlay auto__complete-overlay-focus' : 'auto__complete-overlay';

        return (
            <div className='auto__complete'>
                <div className={overlayClass} onClick={() => this.focusHandler(false)}/>
                <div className='auto__complete-search'>
                    <Input 
                        placeholder='Поиск'
                        onChange={this.changeHandleSearch}
                        ref = {inp => {this.input = inp}}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
                <div className={resultClass}>
                    <div className='auto__complete-title'>
                        Результаты поиска
                        {this.state.searchRes.length && this.state.inputValue.length > 2 
                            ? <span className='auto__complete-count'>{this.state.searchRes.length}</span> : null }
                        {this.state.loading ? <div className='auto__complete-title-spinner'><Spinner/></div> : null}
                    </div>
                    <ScrollArea
                            speed={1}
                            className="auto__complete-list"
                            contentClassName="content"
                            horizontal={false}>

                    {this.state.inputValue.length > 2 ?
                        (
                            (this.state.searchRes).length ? 
                                this.patientsRender(this.state.searchRes)
                                : <div className='entry-list'>{this.props.isUser ? "Докторов нет" : "Пациентов нет"}</div>
                        )
                        : (<div className='entry-list'>Введите больше символов для поиска</div>)}
                    </ScrollArea>
                </div>
            </div>
        )
    }
}

AutoComplete.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    findName: PropTypes.func
};

AutoComplete.defaultProps = {
    data: [],
    findName: () => {}
};

export default AutoComplete