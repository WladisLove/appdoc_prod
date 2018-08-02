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
            tmp: 0,

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

    /*searchHandler = (e) => {

        e.target.value.length > 0 
            ? (this.setState({
                isVisible: true, 
                searchRes: search(e.target.value, this.props.data),
            }))
            : this.setState({
                isVisible: false,   
                searchRes: [],
            });
    }*/

    onClickHandler = (id, flag) => {
        let user;
        flag === 'goto' ? (
            this.state.searchRes.some((el, i) => {
                (el.id === id) ? user = el : null;
                return el.id === id;
            }),
            this.input.inp.input.value = user.name,
            this.input.setFocus(true),
            this.props.onGoto(id),
            this.setState({isVisible: false})
        )
        : (
            this.props.onAdd(id, this.input.inp.input.value),
            this.setState({tmp: this.state.tmp +1})
        );
    }

   

    patientsRender = (dataArr) => {
        let patientsArr = [];

        dataArr.map((item, index) => {
            patientsArr.push(<AddNewPatientItem {...item} 
                                                onAdd = {(id) => {this.onClickHandler(id, 'add')}}
                                                onGoto = {(id) => {this.onClickHandler(id, 'goto')}}
                                                key={item.id + ''+index}/>)
        });

        return patientsArr;
    };

    /*shouldComponentUpdate(nextProps){
        console.log(this.props.data.length)
        console.log(nextProps.data.length)
        return this.props.data.length !== nextProps.data.length
    }*/

    componentWillReceiveProps(nextProps){
        this.props.data.length !== nextProps.data.length && this.setState({searchRes: nextProps.data})
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
                        onChange={(e) => {
                            e.target.value.length === 0 && this.setState({
                                isVisible: false,   
                            })
                        }}
                        ref = {inp => {this.input = inp}}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.setState({
                                    isVisible: true, 
                                    searchRes: this.props.data,
                                });
                                this.props.findName(this.input.inp.input.value)
                            }
                          }}
                    />
                </div>
                <div className={resultClass}>
                    <div className='auto__complete-title'>
                        Результаты поиска 
                        <span className='auto__complete-count'>{this.state.searchRes.length}</span>
                    </div>
                    <ScrollArea
                            speed={1}
                            className="auto__complete-list"
                            contentClassName="content"
                            horizontal={false}
                    >
                        {(this.state.searchRes).length ? 
                            this.patientsRender(this.state.searchRes)
                            : <div className='entry-list'>Пациентов нет</div>
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