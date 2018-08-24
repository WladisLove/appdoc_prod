import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import Col from "../Col";
import ScrollArea from "react-scrollbar";
import HistoryReceptionsItems from "../HistoryReceptionsItems";
import Spinner from "../Spinner";

class HistoryReceptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            max: 3,
            old: 0,
            count: 0,
            loadedCount: 0,
            data: [],
            loading: true,
            noData: true
        };
    }

    historyRender = (dataArr) => {
        if(!dataArr.length && this.state.loading &&this.state.noData) {
            return <div className="table-footer"
                        key="btn">
                <Button btnText={'Нет обращений. Нажмите чтобы обновить.' }
                        size='link'
                        type='link'
                        icon={'circle_close'}
                        onClick={() => this.setState({noData: false},() => {
                            this.getApps()
                        })}/>
            </div>
        }
        let historyArr = [];
        dataArr.forEach((item, index) => {
                historyArr.push(<HistoryReceptionsItems {...item}
                                                    personalPage = {this.props.personalPage}
                                                    onGotoChat = {this.props.onGotoChat}
                                                    isUser = {this.props.isUser}
                                                    key = {index}
                                                    />)
        });
        if(this.state.count > this.state.loadedCount && !this.state.loading) {
            historyArr.push(
                <div className="table-footer"
                     key="btn">
                    <Button btnText='Показать еще'
                            size='link'
                            type='link'
                            title='Показать ещё'
                            icon='circle_arrow_down'
                            onClick={this.loadMore}/>
                </div>
            );
        } else if(this.state.loading && !this.state.noData){
            historyArr.push(
                <div className="table-footer"
                     key="btn">
                    <Spinner size="small" />
                </div>)
        }
        return historyArr;

    };


    loadMore = () => {
        this.setState({old: this.state.old+this.state.max, loading: true}, ()=> {
            this.getApps()
        })
    };

    componentWillMount() {
        this.getApps();
    }


    componentWillReceiveProps(newProps) {
        if(newProps.data.length && this.state.loading && newProps.data !== this.props.data) {
            this.setState({
                data: [...this.state.data, ...newProps.data],
                loading:false,
                loadedCount:this.state.loadedCount+newProps.data.length,
                noData: false})
        } else if(!newProps.data.lenght) {
            this.setState({noData:true})
        }

        if(newProps.appsBetweenCount !== this.state.count) {
            this.setState({count:newProps.appsBetweenCount})
        }

        if(newProps.id_doc !== this.props.id_doc) {
            console.log("New id");
            this.setState({loading: true, data: [], count: 0, loadedCount: 0}, () => newProps.getApps({max: 3, old: 0, id_doc: newProps.id_doc}))

        }
    }

    getApps = () => {
        let obj ={...this.state};
        this.props.id_doc ? obj.id_doc=this.props.id_doc: this.props.id_user ? obj.id_user=this.props.id_user : null;
        this.props.getApps(obj)
    };


    render(){
        return (
            <div className='receptions-all'>
                <Card title="История обращений">
                    <ScrollArea
                    horizontal = {true}>
                    {this.historyRender(this.state.data)}
                    </ScrollArea>
                  </Card>
            </div>
        )
    }
}

HistoryReceptions.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    onGotoChat: PropTypes.func,
};

HistoryReceptions.defaultProps = {
    data: [],
    limit: 7,
    onGotoChat: () => {},
};

export default HistoryReceptions