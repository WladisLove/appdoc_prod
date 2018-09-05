import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Card from '../Card'
import Button from '../Button'

import {message} from "antd"
import './style.css'
import '../../icon/style.css'
import Col from "../Col";
import ScrollArea from "react-scrollbar";
import HistoryReceptionsItems from "../HistoryReceptionsItems";
import Spinner from "../Spinner";
import ReviewsModal from "../ReviewsModal";

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
            noData: true,
            reviewStatus: 0,
            visible: false
        };
    }

    historyRender = (dataArr) => {
        if(!dataArr.length && this.state.loading && this.state.noData) {
            return <div className="table-footer"
                        key="btn">
                <Button btnText={'Нет приёмов. Нажмите чтобы обновить.' }
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
                                                    personalPage={this.props.personalPage}
                                                    onGotoChat={this.props.onGotoChat}
                                                    isUser={this.props.isUser}
                                                    key={index}
                                                    setModalRewiewsVisible={this.setModalRewiewsVisible}
                                                    onAddFiles={this.props.onAddFiles}
                                                    refresh={this.refresh}


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
    setModalRewiewsVisible = (obj) => {
        this.setState({dataForReview: obj, visible: true, reviewStatus: 0})

    };

    loadMore = () => {
        this.setState({old: this.state.old+this.state.max, loading: true}, ()=> {
            this.getApps()
        })
    };

    componentWillMount() {
        this.getApps();
    }

    refresh =() => {
        this.setState({data:[], loading: true}, () => {
            this.getApps({max:this.state.loadedCount, old: 0,loadedCount: 0})
        })
    };

    componentWillReceiveProps(newProps) {
        console.log(newProps, "NEW PROPS")
        if(newProps.data.length && this.state.loading && newProps.data !== this.props.data) {
            this.setState({
                data: [...this.state.data, ...newProps.data],
                loading:false,
                loadedCount:this.state.loadedCount+newProps.data.length,
                noData: false})
        } else if(!newProps.data.lenght && this.state.loading && newProps.data !== this.props.data) {
            this.setState({noData:true})
        }

        if(newProps.appsBetweenCount !== this.state.count) {
            this.setState({count:newProps.appsBetweenCount})
        }

        if(newProps.id_doc !== this.props.id_doc) {
            console.log("New id");
            this.setState({loading: true, data: [], count: 0, loadedCount: 0, old: 0}, () => newProps.getApps({max: 3, old: 0, id_doc: newProps.id_doc}))

        }
    }

    getApps = (params) => {
        let obj ={
            ...this.state,
            ...params

        };

        this.props.id_doc ? obj.id_doc=this.props.id_doc: this.props.id_user ? obj.id_user=this.props.id_user : null;
        this.props.getApps(obj)
    };

    afterCloseReviews = () => {
        if(this.state.reviewStatus===200) {
            this.setState({loading: true, data: [], count: 0, loadedCount: 0, old: 0}, () => this.getApps({max: this.state.loadedCount, old: 0}));
            message.success("Отзыв отправлен", 2)
        }
    };
    render(){
        console.log(this.state, "state from HR")
        return (
            <div className='receptions-all'>
                <Card title="История приёмов">
                    <ScrollArea
                    horizontal = {true}>
                        <div className="tableheader">
                            <div className="flex-col"><div className="receptions-status new">Новые</div></div>
                            <div className="flex-col"><div className="receptions-status topical">Актуальные</div></div>
                            <div className="flex-col"><div className="receptions-status completed">Завершенные</div></div>
                            <div className="flex-col"><div className="receptions-status extra">Экстренные</div></div>
                        </div>
                        <div className="tableheader menu-header">
                            <div className="flex-col"><div className="tableheader-name">Дата приема</div></div>
                            <div className="flex-col"><div className="tableheader-name">Диагноз</div></div>
                            <div className="flex-col"><div className="tableheader-name">Комментарий к приему</div></div>
                            <div className="flex-col"><div className="tableheader-name">Стоимость</div></div>
                            <div className="flex-col"><div className="tableheader-name">Заключение</div></div>
                            <div className="flex-col"><div className="tableheader-name">Отзыв</div></div>
                            <div className="flex-col"><div className="tableheader-name">Файлы</div></div>
                        </div>
                    {this.historyRender(this.state.data)}
                    </ScrollArea>
                  </Card>
                <ReviewsModal
                    visible={this.state.visible}
                    onSubmit ={this.props.onSubmit}
                    info = {this.state.dataForReview}
                    afterClose ={this.afterCloseReviews}
                    onCancel={(status)=>this.setState({visible:false, reviewStatus: status})}
                />
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