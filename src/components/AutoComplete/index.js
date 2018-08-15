import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ScrollArea from 'react-scrollbar'
import AddNewPatientItem from '../AddNewPatientItem'
import Input from '../Input'
import Icon from '../Icon'
import {search} from '../../helpers/searching'
import './style.css'

class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isVisible: false,
            inputValue: "",
            inputFocus: false,
            itemFocus: false,
            
            searchRes: this.props.data,
        }
        this.input;
    }

    focusHandler = (e) => {
        this.setState({
            isVisible: false,
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
    }

   

    patientsRender = (dataArr) => {
        let patientsArr = [];

        dataArr.map((item, index) => {
            patientsArr.push(<AddNewPatientItem {...item} 
                                                onAdd = {(id) => {this.onClickHandler(id, 'add')}}
                                                onDelete = {(id) => {this.onClickHandler(id, 'delete')}}
                                                onGoto = {(id) => {this.onClickHandler(id, 'goto')}}
                                                key={item.id + ''+index}/>)
        });

        return patientsArr;
    };

    changeHandleSearch = (e) => {
        this.setState({inputValue: e.target.value});
        clearTimeout(this.timer);
        e.target.value.length > 2 ?  this.timer = setTimeout(this.triggerChange, 800) : null;


    };
    triggerChange = () => {
        this.props.findName(this.state.inputValue);
        this.setState({
            isVisible: true,
            searchRes: this.props.data,
        });
    };

    handleKeyDown = (e) => {
        if(e.keyCode===13) {
            if( e.target.value.length > 2 ) {
            clearTimeout(this.timer);
            this.props.findName(this.state.inputValue);
            this.setState({
                isVisible: true,
                searchRes: this.props.data,
            });
            }
        }
    };
    componentWillReceiveProps(nextProps){
        nextProps.data.length && this.setState({searchRes: nextProps.data})
    }

    render() {
        
        const { data, collapsed} = this.props;
        const rootClass = cn('auto__complete');
        const resultClass = (this.state.isVisible)? 'auto__complete-result auto__complete-result-focus' : 'auto__complete-result';
        const overlayClass = (this.state.isVisible)? 'auto__complete-overlay auto__complete-overlay-focus' : 'auto__complete-overlay';


        return (
            <div className={rootClass}>
                <div className={overlayClass} onClick={() => this.focusHandler(false)}></div>
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
                        {this.state.searchRes.length ? <span className='auto__complete-count'>{this.state.searchRes.length}</span> : null }
                    </div>
                    <ScrollArea
                            speed={1}
                            className="auto__complete-list"
                            contentClassName="content"
                            horizontal={false}
                    >
                        {(this.state.searchRes).length ? 
                            this.patientsRender(this.state.searchRes)
                            : <div className='entry-list'>{this.props.isUser ? "Докторов нет" : "Пациентов нет"}</div>
                        }
                    </ScrollArea>
                </div>
            </div>
        )
    }
}

AutoComplete.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

AutoComplete.defaultProps = {
    data: [],
};

export default AutoComplete