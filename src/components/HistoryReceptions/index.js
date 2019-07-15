import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Translate } from 'react-localize-redux'
import Card from '../Card'
import Button from '../Button'
import PerfectScrollbar from "react-perfect-scrollbar";

import './style.css'
import '../../icon/style.css'
import HistoryReceptionsItems from "../HistoryReceptionsItems";
import Spinner from "../Spinner";
import ReviewsModal from "../ReviewsModal";
import HistoryReceptionsTabs from "../HistoryReceptionsTabs";

class HistoryReceptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            max: 7,
            old: 0,
            data: [],
            loading: false,
            showReviewModal: false
        };
    }

    historyRender = (dataArr) => {
        let historyArr = [];
        if (!dataArr.length && !this.state.loading) {
            return (<Translate>
                        {({ translate }) =>
                            (<div className="table-footer"
                                        key="btn">
                                <Button btnText={translate('reception.notClickUpdate')}
                                        size='link'
                                        type='link'
                                        icon={'circle_close'}
                                        onClick={() => this.getApps()}
                                />
                            </div>)
                        }
                    </Translate>)
        } else {
            historyArr = dataArr.map((item, i) => {
                 return(<HistoryReceptionsItems {...item}
                                                personalPage={this.props.personalPage}
                                                onGotoChat={this.props.onGotoChat}
                                                isUser={this.props.isUser}
                                                key={i}
                                                showReviewModal={this.showReviewModal}
                                                onAddFiles={this.props.onAddFiles}
                                                refresh={this.refresh}
                                                addConclusion = {this.props.addConclusion}
                                                makeArchiveOfFiles = {this.props.makeArchiveOfFiles}

                 />)
            });
        }
        if(this.props.appsBetweenCount > dataArr.length && !this.state.loading) {
            historyArr.push(
                <Translate>
                    {({ translate }) =>
                        (<div className="table-footer"
                             key="btn">
                            <Button btnText={translate('button.title.showMore')}
                                    size='link'
                                    type='link'
                                    title={translate('button.title.showMore')}
                                    icon='circle_arrow_down'
                                    onClick={this.loadMore}/>
                        </div>)
                    }
                </Translate>
            );
        } else if(this.state.loading){
            historyArr.push(
                <div className="table-footer" key="btn">
                    <Spinner size="small" />
                </div>)
        }
        return historyArr;

    };

    showReviewModal = (obj) => {
        this.setState({dataForReview: obj, showReviewModal: true})
    };

    loadMore = () => {
        this.setState({old: this.state.old+this.state.max}, ()=> {
            this.getApps()
        })
    };

    componentDidMount() {
        this.getApps();
    }


    refresh = () => {
        this.setState({refresh:true});
        let obj = {...this.state};
        obj.max = this.state.data.length;
        obj.old = 0;
        this.props.id_doc ? obj.id_doc = this.props.id_doc : this.props.id_user ? obj.id_user = this.props.id_user : null;
        this.props.getApps(obj)
    };

    componentWillReceiveProps(newProps) {

        if (newProps.data.length && this.state.refresh) {
            this.setState({data: newProps.data, refresh: false})
        } else if (newProps.data.length && newProps.data !== this.props.data) {
            this.setState({data: [...this.state.data, ...newProps.data]})
        }
    }

    getApps = () => {
        this.setState({loading: true});
        let obj ={
            ...this.state,
        };
        this.props.id_doc ? obj.id_doc=this.props.id_doc: this.props.id_user ? obj.id_user=this.props.id_user : null;
        this.props.getApps(obj).then(()=> {
            this.setState({loading: false});
        })
    };

    render(){
        return (
            <Translate>
                {({ translate }) =>
                    (<div className='receptions-personal-page'>
                        <Card title={translate('reception.history')}>
                            <PerfectScrollbar horizontal = {true}>
                                <div className="tableheader">
                                    <div className="flex-col"><div className="receptions-status new">{translate('filter.new')}</div></div>
                                    <div className="flex-col"><div className="receptions-status topical">{translate('filter.topical')}</div></div>
                                    <div className="flex-col"><div className="receptions-status completed">{translate('filter.completed')}</div></div>
                                    <div className="flex-col"><div className="receptions-status extra">{translate('filter.emergencies')}</div></div>
                                </div>
                                <div className="tableheader menu-header">
                                    <div className="flex-col"><div className="tableheader-name">{translate('reception.date')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('conclusion.preliminary')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('reception.comment')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('cost')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('conclusion.single')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('review.single')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('files')}</div></div>
                                </div>
                            {this.historyRender(this.state.data)}
                            </PerfectScrollbar>
                          </Card>
                        <ReviewsModal
                            visible={this.state.showReviewModal}
                            onSubmit ={this.props.onSubmit}
                            info = {this.state.dataForReview}
                            onCancel={()=>this.setState({showReviewModal:false})}
                            refresh={this.refresh}
                        />
                    </div>)
                }
            </Translate>
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
