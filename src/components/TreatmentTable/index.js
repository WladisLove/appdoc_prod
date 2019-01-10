import React from 'react';
import PropTypes from 'prop-types'

import TreatmentTableItem from '../TreatmentTableItem'
import Card from '../Card'
import Icon from '../Icon'
import './style.css'
import '../../icon/style.css'
import Spinner from "../Spinner";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "../Button";
import ReviewsModal from "../ReviewsModal";
import HistoryReceptionsTabs from "../HistoryReceptionsTabs";
import { Translate } from 'react-localize-redux'

class TreatmentTable extends React.Component{
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
    treatmentRender = (dataArr) => {
        let historyArr = [];
        if(!dataArr || !dataArr.length && !this.state.loading) {
            return <div className='entry-list'>{this.props.isUser ? (<Translate id="reseption.not" />) : (<Translate id="treatment.not" />)}</div>
        } else {
            historyArr = dataArr.map((item, index) => {
                return (<TreatmentTableItem {...item}
                                    onGotoChat = {this.props.onGotoChat}
                                    onGoto={this.props.onGoto}
                                    data={this.props.data}
                                    key={index}
                                    isUser = {this.props.isUser}
                                    showReviewModal={this.showReviewModal}
                                    addConclusion = {this.props.addConclusion}
                                    refresh = {this.refresh}
                                    makeArchiveOfFiles = {this.props.makeArchiveOfFiles}
                />)
            });
        }
        if(this.props.dataCount > dataArr.length && !this.state.loading) {
            historyArr.push(
                <div className="table-footer" key="btn">
                    <Translate>
                        {({ translate }) =>
                            (<Button
                                btnText={translate(`button.title.showMore`)}
                                size='link'
                                type='link'
                                title={translate(`button.title.showMore`)}
                                icon='circle_arrow_down'
                                onClick={this.loadMore}
                            />)
                        }
                    </Translate>
                </div>
            );
        } else if(this.state.loading){
            historyArr.push(
                <div className="table-footer"
                     key="btn">
                    <Spinner size="small" />
                </div>)
        }
        return historyArr;
    };

    componentDidMount() {
        this.getApps();
    }

    refresh = () => {
        this.setState({refresh:true});
        let obj = {...this.state};
        obj.max = this.state.data.length;
        obj.old = 0;
        this.props.getCompletedApps(obj)
    };
    loadMore = () => {
        this.setState({old: this.state.old+this.state.max}, ()=> {
            this.getApps()
        })
    };

    getApps = () => {
        this.setState({loading: true});
        let obj ={
            ...this.state,
        };
        this.props.getCompletedApps(obj).then(()=> {
            this.setState({loading: false});
        })
    };
    showReviewModal = (obj) => {
        this.setState({dataForReview: obj, showReviewModal: true})
    };
    componentWillReceiveProps(newProps) {
        if (newProps.data.length && this.state.refresh) {
            this.setState({data: newProps.data, refresh: false})
        } else if (newProps.data.length && newProps.data !== this.props.data) {
            this.setState({data: [...this.state.data, ...newProps.data]})
        }
    }

    render(){
        return (
            <div className='treatment-all'>
                <Card title={this.props.isUser ? (<Translate id="reseption.past" />) : (<Translate id="treatment.actual" />) }

                        extra={<div className='go-to' onClick={this.props.redirect}>
                            <Icon svg size={16} type="order-form" /> <span><Translate id="treatment.all" /></span>
                        </div>}>
                    <PerfectScrollbar
                        speed={1}
                        contentClassName="content"
                        horizontal={true}
                    >
                                <div className="tableheader">
                                    <div className="flex-col"><div className="tableheader-name">{this.props.isUser ? (<Translate id="doctor" />) : (<Translate id="patient.name" />)}</div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="reseption.date" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="conclusion.preliminary" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="reseption.comment" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="cost" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="conclusion.single" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="review.single" /></div></div>
                                    <div className="flex-col"><div className="tableheader-name"><Translate id="files" /></div></div>
                                </div>

                        {this.treatmentRender(this.state.data)}

                        </PerfectScrollbar>

                  </Card>
                <ReviewsModal
                    visible={this.state.showReviewModal}
                    onSubmit ={this.props.onSubmitReview}
                    info = {this.state.dataForReview}
                    onCancel={()=>this.setState({showReviewModal:false})}
                    refresh={this.refresh}
                />
            </div>
        )
    }
}

TreatmentTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onGoto: PropTypes.func,
    onGotoChat: PropTypes.func,
};

TreatmentTable.defaultProps = {
    data: [],
    onGoto: () => {},
    onGotoChat: () => {},
};

export default TreatmentTable
